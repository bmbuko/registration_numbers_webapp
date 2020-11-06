module.exports = function registration(pool) {



    // async function checkReg() {
    //     let results = await pool.query("select id from town where starts_with = $1", [regNum])
    //     return reg.rowCount;
    // }

    async function addRegNumber(regNumbers) {

        //console.log(regNumbers);

        if (regNumbers !== "") {

            regNumbers = regNumbers.toUpperCase()
            //console.log() 
            //regex
            const regNum = regNumbers.substring(0, 2)

            let results = await pool.query('select id from town where starts_with = $1', [regNum])
            if (results.rowCount > 0) {
                let townId = results.rows[0].id
                let regies;
                if (townId > 0) {
                    regies = await pool.query('select reg_number from registrations where reg_number=$1', [regNumbers])
                }
                // only add the reg number if it's not already in the database
                if (regies.rowCount == 0) {
                    await pool.query('insert into registrations(reg_number,town_id) values ($1,$2)', [regNumbers, townId]);
                    return {
                        message:"Reg number added",
                        color: "success"
                    } ;
                } else {
                    return {
                        message:"Reg number already added",
                        color: "error"
                    };
                }
            } else {
                // invalid town / reg number
                // return false;
                return "Invalid regnumber - town not supported..."
            }
        }
        else {
            return "No reg number supplied";
        }

    }

    async function showReg() {
        const sqlList = "select * from registrations"
        const result = await pool.query(sqlList);
        return result.rows
    }

    async function filter(town_tag) {
        if (town_tag == "all") {
            const allRegs = "select reg_number from registrations"
            const results = await pool.query(allRegs)
            return results.rows
        }
        else {
            

            const sqlRegs = 'select reg_number from registrations where town_id = $1'
            const results = await pool.query(sqlRegs, [town_tag])
            return results.rows;

        }

    }
    async function resetData() {
        const deleteSQl = "delete from registrations"
        await pool.query(deleteSQl)
    }


    return {
        addRegNumber,
        filter,
        showReg,
        resetData

    }



}




















// module.exports = function registration(pool) {



//     async function checkReg(){
//         let reg = await pool.query(("select id from town where starts_with = $1", [regNum]))
//       return reg.rows;
//      }

//      async function addRegNumber(regNumbers) {
//          if (regNumbers !== "") {
//              regNumbers = regNumbers.toUpperCase()
//              //console.log() 
//              //regex
//              const regNum = regNumbers.substring(0, 2)
//              console.log(regNum)

//              const results = await pool.query("select id from town where  starts_with = $1", [regNum])

//              const townId = results.rows[0].id



//                  const insertSQL = ("insert into registrations( reg_number,town_id) values ($1,$2)");

//                  await pool.query(insertSQL, [regNumbers],[townId]);







//              //if (results.rows.length > 0 && results.rows[0].count == 0) {
//              // if not in the db then insert it...
//              // async function insertReg(){
//              // const rg =("select reg_number from registrations where reg_number =$1 ");
//              // await pool.query(rg,[regNumbers]);



//              // const insertSQL = ("insert into registrations( reg_number) values ($1)")
//              // await pool.query(insertSQL, [regNumbers]);


//              // }
//          }
//          else {
//              return false//(because input is blank)
//          }



//          // async function insertReg() {

//          //     const rg = ("select reg_number from registrations where reg_number =$1 ");
//          //     await pool.query(rg, [regNumbers]);



//              // const insertSQL = ("insert into registrations( reg_number) values ($1)")
//              // await pool.query(insertSQL, [regNumbers]);


//         // }





//      }



//      return {
//          addRegNumber,
//        //  selectTble,


//      }



//  }




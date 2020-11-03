module.exports = function registration(pool) {



    // async function checkReg() {
    //     let results = await pool.query("select id from town where starts_with = $1", [regNum])
    //     return reg.rowCount;
    // }

    async function addRegNumber(regNumbers) {
        if (regNumbers !== "") {

            regNumbers = regNumbers.toUpperCase()
            //console.log() 
            //regex
            const regNum = regNumbers.substring(0, 2)

            let results = await pool.query('select id from town where starts_with = $1', [regNum])
            let townId = results.rows[0].id
            let regies;
            if (townId > 0) {
                regies = await pool.query('select reg_number from registrations where reg_number=$1', [regNumbers])
            }

            if (regies.rowCount < 1) {
                await pool.query('insert into registrations(reg_number,town_id) values ($1,$2)', [regNumbers, townId]);

            }


        }
        else {
            return false//(because input is blank)
        }

    }

    async function showReg() {
        const sqlList = "select * from registrations"
        const result = await pool.query(sqlList);
        return result.rows
    }

    async function filterByTown(town_tag) {
if (town_tag ="all"){
const allRegs = "select reg_numbers from registrations"
const results = await pool.query(allRegs)
return results.rows
}

    }


    return {
        addRegNumber,
        filterByTown,
        showReg

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




module.exports = function route(regNum) {
  
  
  const display = async function (req, res) {
    res.render('index', {
      title: 'Home'
    });
  };
  
  const addReg = async (req, res) => {

    // console.log(req.body);
    const regN = req.body.reginum



    if (regN == "") {

      req.flash('info', 'please add reg');

      res.redirect('/')
    }


    const FORMAT_REGEX = /^C[JLA] [\d\b-]*/;

    if (!FORMAT_REGEX.test(regN)) {

      // invalid
      req.flash('info', 'invalid reg format');

      return;

    }




    var msg = await regNum.addRegNumber(regN)
    console.log(msg);


    const regNumbers = await regNum.showReg();
    // console.log(regNumbers)
    req.flash('info', msg.message);
    req.flash('color', msg.color);

    res.render('index', {
      reg: regNumbers
    });

  }
  
  const filterRegs = async (req, res) => {

    const regee = req.body.town
    const regNumbers = await regNum.filter(regee);

    console.log(regNumbers);


    res.render('index', {
      reg: regNumbers
    })
  }
  
  const clearData = async (req, res) => {
    await regNum.resetData()
    res.redirect('/');
  }

  return {
    display,
    addReg,
    filterRegs,
    clearData
  }
}
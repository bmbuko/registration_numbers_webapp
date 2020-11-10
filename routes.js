module.exports = function route(regNum) {


  const display = async function (req, res) {
    const regNumbers = await regNum.showReg();
    res.render('index', {
      title: 'Home',
      reg: regNumbers
    });
  };

  const addReg = async (req, res) => {

    // console.log(req.body);
    const regN = req.body.reginum



    if (regN == "") {

      req.flash('info', 'Please add registration');

      res.redirect('/')
    }


    // const FORMAT_REGEX = /^C[JLA] [\d\b-]*/;
    const FORMAT_REGEX = /^C[JLA]\s\d{3,6}-\d{3,6}$|C[JLA]\s\d{3,6}$/gmi

    if (!FORMAT_REGEX.test(regN)) {
      req.flash('info', 'Invalid registration format');

      res.redirect('/');
      return;
    }




    var msg = await regNum.addRegNumber(regN)

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
    await regNum.resetData(),
      req.flash("success", "Successfully cleared the list")
    res.redirect('/');
  }

  return {
    display,
    addReg,
    filterRegs,
    clearData
  }
}
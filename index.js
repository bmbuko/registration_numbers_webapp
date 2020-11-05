let express = require('express');
var exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash');
const registration = require("./reg")
const bodyParser = require('body-parser');

const pg = require("pg")
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/reg_numbers'
const pool = new Pool({
  connectionString
});
let app = express()
const regNum = registration(pool)

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));
app.use(flash());



app.get('/', async function (req, res) {
  res.render('index', {
    title: 'Home'
  });
});

app.post('/registrationsNum', async (req, res) => {

  console.log(req.body);
  const regN = req.body.reginum



  if (regN == "") {
    req.flash('info', 'please add reg');
    res.redirect('/')
  }

  const FORMAT_REGEX = /^C[JLA] [\d\b-]*/;

  if(!FORMAT_REGEX.test(regN)) {
    
      // invalid
      req.flash('info', 'invalid reg format');
      res.redirect('/')
      return;

  }

  var msg = await regNum.addRegNumber(regN)

  const regNumbers = await regNum.showReg();
  // console.log(regNumbers)
  req.flash('info', msg);

  res.render('index', {
    reg: regNumbers
  });

});

app.post('/registrationsFilter', async (req, res) => {

  const regee = req.body.town
  const regNumbers = await regNum.filter(regee);

  console.log(regNumbers);


  res.render('index', {
    reg: regNumbers
  })
})
app.get("/reset", async (req, res) => {
  await regNum.resetData()
  res.redirect('/');

});









let PORT = process.env.PORT || 5011


  ;
app.listen(PORT, function () {

});
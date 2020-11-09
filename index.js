let express = require('express');
var exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash');
const registration = require("./reg")
const bodyParser = require('body-parser');
const rout = require('./routes')

const pg = require("pg")
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/reg_numbers'
const pool = new Pool({
  connectionString

});
let app = express()
const regNum = registration(pool)
const routing=rout(regNum)

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



app.get('/',routing.display)

app.post('/registrationsNum',routing.addReg)

app.post('/registrationsFilter',routing.filterRegs)
app.get("/reset",routing.clearData)











let PORT = process.env.PORT || 5011
;
app.listen(PORT, function () {

});
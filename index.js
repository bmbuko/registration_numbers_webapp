let express =require('express');
var exphbs  = require('express-handlebars');
const registration =require("./reg")
const bodyParser = require('body-parser');

const pg = require("pg")
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/reg_numbers'
const pool = new Pool({
  connectionString
});
let app = express()
const regNum =registration(pool)

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async function (req, res) {
    res.render('index');
});
app.post('/registrationsNum', async (req,res)=>{
  const regN =req.body.reginum
await regNum.addRegNumber(regN)
    
    console.log(await regNum.showReg())
  
  res.render('index',{
 reg:await regNum.showReg()
  });
  app.get('/get_Regs') 
  


});









let PORT = process.env.PORT || 5011

;
app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});
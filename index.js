let express =require('express');
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');



let app = express()


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('index');
});
app.post("/registrationsNum",(res,req)=>{

});









let PORT = process.env.PORT || 3006;
app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});
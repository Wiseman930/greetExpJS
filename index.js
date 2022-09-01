const express = require("express");
const exphbs = require("express-handlebars"); //import the express-handlebars module
const bodyParser = require("body-parser");
const app = express();
const greetingNames = require("./greet.js");
const flash = require("express-flash");
const session = require("express-session");


const pgp = require('pg-promise')()

//const DATABASE_URL= process.env.DATABASE_URL || "postgresql://postgres:DAad5525@localhost:5432/demodb";

 const DATABASE_URL = {
  host: 'localhost',
  port: 5432,
  database: 'demodb',
  user: 'postgres',
  password: 'DAad5525',

} || process.env.DATABASE_URL ;



const config = {
	DATABASE_URL

}
if(process.env.NODE_ENV == "production"){
  config.ssl = {
    rejectUnauthorized: false
}
}
const db = pgp(config);
//module.exports = db;

const greetMe = greetingNames(db);
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));

app.use(
  session({
    secret: "string for session in http",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.get("/", greetThem.mainDisplay)
app.get("/", async function (req, res) {
    try {
        res.render("index", {
          count: await greetMe.getMyCount(),
        });
        } catch (error) {
        //console(error)
        }
  });

//app.post("/greetings", greetThem.flashAndGreet )
    app.post("/greetings",async function (req, res) {

            greetMe.notCheckedbutton(req.body.name, req.body.languageTypeRadio);
            greetMe.enterNameAndLanguage(req.body.name, req.body.languageTypeRadio);
            await greetMe.getFromDatabase(req.body.name, req.body.languageTypeRadio);

             if(greetMe.returnEmptyButtonsAndTextbox() !==''){
               setTimeout(function(){
                 greetMe.returnEmptyButtonsAndTextbox() == ''
               }, 4000)
               }
             req.flash("errorMessages", greetMe.returnEmptyButtonsAndTextbox());

             if(greetMe.returnChosenLanguage() !==''){
               setTimeout(function(){
                 greetMe.returnChosenLanguage() == ''
               }, 4000)
               }
             req.flash("greeted", greetMe.returnChosenLanguage());

             res.redirect("/");
      });

//app.get("/actions", greetThem.messageAndCount )
app.get("/actions",async function (req, res) {
    try {
        res.render("actions", {
          messageAfterReset: greetMe.returnResetMessage(),
          nameAndCountList: await greetMe.greetedNames(),

        });
        } catch (error) {
          //console.log(error)
          }
  });

//app.get("/namesGreeted/:name", greetThem.listOfGreeted)
app.get("/namesGreeted/:name",async function (req, res) {
    try {
        let myName = req.params.name;
        let howManytimes;
        if ( await greetMe.countEachName(myName) > 1){
          howManytimes =  await greetMe.countEachName(myName) + " times"
        }
        else if ( await greetMe.countEachName(myName) == 1){
          howManytimes =  await greetMe.countEachName(myName) + " time"
        }
        res.render("nameGreeted", {
          myNames: myName,
          countsOfEach: howManytimes, //C:\Program Files\PostgreSQL\14\bin
        });
        } catch (error) {
         // console.log(error)
          }

    }
  );

//app.post("/reset", greetThem.flashError)
app.post("/reset", async function (req, res) {
    try {
        await greetMe.resetAll();
        req.flash("errorMessages", greetMe.returnEmptyButtonsAndTextbox());
        res.redirect("/");
        } catch (error) {
          //console.log(error)
          }
  });

let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("App starting on port", PORT);
})
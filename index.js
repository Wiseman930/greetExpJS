const express = require("express");
const exphbs = require("express-handlebars"); //import the express-handlebars module
const bodyParser = require("body-parser");
const app = express();
const greetingNames = require("./greet.js");
const flash = require("express-flash");
const session = require("express-session");

const pgp = require("pg-promise")();

let useSSL = false;

let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
const DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://postgres:pg1999@localhost:5432/postgres";

const config = {
  connectionString: DATABASE_URL,
 /* ssl: {
    rejectUnauthorized: false,
  },*/
};

const db = pgp(config);

const greetMe = greetingNames(db);
const greets = require('./myRoutes/Allroutes')
const greetThem = greets(greetMe)
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

app.get("/", greetThem.mainDisplay)

app.post("/greetings", greetThem.flashAndGreet)


app.get("/actions", greetThem.messageAndCount)

app.get("/namesGreeted/:name", greetThem.listOfGreeted)

app.post("/reset", greetThem.flashError)


let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("App starting on port", PORT);
})


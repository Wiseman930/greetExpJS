module.exports = function allGreetFunctions (greetlist){



 async function mainDisplay (req, res) {
          res.render("index", {
            count: await greetlist.getMyCount(),
          });
      }

   async function flashAndGreet (req, res) {
         greetlist.notCheckedbutton(req.body.name, req.body.languageTypeRadio);
          await greetlist.enterNameAndLanguage(req.body.name, req.body.languageTypeRadio);
          await greetlist.getFromDatabase(req.body.name, req.body.languageTypeRadio);

          if(greetlist.returnEmptyButtonsAndTextbox() !==''){
            setTimeout(function(){
              greetlist.returnEmptyButtonsAndTextbox() == ''
            }, 4000)
            }
          req.flash("errorMessages", greetlist.returnEmptyButtonsAndTextbox());

          if(greetlist.returnChosenLanguage() !==''){
            setTimeout(function(){
              greetlist.returnChosenLanguage() == ''
            }, 4000)
            }
          req.flash("greeted", greetlist.returnChosenLanguage());

          res.redirect("/");

      }

    async function messageAndCount (req, res) {
          res.render("actions", {
            messageAfterReset: greetlist.returnResetMessage(),
            nameAndCountList: await greetlist.greetedNames(),

          });
      }

 async function listOfGreeted (req, res) {
          let myName = req.params.name;
          let howManytimes;
          if ( await greetlist.countEachName(myName) > 1){
            howManytimes =  await greetlist.countEachName(myName) + " times"
          }
          else if ( await greetlist.countEachName(myName) == 1){
            howManytimes =  await greetlist.countEachName(myName) + " time"
          }
          res.render("nameGreeted", {
            myNames: myName,
            countsOfEach: howManytimes,
          });

      }

  async function flashError (req, res) {
          await greetlist.resetAll();
          req.flash("errorMessages", greetlist.returnEmptyButtonsAndTextbox());
          res.redirect("/");

      }
      return{
        mainDisplay,
        flashAndGreet,
        messageAndCount,
        listOfGreeted,
        flashError

      }

}
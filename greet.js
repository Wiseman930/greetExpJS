module.exports = function greetMeInLangage(db) {
  let languageChoice;
  let returnForEmptyButtons;
  let giveMeName2;
  let resetMessages;

  async function resetAll() {
    resetMessages = "No names are greeted";
    returnForEmptyButtons = "You have just reset your counter";
    let deleteData = await db.oneOrNone("delete from users");
    return deleteData;
  }

  function returnResetMessage() {
    return resetMessages;
  }

  function notCheckedbutton(nameIn, languageType) {
    let giveMeName = nameIn;
    if (!languageType && giveMeName == "") {
      returnForEmptyButtons =
        "Please enter your name and choose a Language button";
    } else if (languageType && giveMeName) {
      returnForEmptyButtons = "";
    } else if (!languageType && giveMeName) {
      returnForEmptyButtons = "Please choose a Language button";
    } else if (giveMeName == "" && languageType == "english") {
      returnForEmptyButtons = "Please enter your name";
    } else if (giveMeName == "" && languageType == "afrikaans") {
      returnForEmptyButtons = "Please enter your name";
    } else if (giveMeName == "" && languageType == "isiXhosa") {
      returnForEmptyButtons = "Please enter your name";
    }
  }

  async function enterNameAndLanguage(aNameIn, LanguageIn) {
    let alphabet = /^[a-z A-Z]+$/;

    if (LanguageIn == "english" && aNameIn !== "" && alphabet.test(aNameIn)) {
      languageChoice = "Hello, " + aNameIn;
      resetMessages = "";
      returnForEmptyButtons == "";
    } else if (
      LanguageIn == "afrikaans" &&
      aNameIn !== "" &&
      alphabet.test(aNameIn)
    ) {
      languageChoice = "Hallo, " + aNameIn;
      resetMessages = "";
      returnForEmptyButtons == "";
    } else if (
      LanguageIn == "isiXhosa" &&
      aNameIn !== "" &&
      alphabet.test(aNameIn)
    ) {
      languageChoice = "Molo, " + aNameIn;
      returnForEmptyButtons == "";
      resetMessages = "";
    } else if ((returnEmptyButtonsAndTextbox = !"")) {
      languageChoice = "";
    }
  }
  async function getFromDatabase(aNameIn, LanguageIn) {
    giveMeName2 = aNameIn.toUpperCase();

    let checkName = await db.oneOrNone(
      "SELECT greeted_name FROM users WHERE  = $1",
      [giveMeName2]
    );
    if (checkName == null && giveMeName2 != "" && LanguageIn) {
      await db.none("INSERT INTO users(greeted_name, count) values($1,$2)", [
        giveMeName2,
        1,
      ]);
    } else if (giveMeName2 != "" && LanguageIn) {
      await db.none("UPDATE users SET count = count+1 WHERE greeted_name =$1", [
        giveMeName2,
      ]);
    }
  }

  function returnChosenLanguage() {
    return languageChoice;
  }
  async function greetedNames() {
    let storedNames = await db.manyOrNone("SELECT greeted_name FROM users;");
    console.log(storedNames)
    return storedNames;
  }
  async function getMyCount() {
    let grandCount = await db.one("SELECT count(*) FROM users;");
    return grandCount.count;
  }
  function returnEmptyButtonsAndTextbox() {
    return returnForEmptyButtons;
  }
  async function countEachName(name) {
    let eachNameCount = await db.one(
      "SELECT count FROM users WHERE greeted_name=$1",
      [name]
    );
    let eachName = eachNameCount.count;
    return eachName;
  }
  return {
    enterNameAndLanguage,
    returnChosenLanguage,
    getMyCount,
    notCheckedbutton,
    returnEmptyButtonsAndTextbox,
    countEachName,
    greetedNames,
    resetAll,
    returnResetMessage,
    getFromDatabase,
  };
};

const assert = require('assert');
const greetMeInLangage = require('../greet.js');

const pgp = require('pg-promise')()

const DATABASE_URL =   process.env.DATABASE_URL || "postgresql://postgres:pg1999@localhost:5432/postgres";
const config = {
    connectionString: DATABASE_URL
}
const db = pgp(config);

describe('Greetings function',async function(){

    beforeEach(async function(){
    await db.none("delete from users")
    });

it("should be able to count the names greeted but not twice", async function(){
    let greetings = greetMeInLangage(db);



    await greetings.getFromDatabase("Wiseman", 'english');
    await greetings.getFromDatabase("Wiseman", "english");
    await greetings.getFromDatabase("Linda", "isiXhosa");
    assert.equal(2, await greetings.getMyCount());
});

it("should be able to count how many times the same name has been greeted", async function(){

    let greetings = greetMeInLangage(db);
    await greetings.getFromDatabase("Wiseman", "afrikaans");
    await greetings.getFromDatabase("Linda", "isiXhosa");
    await greetings.getFromDatabase("Linda", "isiXhosa");

    assert.equal(1, await greetings.countEachName('WISEMAN'));
    assert.equal(2, await greetings.countEachName('LINDA'));

})
it("should be able to count the names greeted", async function(){
    let greetings = greetMeInLangage(db);



    await greetings.getFromDatabase("Wiseman", "isixhosa");
    await greetings.getFromDatabase("Linda", "isiXhosa");
    await greetings.getFromDatabase("Linda", "isiXhosa")
    assert.equal(2, await greetings.getMyCount());
});
})



describe('Not async Greetings function', function(){

it("should be able to greet a person in english when a person enters their name", function(){

    let greetings = greetMeInLangage()

    greetings.enterNameAndLanguage('Wiseman', "english");
    assert.equal('Hello, Wiseman' , greetings.returnChosenLanguage());
});

it("should be able to greet a person in xhosa when a person enters their name", function(){

    let greetings = greetMeInLangage()

    greetings.enterNameAndLanguage('Wiseman', "isiXhosa");
    assert.equal('Molo, Wiseman' , greetings.returnChosenLanguage());
});

it("should be able to greet a person in afrikaans when a person enters their name", function(){

    let greetings = greetMeInLangage()

    greetings.enterNameAndLanguage('Wiseman', "afrikaans");
    assert.equal('Hallo, Wiseman' , greetings.returnChosenLanguage());
});

it("should ask me to enter a name when the textbox and buttons are empty at greet click button", function(){
    let greetings = greetMeInLangage();

    greetings.notCheckedbutton("", '');
    assert.equal("Please enter your name and choose a Language button", greetings.returnEmptyButtonsAndTextbox());

});

it("should ask me to select a button when a button is not selected and the textbox is not empty ", function(){
    let greetings = greetMeInLangage();

    greetings.notCheckedbutton('Wiseman', '');
    assert.equal("Please choose a Language button", greetings.returnEmptyButtonsAndTextbox());

});

it("should ask me to enter a name when the english button selected and the textbox is empty ", function(){
    let greetings = greetMeInLangage();

    greetings.notCheckedbutton("", "english");
    assert.equal("Please enter your name", greetings.returnEmptyButtonsAndTextbox());

})

it("should ask me to enter a name when the isiXhosa button selected and the textbox is empty ", function(){
    let greetings = greetMeInLangage();

    greetings.notCheckedbutton("", "isiXhosa");
    assert.equal("Please enter your name", greetings.returnEmptyButtonsAndTextbox());

})

it("should ask me to enter a name when the afrikaans button selected and the textbox is empty ", function(){
    let greetings = greetMeInLangage();

    greetings.notCheckedbutton("", "afrikaans");
    assert.equal("Please enter your name", greetings.returnEmptyButtonsAndTextbox());

})

it("should be able to greet a person in english when a person enters their name", function(){

    let greetings = greetMeInLangage();

    greetings.enterNameAndLanguage('Wiseman', "english");
    assert.equal('Hello, Wiseman' , greetings.returnChosenLanguage());
});

it("should be able to greet a person in isiXhosa when a person enters their name", function(){
    let greetings = greetMeInLangage();

    greetings.enterNameAndLanguage('Wiseman', "isiXhosa");
    assert.equal('Molo, Wiseman' , greetings.returnChosenLanguage());
});
it("should be able to greet a person in afrikaans when a person enters their name", function(){
    let greetings = greetMeInLangage();

    greetings.enterNameAndLanguage('Mabusela', "afrikaans");
    assert.equal('Hallo, Mabusela' , greetings.returnChosenLanguage());
});

it('should delete users',async function(){
    await db.none("delete from users")
})

});
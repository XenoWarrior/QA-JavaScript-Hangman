$(document).unbind('keypress');
$(document).keydown(function(e){
    var code = e.which || e.keyCode;
    switch (code)
    {
        case 65:
        console.log("KEYPRESS A");
        HangMan.selectLetter("A");
        break;
        case 66:
        console.log("KEYPRESS B");
        HangMan.selectLetter("B");
        break;
        case 67:
        console.log("KEYPRESS C");
        HangMan.selectLetter("C");
        break;
        case 68:
        console.log("KEYPRESS D");
        HangMan.selectLetter("D");
        break;
        case 69:
        console.log("KEYPRESS E");
        HangMan.selectLetter("E");
        break;
        case 70:
        console.log("KEYPRESS F");
        HangMan.selectLetter("F");
        break;
        case 71:
        console.log("KEYPRESS G");
        HangMan.selectLetter("G");
        break;
        case 72:
        console.log("KEYPRESS H");
        HangMan.selectLetter("H");
        break;
        case 73:
        console.log("KEYPRESS I");
        HangMan.selectLetter("I");
        break;
        case 74:
        console.log("KEYPRESS J");
        HangMan.selectLetter("J");
        break;
        case 75:
        console.log("KEYPRESS K");
        HangMan.selectLetter("K");
        break;
        case 76:
        console.log("KEYPRESS L");
        HangMan.selectLetter("L");
        break;
        case 77:
        console.log("KEYPRESS M");
        HangMan.selectLetter("M");
        break;
        case 78:
        console.log("KEYPRESS N");
        HangMan.selectLetter("N");
        break;
        case 79:
        console.log("KEYPRESS O");
        HangMan.selectLetter("O");
        break;
        case 80:
        console.log("KEYPRESS P");
        HangMan.selectLetter("P");
        break;
        case 81:
        console.log("KEYPRESS Q");
        HangMan.selectLetter("Q");
        break;
        case 82:
        console.log("KEYPRESS R");
        HangMan.selectLetter("R");
        break;
        case 83:
        console.log("KEYPRESS S");
        HangMan.selectLetter("S");
        break;
        case 84:
        console.log("KEYPRESS T");
        HangMan.selectLetter("T");
        break;
        case 85:
        console.log("KEYPRESS U");
        HangMan.selectLetter("U");
        break;
        case 86:
        console.log("KEYPRESS V");
        HangMan.selectLetter("V");
        break;
        case 87:
        console.log("KEYPRESS W");
        HangMan.selectLetter("W");
        break;
        case 88:
        console.log("KEYPRESS X");
        HangMan.selectLetter("X");
        break;
        case 89:
        console.log("KEYPRESS Y");
        HangMan.selectLetter("Y");
        break;
        case 90:
        console.log("KEYPRESS Z");
        HangMan.selectLetter("Z");
        break;
        case 13:
        HangMan.submitLetter();
        break;
        default:
        break;
    }
});
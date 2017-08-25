var HangMan = {
    wordList: [],
    allWords: [],


    selectedWord: [],
    maskedWord: [],
    discoveredLetters: [],
    wrongLetters: [],
    globalUsed: [],

    minLength: 0,
    maxLength: 0,

    guessChances: Canvas.drawArray.length,

    selectedLetter: "",

    resetState() {
        let buttons = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

        for(let i = 0; i < buttons.length; i++) {
            $(`#clickable-letter-${buttons[i]}`).prop("disabled", false);
        }

        this.wordList = [];
        this.selectedWord = [];
        this.maskedWord = [];
        this.discoveredLetters = [];
        this.wrongLetters = [];
        this.globalUsed = [];

        this.minLength = 0,
        this.maxLength = 0,

        this.guessChances = Canvas.drawArray.length,
        this.selectedLetter = "";

        this.processWords();

        Canvas.reset();

        $("#diff-selection-container").css("display", "none");
        $("#letter-container").css("display", "block");
    },

    async processWords() {
        switch($("#difficulty-selection").find(":selected").val()) {
            case "1":
                HangMan.minLength = 0;
                HangMan.maxLength = 4;
            break;

            case "2":
                HangMan.minLength = 5;
                HangMan.maxLength = 6;
            break;

            case "3":
                HangMan.minLength = 9;
                HangMan.maxLength = 9999;
            break;

        }

        console.log(`Selected difficulty: ${$("#difficulty-selection").find(":selected").text()}: [Min: ${this.minLength}, Max: ${this.maxLength}]`);
        
        for(let i = 0; i < this.allWords.length; i++) {
            //+1 because the word list word always have the word followed by a hidden "\n" character
            if(this.allWords[i].length >= this.minLength+1 && this.allWords[i].length <= this.maxLength+1) {
                HangMan.wordList.push(this.allWords[i]);
            }
        }

        console.log(`Got ${HangMan.wordList.length} words.`);

        $("#letter-container").css("display", "block");
        $("#download-button").css("display", "none");
        $("#diff-selection-container").css("display", "none");
        $("#download-button").prop("disabled", true);

        HangMan.pickWord();
    },

    getWords() {
        if($("#difficulty-selection").find(":selected").val() !== "0") {
            $("#download-button").prop("disabled", true);

            let url = "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt";

            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    HangMan.allWords = this.responseText.split("\n");
                    HangMan.processWords();
                }
            };
            xhr.open('GET', url, true);
            xhr.send();
        }
    },

    pickWord() {
        let selectIndex = (Math.floor((Math.random() * this.wordList.length))) - 1;
        this.selectedWord = this.wordList[selectIndex].toLowerCase().split("");
        this.selectedWord.splice(this.selectedWord.length-1, 1);

        console.log(this.selectedWord);

        Canvas.canvas();

        $("#stickman").css("display", "inline-block");
        $("#stickman").css("text-align", "center");

        this.printMasked();
    },

    printMasked() {
        let shownWord = "";

        console.log(`Length for this.discoveredLetters.length is: ${this.discoveredLetters.length}`);
        console.log(`Length for this.selectedWord.length is: ${this.selectedWord.length}`);

        if(this.guessChances > 0) {
            if(this.discoveredLetters.length === this.selectedWord.length) {
                shownWord = "Game over, you saved the hangman! The word is: <strong>";
                for(let i = 0; i < this.selectedWord.length; i++) {
                        shownWord += `${this.selectedWord[i]}`;
                }
                shownWord += `</strong>`;
                shownWord += `<p><a style="width: 180px;" class="waves-effect waves-light btn-large" id="reset-state" onclick="HangMan.resetState();">New Game</a></p>`;
                
                $("#diff-selection-container").css("display", "inline-block");

                $("#chances-container").text("");
                $("#letter-container").css("display", "none");
            }
            else {
                for(let i = 0; i < this.selectedWord.length; i++) {
                    if(this.discoveredLetters.includes(this.selectedWord[i])) {
                        shownWord += `${this.selectedWord[i]} `;
                    }
                    else {
                        shownWord += "_ ";
                    }
                }
                
                $("#chances-container").text(`Life Remaining: ${this.guessChances == 1 ? "LAST LIFE" : this.guessChances}`);
            }
        }
        else {
            shownWord = "Game over, your hangman was hung! The word was: <strong>";
            for(let i = 0; i < this.selectedWord.length; i++) {
                    shownWord += `${this.selectedWord[i]}`;
            }
            shownWord += `</strong>`;
            shownWord += `<p><a style="width: 180px;" class="waves-effect waves-light btn-large" id="reset-state" onclick="HangMan.resetState();">New Game</a></p>`;
            
            $("#diff-selection-container").css("display", "inline-block");

            $("#chances-container").text("");
            $("#letter-container").css("display", "none");
        }

        $("#hangman-word-container").text("");
        $("#hangman-word-container").append(`<p>${shownWord}</p>`);
    },

    selectLetter(letter) {
        this.selectedLetter = letter.toLowerCase();
        if(this.selectedWord.length > 0 && !this.globalUsed.includes(this.selectedLetter)) {
            $('#selected-letter').prop("disabled", false);
            $('#selected-letter').text(`Submit: ${this.selectedLetter}`);
        }
        else {
            this.selectedLetter = "";
        }
    },

    submitLetter() {
        if(this.selectedLetter !== "" && this.selectedWord.length > 0 && !this.globalUsed.includes(this.selectedLetter)) {
            $(`#clickable-letter-${this.selectedLetter.toUpperCase()}`).prop('disabled', true);

            if(this.selectedWord.includes(this.selectedLetter)) {
                for(let i = 0; i < this.selectedWord.length; i++) { 
                    if(this.selectedWord[i] == this.selectedLetter) {
                        this.discoveredLetters.push(this.selectedLetter);
                    }
                }
            }
            else {
                this.wrongLetters.push(this.selectedLetter);
                this.guessChances--;
                
                Canvas.drawArray[this.guessChances]();
            }

            this.globalUsed.push(this.selectedLetter);
            this.selectedLetter = "";

            $('#selected-letter').prop("disabled", true);
            $('#selected-letter').text("Pick Letter");

            this.printMasked();
        }
    }

};
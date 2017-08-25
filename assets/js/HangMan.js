var HangMan = {
    wordList: [],

    selectedWord: [],
    maskedWord: [],
    discoveredLetters: [],
    wrongLetters: [],

    guessChances: 6,

    selectedLetter: "",

    resetState() {
        let buttons = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

        for(let i = 0; i < buttons.length; i++) {
            $(`#clickable-letter-${buttons[i]}`).prop("disabled", false);
        }

        this.selectedWord = [];
        this.maskedWord = [];
        this.discoveredLetters = [];
        this.wrongLetters = [];
        this.guessChances = 6;
        this.selectedLetter = "";

        this.pickWord();
        $("#letter-container").css("display", "block");
    },

    getWords() {
        this.currKing = 0;
        let url = "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt";

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                HangMan.wordList = this.responseText.split("\n");

                console.log(`Got ${HangMan.wordList.length} words.`);

                $("#letter-container").css("display", "block");
                $("#download-button").css("display", "none");
                $("#download-button").prop("disabled", true);

                HangMan.pickWord();
            }
        };        
        xhr.open('GET', url, true);
        xhr.send();
    },

    pickWord() {
        let selectIndex = (Math.floor((Math.random() * this.wordList.length))) - 1;
        this.selectedWord = this.wordList[selectIndex].toLowerCase().split("");
        this.selectedWord.splice(this.selectedWord.length-1, 1);

        console.log(this.selectedWord);

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
                
                $("#chances-container").text(`Life Remaining: ${this.guessChances}`);
            }
        }
        else {
            shownWord = "Game over, your hangman was hung! The word was: <strong>";
            for(let i = 0; i < this.selectedWord.length; i++) {
                    shownWord += `${this.selectedWord[i]}`;
            }
            shownWord += `</strong>`;
            shownWord += `<p><a style="width: 180px;" class="waves-effect waves-light btn-large" id="reset-state" onclick="HangMan.resetState();">New Game</a></p>`;
            
            $("#chances-container").text("");
            $("#letter-container").css("display", "none");
        }

        $("#hangman-word-container").text("");
        $("#hangman-word-container").append(`<p>${shownWord}</p>`);
    },

    selectLetter(letter) {
        this.selectedLetter = letter.toLowerCase();
        
        $('#selected-letter').prop("disabled", false);
        $('#selected-letter').text(`Submit: ${this.selectedLetter}`);
    },

    submitLetter() {
        if(this.selectedLetter !== "") {
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
            }

            this.selectedLetter = "";

            $('#selected-letter').prop("disabled", true);
            $('#selected-letter').text("Pick Letter");

            this.printMasked();
        }
    }

};
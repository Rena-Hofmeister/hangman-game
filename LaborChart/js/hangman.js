var hangman = {
    //Total number of wrong guesses allowed before losing
    lives: 6,
    dictionary: ["abruptly", "blizzard", "dwarves", "jazzy", "razzmatazz", "wizard", "motivated", "zombie", "megahertz", "mystify"],
    currentWord: null,
    wordLength: 0,
    correctGuesses: 0,
    wrongGuesses: 0,
    //HTML Elements
    hWord: null, //Current word
    hChar: null, //Available characters
    hLives: null, //Lives remaining 

    init: function() {
        //Get HTML Elements
        hangman.hWord = document.getElementById("words");
        hangman.hChar = document.getElementById("char");
        hangman.hLives = document.getElementById("lives");

        //Generate available characters (A-Z)
        for (var i = 65; i < 91; i++) {
            let currentChar = document.createElement("input");
            currentChar.type = "button";
            currentChar.value = String.fromCharCode(i);
            currentChar.disabled = true;
            currentChar.addEventListener("click", hangman.check);
            hangman.hChar.appendChild(currentChar);
        }

        let resetButton = document.getElementById("reset");
        resetButton.addEventListener("click", hangman.reset);
        resetButton.disabled = false;
        hangman.reset();
    },

    toggle: function(disable) {
        let allChars = hangman.hChar.getElementsByTagName("input");
        for (var i of allChars) { i.disabled = disable; }
    },

    reset: function() {
        //Reset stats 
        hangman.correctGuesses = 0;
        hangman.wrongGuesses = 0;
        hangman.hLives.innerHTML = hangman.lives;

        //Choose a random word from the dictionary
        hangman.currentWord = hangman.dictionary[Math.floor(Math.random() * Math.floor(hangman.dictionary.length))];
        hangman.currentWord = hangman.currentWord.toUpperCase();
        hangman.wordLength = hangman.currentWord.length;

        console.log(hangman.currentWord);

        //Create the blank spaces for letters
        hangman.hWord.innerHTML = "";
        for (var i = 0; i < hangman.currentWord.length; i++) {
            var charnow = document.createElement("span");
            charnow.innerHTML = "_";
            charnow.id = "hangword-" + i;
            hangman.hWord.appendChild(charnow);
        }

        //Enable all the characters 
        hangman.toggle(false);
    },

    //Check to see if selected character is in the current word 
    check: function() {
        var index = 0,
            hits = [];
        while (index >= 0) {
            index = hangman.currentWord.indexOf(this.value, index);
            if (index == -1) { break; } else {
                hits.push(index);
                index++;
            }
        }

        //Correct guess, show the hits 
        if (hits.length > 0) {
            //Reveal characters
            for (var hit of hits) {
                document.getElementById("hangword-" + hit).innerHTML = this.value;
            }

            //All characters hit, you win!
            hangman.correctGuesses += hits.length;
            if (hangman.correctGuesses == hangman.wordLength) {
                hangman.toggle(true);
                alert("Congratulations, YOU WIN!");
            }
        }

        //Wrong guess, minus life
        else {
            hangman.wrongGuesses++;
            var livesLeft = hangman.lives - hangman.wrongGuesses;
            hangman.hLives.innerHTML = livesLeft;

            if (hangman.wrongGuesses == hangman.lives) {
                hangman.toggle(true);
                alert("YOU LOSE! The word was: " + hangman.currentWord);
            }
        }

        //Disable selected character
        this.disabled = true;
    }
};

window.addEventListener("DOMContentLoaded", hangman.init);
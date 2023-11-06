//VARIABLES DECLARADAS EN INGLES CON LENGUAJE DESCRIPTIVO TIPO --"Camel Case"-- 

//declaramos unas variables de nuestras clases del CSS para manipular el HTML 

const wordDisplay = document.querySelector(".word-display");  // clase de la palabra
const guessesText = document.querySelector(".guesses-text b"); // texto de la palabra 
const keyboardDiv = document.querySelector(".keyboard"); // clase del teclado
const hangmanImage = document.querySelector(".hangman-box img"); // clase de la imgen y clase global img 
const gameModal = document.querySelector(".game-modal"); // clase modo de juego
const playAgainBtn = gameModal.querySelector("button"); // objeto etiqueta button 

    const errorSounds = [];
    for (let i = 1; i <= 5; i++) 
    {
        errorSounds.push(new Audio(`Sound/Error${i}.mp3`));
    }

    const manejarError = () => {
        const randomSoundIndex = Math.floor(Math.random() * 5) + 1; 
        const errorSound = document.getElementById(`errorSound${randomSoundIndex}`);
    
        if (errorSound) {
            errorSound.play();
        }
    
       
    };
    


// INICIALIZAR LAS VARIABLES
let currentWord, correctLetters, wrongGuessCount; 
const maxGuesses = 6;

const resetGame = () => {
    // DEVUELVE LAS VARIABLES A SU ESTADO ORIGINAL, PARA COMENZAR DE NUEVO EL JUEGO
    correctLetters = [];
    wrongGuessCount = 0; // contador de intentos 
    hangmanImage.src = "images/img_0.png"; //primera IMAGEN
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`; //CONTADOR QUE SE MUESTRA EN EL HTML 
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join(""); //
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // SELECCIONA UNA PALABRA ALEATORIA DEL BANCO DE PALABRAS
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; // ACTUALIZA LA PALABRA 
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    // PANTALLA EMERGENTE  DE PANTALLA FINAL ANTES DE REINICIAR
    const modalText = isVictory ? `Acertastes la palabra es:` : 'La palabra correcta era:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'steve1.gif' : 'steve.jpg'}`;
    gameModal.querySelector("h4").innerText = isVictory ? 'felicidades!' : 'Vuelve a intentarlo!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}

//Colocamos el audio
const correctSound = new Audio('Sound/Conseguido.mp3');


const initGame = (button, clickedLetter) => {
    // chekea si la letra seleccionada esta en la palabra actual
    if (currentWord.includes(clickedLetter)) {
        // Muestra que la letra es correcta en la palabra
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                const letterElement = wordDisplay.querySelectorAll("li")[index];
                letterElement.innerText = letter;
                letterElement.classList.add("guessed");

                // Reproduce el sonido de acierto si está definido
                if (correctSound) {
                    correctSound.play();
                }
            }
        });
    } else {
        // Si la letra seleccionada no pertence a la palabra a adivinar el contador aumenta y la imagen del ahorcado tambien
        wrongGuessCount++; // conteo de intentos fallidos aumentando 
        hangmanImage.src = `images/img_${wrongGuessCount}.png`; // IMAGENES DEL AHORCADO

        // Aquí es donde se maneja el error, por lo que puedes agregar el código para reproducir el sonido de error aquí
        const randomSoundIndex = Math.floor(Math.random() * errorSounds.length);
        const errorSound = errorSounds[randomSoundIndex];

        // Verifica si el elemento de audio existe y, si es así, reprodúcelo
        if (errorSound) {
            errorSound.play();
        }
    }
    button.disabled = true; //Deshabilitar el botón en el que se hizo clic para que el usuario no pueda volver a hacer clic // estos son los botones del abecedario
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    
    // Llama a la funcion gameOver si cualquiera de las condiciones se cumple
    if(wrongGuessCount === maxGuesses) return gameOver(false); // con el argumento false si pierdes
    if(correctLetters.length === currentWord.length) return gameOver(true); // con el argumentos true si aciertas la palabra
}


// BUCLE FOR para crear los botones del juego // el bucle empieza en 97 y termina en 122 por el motivo de codigo del caracter
//los codigos de los caracteres del Abecedario 
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button); // agregar el boton en como hijo de keyboard 
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i))); 
}

//funcion para obtener un palabra aleatoria
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);



// ------ COSAS QUE IMPLEMENTAR ------\\

//numero 1 intentos en la barra de corazones
//agregar el inventario 
//movimiento de la mano
// cambiar el fondo
// opacidad en la barra del juego
//quitar el stik man


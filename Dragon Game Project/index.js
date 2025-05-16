score = 0;
cross = true;
//It is used to track the interaction between dino and obstacle
let isGameOver = false;

const audio = new Audio("./images/music.mp3");
   const audiogo = new Audio("./images/gamestop.wav");
document.addEventListener("DOMContentLoaded", () => {
    //"DOMContentLoaded

    const startMusic = () => {
        audio.play().catch(err => {
            console.error("Playback failed:", err);
        });

        // Remove the listener after first play
        document.removeEventListener("keydown", startMusic);
        //removeEventListener: So music doesn’t restart on every key press.
    };

    document.addEventListener("keydown", startMusic);
});

setTimeout(() => {
    audio.play()
}, 1000);

document.onkeydown = function (e) {
    //onkeydown is a global event for your keyboard
    //e is an event listener object , which contains info like which key was pressed.

if (isGameOver) return; 
// Don't allow movement after game over

    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        //38 is keycode for up key

        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        //redirecting classlist to animdino to create dynamic effect
        //The classList property returns the CSS classnames of an element.it is a dom property.
        //  getElementsByClassName("box") → finds all elements that already have the class box
        //element.classList.add("new-class") → adds a new class to an element (even if it 
        // didn’t have it before)

        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700); //we need to eleminate the classlist of animadino if it stucks somewhere
    }

    if (e.keyCode == 39) {
        //39 is keycode for rightkey
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
         //dino x calculates the current horizontal (left) position of the dino element, and store it as a number in dinox."
        /* 
        window.getComputedStyle() is a JavaScript method that lets you read the final, actual CSS styles applied to an element
         it will return an object containing values inside it
         getCOmputerStyle(element,pseudoelement)
         element-which you have already styled
         pseudoelement This argument is optional and allows you to specify a pseudo-element for which you want to get the 
         computed style. 
         If you want to get the computed style of a regular element, you should omit the pseudoElt argument or pass null. 
          */
        /* 
        The getPropertyValue() method returns the value of the specified CSS property.
        in this case it is distance from left margin
        */

        dino.style.left = dinoX + 112 + "px";
        //Moves the dino 112px to the right by updating the left property.
    }

    if (e.keyCode == 37) {
        //37 is keycode for left key 

        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
      // It is a game loop which checks every 10ms, for collision and scoring

    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
//dx and dy are position of dino

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
//ox and oy are position of obstacle

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    //offsetX and offsetY are distance between dino and obstacle

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again";
        obstacle.classList.remove('obstacleAni');
        //Removes obstacle animation to stop it.

        isGameOver = true;
        //stop dino movement after game is over
       
audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    
    else if (offsetX < 145 && cross) {
        score += 1; 
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            //animation speeed increases 
            newDur = aniDur - 0.1; // duration speed decreases
            //to make game tough
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}
// Hangman
// Credit to: https://codepen.io/cathydutton/pen/ldazc
// Custom changes made to make it follow my code-base styling
var Canvas = {

    stickman: 0,
    context: 0,

    canvas (){
        this.stickman = document.getElementById("stickman");
        this.context = stickman.getContext('2d');
        this.context.beginPath();
        this.context.strokeStyle = "#000000";
        this.context.lineWidth = 2;
    },

    reset () {
        this.context.clearRect(0, 0, 400, 400);
    },

    draw ($pathFromx, $pathFromy, $pathTox, $pathToy) {
        this.context.moveTo($pathFromx, $pathFromy);
        this.context.lineTo($pathTox, $pathToy);
        this.context.stroke(); 
    },

    drawArray: [
        function () {
            Canvas.draw(60, 70, 100, 100);
        },
    
        function () {
            Canvas.draw(60, 70, 20, 100);
        },
        
        function () {
            Canvas.draw(60, 46, 100, 50);
        },
    
        function () {
            Canvas.draw(60, 46, 20, 50);
        },
        
        function () {
            Canvas.draw(60, 36, 60, 70);
        },
        
        function (){
            Canvas.stickman = document.getElementById("stickman");
            Canvas.context.beginPath();
            Canvas.context.arc(60, 25, 10, 0, Math.PI * 2, true);
            Canvas.context.stroke();
        },

        function () {
            Canvas.draw(60, 5, 60, 15);
        },
    
        function () {
            Canvas.draw(0, 5, 70, 5);
        },
    
        function () {
            Canvas.draw(10, 0, 10, 600);
        },
        
        function () {
            Canvas.draw(0, 150, 150, 150);
        },
    ]
};
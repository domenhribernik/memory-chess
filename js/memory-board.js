document.addEventListener("DOMContentLoaded", function () {
    const board = document.querySelector('.board');
    let chessBoard = [];
    let labels = [];
    let squares = [];
    let display = document.querySelector('.square-name');
    let score = document.querySelector('.score');
    let scoreNum = 0;

    let createSquareGame = () => {
        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {
                squares.push(String.fromCharCode(j + 64) + (9 - i).toString());
            }
        }
        for (let i = squares.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [squares[i], squares[j]] = [squares[j], squares[i]];
        }
        display.innerText = squares.shift();
        console.log(display);
    }

    let handleInputClick = colorOrButton => {
        let code = display.innerText[0].charCodeAt(0) + parseInt(display.innerText[1]);
        code % 2 === colorOrButton ? (Utils.showPopup(0), scoreNum++, score.innerText = `Score: ${scoreNum}`) :
            (Utils.showPopup(1), scoreNum = 0, score.innerText = `Score: ${scoreNum}`);
        display.innerText = squares.shift();
        if (squares.length === 0) createSquareGame();
    }

    if (Utils.isMobileDevice()) {
        console.log("You are on a mobile device.");
    } else {
        console.log("You are not on a mobile device.");
    }

    createSquareGame();

    if (board) chessBoard = Utils.createBoard(board, labels);

    document.querySelectorAll('.controls input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.checked) Utils.handleCheckboxChange(checkbox, chessBoard, board, labels);
        checkbox.addEventListener('change', () => Utils.handleCheckboxChange(checkbox, chessBoard, board, labels));
    });
    document.querySelectorAll('.dark-button, .light-button').forEach(element => {
        let button = element.className === "dark-button" ? 0 : 1;
        element.addEventListener('click', () => handleInputClick(button));
    });
    document.addEventListener('keydown', event => {
        if (event.key === "ArrowLeft") handleInputClick(0);
        else if (event.key === "ArrowRight") handleInputClick(1);
    });
});
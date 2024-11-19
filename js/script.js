document.addEventListener("DOMContentLoaded", function () {
    const board = document.querySelector('.board');
    let chessBoard = [];
    let labels = [];
    let squares = [];
    let display = document.querySelector('.square-name');
    let score = document.querySelector('.score');
    let scoreNum = 0;

    let createBoard = () => {
        let isWhite = true;

        for (let i = 1; i <= 9; i++) {
            chessBoard[i - 1] = [];
            for (let j = 0; j <= 8; j++) {
                const square = document.createElement('div');
                const squareName = String.fromCharCode(j + 96) + (9 - i).toString();
                if (i === 9 || j === 0) {
                    square.classList.add('helper');
                    i === 9 && j !== 0 ? square.dataset.originalText = String.fromCharCode(j + 96) :
                        i !== 9 && j === 0 ? square.dataset.originalText = (9 - i).toString() : square.dataset.originalText = "";
                    labels.push(square);
                    board.appendChild(square);
                }
                else {
                    square.classList.add('square', squareName);
                    isWhite ? square.classList.add('light') : square.classList.add('dark');
                    isWhite = !isWhite;
                    chessBoard[i - 1][j] = square;
                    board.appendChild(square);
                }
            }
            isWhite = !isWhite;
        }
    }

    let handleCheckboxChange = checkbox => {
        const checkboxId = checkbox.id;

        if (board) {
            switch (checkboxId) {
                case 'squares':
                    showSquares(checkbox.checked);
                    break;
                case 'labels':
                    showLabels(checkbox.checked);
                    break;
                case 'board':
                    showBoard(checkbox.checked);
                    break;
                default:
                    break;
            }
            window.scrollTo(0, 100);
        }
    }

    let showSquares = checked => {
        if (board.style.display === 'none') {
            board.style.display = 'grid';
            document.getElementById('board').checked = true;
        }
        chessBoard.forEach(row => {
            row.forEach(square => checked ? square.innerText = square.classList[1].toString() : square.innerText = '');
        });
    }

    let showLabels = checked => {
        if (board.style.display === 'none') {
            board.style.display = 'grid';
            document.getElementById('board').checked = true;
        }
        if (labels.length > 0) labels.forEach((label) => label.innerText = checked ? label.dataset.originalText : '');
    };

    let showBoard = checked => {
        if (document.getElementById('labels').checked === true && !checked) {
            document.getElementById('labels').checked = false;
            showLabels(false);
        }
        if (document.getElementById('squares').checked === true && !checked) {
            document.getElementById('squares').checked = false;
            showSquares(false);
        }
        board.style.display = checked ? 'grid' : 'none';
    }

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
        code % 2 === colorOrButton ? (showPopup(0), scoreNum++, score.innerText = `Score: ${scoreNum}`) :
            (showPopup(1), scoreNum = 0, score.innerText = `Score: ${scoreNum}`);
        display.innerText = squares.shift();
        if (squares.length === 0) createSquareGame();
    }

    let showPopup = result => {
        var popup = document.getElementById('popup');
        popup.textContent = result === 0 ? '✅' : '❌';
        popup.classList.remove('popup-hidden');
        setTimeout(function () {
            popup.classList.add('popup-hidden');
        }, 300);
    }

    let isMobileDevice = () => window.innerWidth <= 768;

    if (isMobileDevice()) {
        console.log("You are on a mobile device.");
    } else {
        console.log("You are not on a mobile device.");
    }

    var pageName = window.location.pathname.split("/").pop().split(".")[0];

    switch (pageName) {
        case "memory-board":
            createSquareGame();
            break;
        case "legal-moves":
            createPiecePositionGame();
        default:
            break;
    }

    if (board) createBoard();
    document.querySelectorAll('.controls input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.checked) handleCheckboxChange(checkbox);
        checkbox.addEventListener('change', () => handleCheckboxChange(checkbox));
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
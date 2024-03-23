document.addEventListener("DOMContentLoaded", function() {
    const board = document.querySelector('.board');
    let chessBoard = [];
    let labels = [];
    
    let createBoard = () => {
        let isWhite = true;

        for (let i = 1; i <= 9; i++) {
            chessBoard[i-1] = [];
            for (let j = 0; j <= 8; j++) {
                const square = document.createElement('div');
                const squareName = String.fromCharCode(j + 96) + (9-i).toString();
                if (i === 9 || j === 0) {
                    square.classList.add('helper');
                    i === 9 && j !== 0 ? square.dataset.originalText = String.fromCharCode(j + 96) :
                    i !== 9 && j === 0 ? square.dataset.originalText = (9-i).toString() : square.dataset.originalText = "";
                    labels.push(square);
                    board.appendChild(square);
                }
                else {
                    square.classList.add('square', squareName);
                    isWhite ? square.classList.add('light') : square.classList.add('dark');
                    isWhite = !isWhite;
                    chessBoard[i-1][j] = square;
                    board.appendChild(square);
                }      
            }
            isWhite = !isWhite;
        }
    }

    let handleCheckboxChange = checkbox => {
        const checkboxId = checkbox.id;

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
    }

    let showSquares = checked => {
        if (board) {
            if (board.style.display === "none") {
                board.style.display = "grid";
                document.getElementById('board').checked = true;
            } 
            chessBoard.forEach(row => {
                row.forEach(square => checked ? square.innerText = square.classList[1].toString() : square.innerText = "");
            });
        }    
    }

    let showLabels = checked => {
        if (board) {
            if (board.style.display === "none") {
                board.style.display = "grid";
                document.getElementById('board').checked = true;
            } 
            if (labels.length > 0) labels.forEach((label) => label.innerText = checked ? label.dataset.originalText : "");
        }
    };

    let showBoard = checked => {
        if (board) {
            if (document.getElementById('labels').checked === true) {
                document.getElementById('labels').checked = false;
                showLabels(false);
            }
            if (document.getElementById('squares').checked === true) {
                document.getElementById('squares').checked = false;
                showSquares(false);
            }
            board.style.display = checked ? "grid" : "none";
        }
    }

    let isMobileDevice = () => window.innerWidth <= 768; 
    
    if (isMobileDevice()) {
        console.log("You are on a mobile device.");
    } else {
        console.log("You are not on a mobile device.");
    }

    if (board) createBoard();
    document.querySelectorAll('.controls input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => handleCheckboxChange(checkbox));
    });
});
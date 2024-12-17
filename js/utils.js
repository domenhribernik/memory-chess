class Utils {
    static createBoard(board, labels) {
        let isWhite = true;
        let chessBoard = [];

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
        return chessBoard;
    }

    static handleCheckboxChange(checkbox, chessBoard, board, labels) {
        const checkboxId = checkbox.id;
        let checked = checkbox.checked;

        if (board) {
            switch (checkboxId) {
                case 'squares':
                    showSquares(checked, board, chessBoard);
                    break;
                case 'labels':
                    showLabels(checked, board, labels);
                    break;
                case 'board':
                    showBoard(checked, board, chessBoard, labels);
                    break;
                default:
                    break;
            }
            window.scrollTo(0, 100);
        }
    }

    static showPopup(result) {
        var popup = document.getElementById('popup');
        popup.textContent = result === 0 ? '✅' : '❌';
        popup.classList.remove('popup-hidden');
        setTimeout(function () {
            popup.classList.add('popup-hidden');
        }, 300);
    }

    static isMobileDevice = () => window.innerWidth <= 768;
}

let showSquares = (checked, board, chessBoard) => {
    if (board.style.display === 'none') {
        board.style.display = 'grid';
        document.getElementById('board').checked = true;
    }
    
    chessBoard.forEach(row => {
        row.forEach(square =>  square.querySelector('.small-piece-img') ? null :
            checked ? square.innerText = square.classList[1].toString(): square.innerText = '');
    });
}

let showLabels = (checked, board, labels) => {
    if (board.style.display === 'none') {
        board.style.display = 'grid';
        document.getElementById('board').checked = true;
    }
    if (labels.length > 0) labels.forEach((label) => label.innerText = checked ? label.dataset.originalText : '');
};

let showBoard = (checked, board, chessBoard, labels) => {
    if (document.getElementById('labels').checked === true && !checked) {
        document.getElementById('labels').checked = false;
        showLabels(false, board, labels);
    }
    if (document.getElementById('squares').checked === true && !checked) {
        document.getElementById('squares').checked = false;
        showSquares(false, board, chessBoard);
    }
    board.style.display = checked ? 'grid' : 'none';
}

window.Utils = Utils;
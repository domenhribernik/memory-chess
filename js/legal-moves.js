document.addEventListener("DOMContentLoaded", function () {
    const board = document.querySelector('.board');
    let pieces = ['pawn'];
    let currSquareName = "";
    let randomPieceName = "";
    let randomPiecePosition = "";
    let currSquare = null;
    let chessBoard = [];
    let labels = [];
    const enterButton = document.querySelector(".enter");
    let score = document.querySelector('.score');
    let scoreNum = 0;

    let createPiecePositionGame = () => {
        if (board) chessBoard = Utils.createBoard(board, labels);
        handleEnterClick();
    }

    let getAllMoves = () => {
        board.querySelectorAll('.square').forEach(square => square.classList.remove('hilight'));
        let moves = [];
        let directions = [];
        let color = 'w';
        let position = randomPiecePosition;
        let piece = randomPieceName;

        switch (piece) {
            case 'king':
                directions = [
                    [1, 0], [-1, 0], [0, 1], [0, -1], 
                    [1, 1], [1, -1], [-1, 1], [-1, -1]
                ];
                simpleDirections(moves, directions, position);
                break;
            case 'queen':
                directions = [
                    [1, 0], [-1, 0], [0, 1], [0, -1],
                    [1, 1], [1, -1], [-1, 1], [-1, -1]
                ];
                complexDirections(moves, directions, position);
                break;
            case 'rook':
                directions = [
                    [1, 0], [-1, 0], [0, 1], [0, -1]
                ];
                complexDirections(moves, directions, position);
                break;
            case 'bishop':
                directions = [
                    [1, 1], [1, -1], [-1, 1], [-1, -1]
                ];
                complexDirections(moves, directions, position);
                break;
            case 'knight':
                directions = [
                    [2, 1], [2, -1], [-2, 1], [-2, -1],
                    [1, 2], [1, -2], [-1, 2], [-1, -2]
                ];
                simpleDirections(moves, directions, position);
                break;
            case 'pawn':
                moves.push(position[0] + (parseInt(position[1]) + 1));
                break;
                default:
                    break;
                }
                
        console.log(moves);
        return moves;
    }

    let simpleDirections = (moves, directions, position) => {
        directions.forEach(move => {
            const newRow = position[0].charCodeAt(0) + move[0];
            const newCol = parseInt(position[1]) + move[1];
            if (newRow >= 97 && newRow <= 104 && newCol >= 1 && newCol <= 8) {
                moves.push(String.fromCharCode(newRow) + newCol);
            }
        });
    }

    let complexDirections = (moves, directions, position) => {
        directions.forEach(direction => {
            for (let i = 1; i < 8; i++) {
                const newRow = position[0].charCodeAt(0) + direction[0] * i;
                const newCol = parseInt(position[1]) + direction[1] * i;
                if (newRow >= 97 && newRow <= 104 && newCol >= 1 && newCol <= 8) {
                    moves.push(String.fromCharCode(newRow) + newCol);
                } else {
                    break;
                }
            }
        });
    }

    let randomPiece = path => {
        let src = "../assets/white"; 
        const displayPiece = document.querySelector('.piece-img');
        const pieceTable = {
            king: 'K',
            queen: 'Q',
            rook: 'R',
            bishop: 'B',
            knight: 'N',
            pawn: ''
        };
        randomPieceName = pieces[Math.floor(Math.random() * pieces.length)];
        randomPiecePosition = `${String.fromCharCode(97 + Math.floor(Math.random() * 8))}${Math.floor(Math.random() * 8) + 1}`;
        randomPieceName === 'pawn' && randomPiecePosition[1] == 8 ? randomPiecePosition = `${randomPiecePosition[0]}7` : null; 

        displayPiece.src = `${src}/${randomPieceName}.svg`;
        score.textContent = pieceTable[randomPieceName] + randomPiecePosition;
        currSquare = document.querySelector(`.${randomPiecePosition}`);
        if (currSquare.innerText != "") {
            currSquareName = currSquare.innerText;
            currSquare.innerText = "";
        }
        if (currSquare) {
            const pieceImg = document.createElement('img');
            pieceImg.src = `${src}/${randomPieceName}.svg`;
            pieceImg.classList.add('small-piece-img');
            pieceImg.classList.add(randomPieceName);
            currSquare.appendChild(pieceImg);
        }
    }

    let deletePiece = () => {
        currSquare.querySelector('.small-piece-img').remove();
        if (currSquareName != "") {
            currSquare.innerText = currSquareName;
            currSquareName = "";
        }
        else if (document.getElementById('squares').checked) {
            currSquare.innerText = currSquare.classList[1];
        }
    }

    let handleRadioChange = radio => {
        switch (radio.value) {
            case 'king':
                pieces = ['king'];
                break;
            case 'queen':
                pieces = ['queen'];
                break;
            case 'rook':
                pieces = ['rook'];
                break;
            case 'bishop':
                pieces = ['bishop'];
                break;
            case 'knight':
                pieces = ['knight'];
                break;
            case 'pawn':
                pieces = ['pawn'];
                break;
            default:
                pieces = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'];
                break;
        }
    }

    let handleEnterClick = () => {
        currSquare ? deletePiece() : null;
        randomPiece();
        const moves = getAllMoves();
        moves.forEach(move => {
            board.querySelector(`.${move}`).classList.add('hilight');
        });
    }

    if (Utils.isMobileDevice()) {
        console.log("You are on a mobile device.");
    } else {
        console.log("You are not on a mobile device.");
    }

    createPiecePositionGame();

    document.querySelectorAll('.controls input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.checked) Utils.handleCheckboxChange(checkbox, chessBoard, board, labels);
        checkbox.addEventListener('change', () => Utils.handleCheckboxChange(checkbox, chessBoard, board, labels));
    });
    document.querySelectorAll('.pieces input[type="radio"]').forEach(radio => {
        if (radio.checked) handleRadioChange(radio);
        radio.addEventListener('change', () => handleRadioChange(radio));
    });
    if (enterButton) {
        enterButton.addEventListener('click', () => handleEnterClick());
        document.addEventListener('keydown', event => {
            if (event.key === "Enter") handleEnterClick();
        });
    }
});
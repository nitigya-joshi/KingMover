// document.addEventListener("DOMContentLoaded", () => {
//   const board = document.getElementById("board");
//   const moveKingButton = document.getElementById("moveKing");

//   // Create the chessboard
//   for (let i = 0; i < 64; i++) {
//     const square = document.createElement("div");
//     square.classList.add("square");
//     square.dataset.index = i;
//     board.appendChild(square);
//   }

//   // Function to convert board index to (row, col)
//   const indexToCoord = (index) => [Math.floor(index / 8), index % 8];

//   // Function to convert (row, col) to board index
//   const coordToIndex = (row, col) => row * 8 + col;

//   // Place the king initially
//   let kingIndex = 0;
//   const king = document.createElement("div");
//   king.classList.add("king");
//   king.textContent = "♔";
//   document
//     .querySelector(`.square[data-index="${kingIndex}"]`)
//     .appendChild(king);

//   // Get shortest path
//   const getShortestPath = (start, end) => {
//     const [startX, startY] = start;
//     const [endX, endY] = end;
//     let path = [];
//     let x = startX;
//     let y = startY;
//     while (x !== endX || y !== endY) {
//       if (x < endX) x++;
//       else if (x > endX) x--;
//       if (y < endY) y++;
//       else if (y > endY) y--;
//       path.push([x, y]);
//     }
//     return path;
//   };

//   // Move the king along the path
//   const moveKing = (path) => {
//     if (path.length === 0) return;
//     const [row, col] = path.shift();
//     const newIndex = coordToIndex(row, col);
//     kingIndex = newIndex;
//     document
//       .querySelector(`.square[data-index="${kingIndex}"]`)
//       .appendChild(king);
//     setTimeout(() => moveKing(path), 500);
//   };

//   // Handle the move button click
//   moveKingButton.addEventListener("click", () => {
//     const startInput = document
//       .getElementById("start")
//       .value.split(",")
//       .map(Number);
//     const destinationInput = document
//       .getElementById("destination")
//       .value.split(",")
//       .map(Number);

//     const start = startInput;
//     const end = destinationInput;

//     const path = getShortestPath(start, end);
//     moveKing(path);
//   });
// });

// new code

document.addEventListener("DOMContentLoaded", () => {
    const setStartButton = document.getElementById("setStart");
    const setDestinationButton = document.getElementById("setDestination");
    const startInput = document.getElementById("start");
    const destinationInput = document.getElementById("destination");

    let king = document.querySelector(".king");
    let currentKingPosition = { row: 1, col: 1 };

    setStartButton.addEventListener("click", () => {
        if(startInput.value === "") {
            alert("Please enter start coordinates");
            return;
        }
        const startPos = startInput.value.split(",");
        const startRow = parseInt(startPos[0]);
        const startCol = parseInt(startPos[1]);

        if (!validateInput(startRow, startCol)) return;
        moveKing(startRow, startCol);
        currentKingPosition = { row: startRow, col: startCol };
    });

    setDestinationButton.addEventListener("click", () => {
        if(destinationInput.value === "") {
            alert("Please enter destination coordinates");
            return;
        }
        const destPos = destinationInput.value.split(",");
        const destRow = parseInt(destPos[0]);
        const destCol = parseInt(destPos[1]);

        if (!validateInput(destRow, destCol)) return;

        //disable setStart and setDestination buttons
        setDestinationButton.disabled = true;
        setStartButton.disabled = true;
        kingDestiny(destRow, destCol);
       
        // setDestinationButton.disabled = false;
        // setStartButton.disabled = false;

        currentKingPosition = { row: destRow, col: destCol };
    });

    function kingDestiny(destRow, destCol) {
        const path = getShortestPath(
            [currentKingPosition.row, currentKingPosition.col],
            [destRow, destCol]
        );
        
        const steps = document.querySelector(".steps");
        steps.textContent = `Steps: ${path.length}`;

        // setting timer for each movement
        path.forEach((position, index) => {
            setTimeout(() => {
                moveKing(position[0], position[1]);
            }, index * 500);
        });
        // console.log(`${index} => ${position[0]}, ${position[1]}`);
    }

    function moveKing(col, row) {
        // Get the size of one square
        const square = document.querySelector(".chessBoard .square");
        const squareSize = square.getBoundingClientRect();
        const squareWidth = squareSize.width;
        const squareHeight = squareSize.height;

        // Calculate the translation values based on the row and col
        const translateX = (col - 1) * squareHeight;
        const translateY = (row - 1) * squareWidth;

        // Apply the CSS transform to move the king
        king.style.transform = `translate(${translateX}px, -${translateY}px)`;
        king.style.transition = "transform 0.5s";
    }

    function getShortestPath(start, end) {
        const [startRow, startCol] = start;
        const [endRow, endCol] = end;
        let path = [];
        let y = startRow;
        let x = startCol;

        while (y !== endRow || x !== endCol) {
            if (y < endRow) y++;
            else if (y > endRow) y--;
            if (x < endCol) x++;
            else if (x > endCol) x--;
            path.push([y, x]);
        }
        return path;
    }

    function validateInput(row, col) {
        if (row < 1 || row > 8 || col < 1 || col > 8) {
            alert("Invalid input. Please enter numbers between 1 and 8.");
            return false;
        }
        return true;
    }
});

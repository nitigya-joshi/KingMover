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

        //disable buttons before animation starts
        setDestinationButton.disabled = true;
        setStartButton.disabled = true;

        kingDestiny(destRow, destCol);
        currentKingPosition = { row: destRow, col: destCol };
    });

    function kingDestiny(destRow, destCol) {
        const path = getShortestPath(
            [currentKingPosition.row, currentKingPosition.col],
            [destRow, destCol]
        );

        setTimeout(() => {
            setDestinationButton.disabled = false;
            setStartButton.disabled = false;
        }, path.length * 500);

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

let boxes = document.querySelectorAll(".box");
let reset_game = document.querySelector("#reset");
let msg = document.querySelector("#msg");
let line = document.querySelector("#line");

let turn_O = true; // 'O' starts the game

const win_pattern = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8]  
];

const resetGame = () => {
    turn_O = true;
    enableboxes();
    msg.innerText = "Winner is:";
    msg.classList.add("hide");
    line.classList.add("hide");
    line.style.width = "0";
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn_O) {
            box.innerText = "O";
            box.setAttribute("data-value", "O");
        } else {
            box.innerText = "X";
            box.setAttribute("data-value", "X");
        }
        turn_O = !turn_O;
        box.disabled = true;

        box.classList.add("clicked"); // Add shadow effect on click
        winner();
    });
});

const disableboxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const enableboxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("clicked");
        box.removeAttribute("data-value");
    });
};

const showWinner = (winner, pattern) => {
    msg.innerText = `Winner is: ${winner}`;
    msg.classList.remove("hide");
    disableboxes();
    drawLine(pattern);
};

// Draw yellow line on winning pattern
const drawLine = (pattern) => {
    let firstBox = boxes[pattern[0]];
    let lastBox = boxes[pattern[2]];

    let firstRect = firstBox.getBoundingClientRect();
    let lastRect = lastBox.getBoundingClientRect();
    let gameRect = document.querySelector(".game").getBoundingClientRect();

    let startX = firstRect.left + firstRect.width / 2 - gameRect.left;
    let startY = firstRect.top + firstRect.height / 2 - gameRect.top;
    let endX = lastRect.left + lastRect.width / 2 - gameRect.left;
    let endY = lastRect.top + lastRect.height / 2 - gameRect.top;

    let length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    let angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.left = `${startX}px`;
    line.style.top = `${startY}px`;
    line.classList.remove("hide");
};

const winner = () => {
    for (let pattern of win_pattern) {
        let p1 = boxes[pattern[0]].innerText;
        let p2 = boxes[pattern[1]].innerText;
        let p3 = boxes[pattern[2]].innerText;

        if (p1 !== "" && p1 === p2 && p2 === p3) {
            console.log("Winner:", p1);
            showWinner(p1, pattern);
            return;
        }
    }
    checkDraw();
};

const checkDraw = () => {
    if ([...boxes].every((box) => box.innerText !== "")) {
        msg.innerText = "It's a Draw!";
        msg.classList.remove("hide");
        disableboxes();
    }
};

reset_game.addEventListener("click", resetGame);


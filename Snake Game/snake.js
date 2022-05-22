import { getInputDirection } from "./input.js";

export const snakeSpeed = 10;
const snakeBody = [{ x: 10, y: 11},];
let newSegments = 0;


export function update() {
    addSegments();
    const inputDirectiion = getInputDirection();
    for (let k = snakeBody.length - 2; k >= 0; k--) {
        snakeBody[k + 1] = {...snakeBody[k]}
    }    


    snakeBody[0].x += inputDirectiion.x;
    snakeBody[0].y += inputDirectiion.y;
}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    })
}



export function expandSnake(amount) {
    newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return equalPositions(segment, position);
    })
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
    for (let k = 0; k < newSegments; k++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1]});
    }

    newSegments = 0;
}
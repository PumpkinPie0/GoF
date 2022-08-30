let c = document.getElementById("screen");
let ctx = c.getContext("2d");
let d = new Date()
let lastTime = d.getTime()
let deltaTime = 0
let time;

const windowX = ctx.canvas.offsetLeft
const windowY = ctx.canvas.offsetTop

let cells = [];
let state;
for (let i = 0; i < 360; i++) {
    cells.push([])
    for (let j = 0; j < 180; j++) {
        if (Math.floor(Math.random() * 11) === 7) {
            cells[i][j] = ("Alive")
        }
        else {
            cells[i][j] = ("Dead")
        }
        // cells[i][j] = ("Dead")
    }
}

function copy2Dlist(list) {
    new_list = [];
    for (let i = 0; i < list.length; i++) {
        new_list[i] = list[i].concat()
    }
    return new_list
}

function draw() {
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, c.width, c.height)
    ctx.fillStyle = "#FFFFFF"
    for (i = 0; i < 360; i++) {
        for (let j = 0; j < 180; j++) {
            if (cells[i][j] === "Alive") {
                ctx.fillRect(i * 5, j * 5, 5, 5)
            }
        }
    }
}
draw()

let checklist;
let copied_cells;
let points;
let fps;
function update() {
    copied_cells = copy2Dlist(cells)
    for (let i = 0; i < 360; i++) {
        for (let j = 0; j < 180; j++) {
            points = 0
            if (i === 0) {
                if (j === 0) { checklist = [[1, 0], [1, 1], [0, 1]] }
                else if (j === 179) { checklist = [[1, 0], [0, -1], [1, -1]] }
                else { checklist = [[1, 0], [1, 1], [0, 1], [0, -1], [1, -1]] }
            }
            else if (i === 359) {
                if (j === 0) { checklist = [[-1, 0], [-1, 1], [0, 1]] }
                else if (j === 179) { checklist = [[-1, 0], [-1, -1], [0, -1]] }
                else { checklist = [[-1, 0], [-1, 1], [-1, -1], [0, 1], [0, -1]] }
            }
            else { checklist = [[1, 0], [-1, 0], [1, 1], [-1, 1], [-1, -1], [0, 1], [0, -1], [1, -1]] }
            for (let k = 0; k < checklist.length; k++) {
                if (copied_cells[i + checklist[k][0]][j + checklist[k][1]] === "Alive") {
                    points += 1
                }
            }
            if (copied_cells[i][j] === "Alive") {
                if (points < 2 || points > 3) { cells[i][j] = "Dead" }
                else { cells[i][j] = "Alive" }
            }
            else if (copied_cells[i][j] === "Dead") {
                if (points === 3) { cells[i][j] = "Alive" }
            }
        }
    }
}

function updateTime() {
    d = new Date()
    time = d.getTime()
    deltaTime = time - lastTime
    fps = 1 / (deltaTime / 1000)
    lastTime = time
    document.getElementById("fps").innerHTML = "FPS: " + (fps | 0)
}

let paused = false;
function main() {
    updateTime()
    if (paused !== true) {
        update()
    }
    draw()
    document.getElementById("pausebutton")
}

let mouse;
function mousemove(event) {
    if (0 <= event.pageX - windowX <= 1800 && 0 <= event.pageY - windowY <= 900) {
        mouse = {
            x: event.pageX - windowX,
            y: event.pageY - windowY
        }
    }
}

let index;
function mousedown() {
    index = {
        x: (mouse.x / 5) | 0,
        y: (mouse.y / 5) | 0
    }
    if (cells[index.x][index.y] === "Alive") {
        cells[index.x][index.y] = "Dead"
    }
    else {
        cells[index.x][index.y] = "Alive"
    }
}

function updatePause() {
    paused = !paused
}

function clearArray() {
    cells = []
    for (let i = 0; i < 360; i++) {
        cells.push([])
        for  (let j = 0; j < 180; j++) {
            cells[i][j] = "Dead"
        }
    }
    paused = true
}

window.addEventListener("mousemove", mousemove)
window.addEventListener("mousedown", mousedown)
setInterval(main)
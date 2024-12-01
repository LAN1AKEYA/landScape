document.onselectstart = function () {
    return false;
}

const grid = document.getElementById('grid');
const fatherId = document.getElementById('fatherId');
const gapRan = document.getElementById('gapRan');
const gapNum = document.getElementById('gapNum');
const widthRan = document.getElementById('widthRan');
const widthNum = document.getElementById('widthNum');
const heightRan = document.getElementById('heightRan');
const heightNum = document.getElementById('heightNum');
const radiusRan = document.getElementById('radiusRan');
const radiusNum = document.getElementById('radiusNum');
const colsRan = document.getElementById('colsRan');
const colsNum = document.getElementById('colsNum');
const rowsRan = document.getElementById('rowsRan');
const rowsNum = document.getElementById('rowsNum');
const colorRan = document.getElementById('colorRan');
const colorNum = document.getElementById('colorNum');

const outputArea = document.getElementById('outputArea');
const pen = document.getElementById('pen');
const rubber = document.getElementById('rubber');
const clearButton = document.getElementById('clearButton');
const copyButton = document.getElementById('copyButton');


const topBlock = document.getElementById('top');
const rightBlock = document.getElementById('right');
const bottomBlock = document.getElementById('bottom');
const leftBlock = document.getElementById('left');

const template = {
    idContain: '',
    gap: 15,
    lineWidth: 50,
    lineHeight: 50,
    lineRadius: 30,
    widthFrame: 10,
    heightFrame: 10,
    counter: 2,
    /*
    sensitivy: {
        X: 200,
        Y: 200
    },*/
    sensitivy: 200,
    invert: false,
    lines: []
}

let config = JSON.parse(JSON.stringify(template));

for (let r = 0; r < 100; r++) {
    for (let c = 0; c < 100; c++) {
        let cell = document.createElement('div');
        cell.classList.add('cell', `r-${r}`, `c-${c}`)
        grid.appendChild(cell);
    }
}

function updateLineW() {
    widthRan.value = widthNum.value = config.lineWidth;
    grid.style.gridTemplateColumns = `repeat(100, ${config.lineWidth}px)`;

}
function updateLineH() {
    heightRan.value = heightNum.value = config.lineHeight;
    grid.style.gridTemplateRows = `repeat(100, ${config.lineHeight}px)`;

}
function updateGap() {
    gapRan.value = gapNum.value = config.gap;
    grid.style.gap = `${config.gap}px`;
}
function updateRad() {
    radiusRan.value = radiusNum.value = config.lineRadius;
    for (item of figuresBank) {
        document.querySelector(`.r-${item.topLeftCell[1]}.c-${item.topLeftCell[0]}`).style.borderTopLeftRadius = `${config.lineRadius}px`;
        document.querySelector(`.r-${item.topLeftCell[1]}.c-${item.bottomRightCell[0]}`).style.borderTopRightRadius = `${config.lineRadius}px`;
        document.querySelector(`.r-${item.bottomRightCell[1]}.c-${item.topLeftCell[0]}`).style.borderBottomLeftRadius = `${config.lineRadius}px`;
        document.querySelector(`.r-${item.bottomRightCell[1]}.c-${item.bottomRightCell[0]}`).style.borderBottomRightRadius = `${config.lineRadius}px`;

    }
}
function updateCols() {
    colsRan.value = colsNum.value = config.widthFrame
    grid.style.left = `calc((100vw / 2 + (300px / 2) - (${(config.lineWidth * config.widthFrame) + (config.gap * (config.widthFrame - 1))}px / 2)))`;
    leftBlock.style.width = `calc(((100vw - 300px) / 2) - (${(config.lineWidth * config.widthFrame) + (config.gap * (config.widthFrame - 1))}px / 2))`;
    rightBlock.style.width = `calc(((100vw - 300px) / 2) - (${(config.lineWidth * config.widthFrame) + (config.gap * (config.widthFrame - 1))}px / 2))`;
}
function updateRows() {
    rowsRan.value = rowsNum.value = config.heightFrame;
    grid.style.top = `calc((100vh / 2 - (${(config.lineHeight * config.heightFrame) + (config.gap * (config.heightFrame - 1))}px / 2)))`;
    topBlock.style.height = `calc((100vh / 2) - (${(config.lineHeight * config.heightFrame) + (config.gap * (config.heightFrame - 1))}px / 2))`;
    bottomBlock.style.height = `calc(((100vh / 2) - (${(config.lineHeight * config.heightFrame) + (config.gap * (config.heightFrame - 1))}px / 2))`;

    leftBlock.style.height = rightBlock.style.height = `${(config.lineHeight * config.heightFrame) + (config.gap * (config.heightFrame - 1))}px`;

}

function updateOutput() {

    compareObject = Object.assign({}, config);

    compareObject.gap = `${compareObject.gap}px`;
    compareObject.lineWidth = `${compareObject.lineWidth}px`;
    compareObject.lineHeight = `${compareObject.lineHeight}px`;
    compareObject.lineRadius = `${compareObject.lineRadius}px`;

    outputArea.innerText = JSON.stringify(compareObject);
}

function update(type) {
    requestAnimationFrame(() => {

        switch (type) {
            case "lineW":
                updateLineW();
                updateCols();
                break;
            case "lineH":
                updateLineH();
                updateRows();
                break;
            case "gap":
                updateGap();
                updateCols();
                updateRows();
                break;
            case "rad":
                updateRad();
                break;
            case "cols":
                updateCols();
                break;
            case "rows":
                updateRows();

            case "all":
                updateLineW();
                updateLineH();
                updateGap();
                updateRad();
                updateCols();
                updateRows();
                break;
        }
        fatherId.value = config.idContain;
        updateOutput();
    })

}

update('all');

let idCounter = 0;

function getId() {
    idCounter++;
    return idCounter;
}


fatherId.onchange = () => {
    config.idContain = fatherId.value;
}

widthRan.oninput = () => {
    widthNum.value = widthRan.value;
    config.lineWidth = widthRan.value;
    update('lineW');
}

widthNum.oninput = () => {
    widthRan.value = widthNum.value;
    config.lineWidth = widthNum.value;
    update('lineW');
}

heightRan.oninput = () => {
    heightNum.value = heightRan.value;
    config.lineHeight = heightNum.value;
    update('lineH');
}

heightNum.oninput = () => {
    heightRan.value = heightNum.value;
    config.lineHeight = heightRan.value;
    update('lineH');
}

gapRan.oninput = () => {
    gapNum.value = gapRan.value;
    config.gap = gapNum.value;
    update('gap');
}

gapNum.oninput = () => {
    gapRan.value = gapNum.value;
    config.gap = gapRan.value;
    update('gap');
}

radiusRan.oninput = () => {
    radiusNum.value = radiusRan.value;
    config.lineRadius = `${radiusNum.value}`;
    update('rad');
}

radiusNum.oninput = () => {
    radiusRan.value = radiusNum.value;
    config.lineRadius = `${radiusRan.value}`;
    update('rad');
}



colsRan.oninput = () => {
    colsNum.value = colsRan.value;
    config.widthFrame = colsNum.value;
    update('cols');

}
colsNum.oninput = () => {
    colsRan.value = colsNum.value;
    config.widthFrame = colsRan.value;
    update('cols');

}
rowsRan.oninput = () => {
    rowsNum.value = rowsRan.value;
    config.heightFrame = rowsNum.value;
    update('rows');

}
rowsNum.oninput = () => {
    rowsRan.value = rowsNum.value;
    config.heightFrame = rowsRan.value;
    update('rows');
}

colorRan.oninput = () => {
    colorNum.value = colorRan.value;
}
colorNum.oninput = () => {
    colorRan.value = colorNum.value;
}


function updateFigures(figure) {

    config.lines.push({
        position: {
            width: {
                start: figure.topLeftCell[0] + 1,
                end: figure.bottomRightCell[0] + 2
            },
            height: {
                start: figure.topLeftCell[1] + 1,
                end: figure.bottomRightCell[1] + 2
            }
        },
        force: figure.force,
        duration: figure.duration,
        color: figure.color,
        id: figure.id
    })
}

class Figure {
    constructor(id, force, duration, color) {
        this.id = id;
        this.topLeftCell = [];
        this.bottomRightCell = [];
        this.firstPoint = [];
        this.secondPoint = [];
        this.force = force;
        this.duration = duration;
        this.color = color;
    }
}

let figure;
let figuresBank = [];
let mouseDownSwitch = false;

function updateRadius() {
    for (cell of figure.reservedCells) {

        if (cell.classList.contains(`r-${figure.topLeftCell[1]}`) && cell.classList.contains(`c-${figure.topLeftCell[0]}`)) {
            cell.style.borderTopLeftRadius = `${config.lineRadius}px`;
            cell.classList.add('radiusTopLeft');
        }
        if (cell.classList.contains(`r-${figure.bottomRightCell[1]}`) && cell.classList.contains(`c-${figure.topLeftCell[0]}`)) {
            cell.style.borderBottomLeftRadius = `${config.lineRadius}px`;
            cell.classList.add('radiusBottomLeft');
        }
        if (cell.classList.contains(`r-${figure.topLeftCell[1]}`) && cell.classList.contains(`c-${figure.bottomRightCell[0]}`)) {
            cell.style.borderTopRightRadius = `${config.lineRadius}px`;
            cell.classList.add('radiusTopRight');
        }
        if (cell.classList.contains(`r-${figure.bottomRightCell[1]}`) && cell.classList.contains(`c-${figure.bottomRightCell[0]}`)) {
            cell.style.borderBottomRightRadius = `${config.lineRadius}px`;
            cell.classList.add('radiusBottomRight');
        }
    }
}


function visualUpdate() {
    requestAnimationFrame(() => {


        let selectedCellsBank = [];
        for (let rw = figure.topLeftCell[1]; rw <= figure.bottomRightCell[1]; rw++) {
            for (let cl = figure.topLeftCell[0]; cl <= figure.bottomRightCell[0]; cl++) {
                selectedCellsBank.push(document.querySelector(`.c-${cl}.r-${rw}`));
            }
        }

        if (figure.reservedCells.length < selectedCellsBank.length) {
            figure.reservedCells = selectedCellsBank;
            for (cell of figure.reservedCells) {
                cell.style.borderRadius = '';
                cell.style.backgroundColor = figure.color;
                cell.style.borderColor = figure.color;
            }
            updateRadius();

        }
        else if ((figure.reservedCells.length > selectedCellsBank.length)) {
            const minus = figure.reservedCells.filter(el => !selectedCellsBank.includes(el));
            for (cell of minus) {
                cell.style.backgroundColor = '';
                cell.style.borderRadius = '';
                cell.style.borderColor = '';
            }
            figure.reservedCells = selectedCellsBank;
            updateRadius();
        }
    })
}

let selectedTool = 'pen';

pen.addEventListener('click', () => {
    rubber.classList.remove('selected-tool');
    pen.classList.add('selected-tool');
    selectedTool = 'pen';
})

rubber.addEventListener('click', () => {
    pen.classList.remove('selected-tool');
    rubber.classList.add('selected-tool');
    selectedTool = 'rubber';
})


grid.addEventListener('mousemove', (event) => {
    const positionX = event.clientX - leftBlock.offsetWidth - 300;
    const positionY = event.clientY - topBlock.offsetHeight;

    hoverItem = [Math.floor(positionX / (Number(config.lineWidth) + Number(config.gap))), Math.floor(positionY / (Number(config.lineHeight) + Number(config.gap)))]

    if (mouseDownSwitch) {

        if (selectedTool == 'pen') {
            figure.secondPoint = hoverItem;

            figure.topLeftCell = [
                (figure.firstPoint[0] <= figure.secondPoint[0]) ? figure.firstPoint[0] : figure.secondPoint[0],
                (figure.firstPoint[1] <= figure.secondPoint[1]) ? figure.firstPoint[1] : figure.secondPoint[1]
            ];
            figure.bottomRightCell = [
                (figure.firstPoint[0] >= figure.secondPoint[0]) ? figure.firstPoint[0] : figure.secondPoint[0],
                (figure.firstPoint[1] >= figure.secondPoint[1]) ? figure.firstPoint[1] : figure.secondPoint[1]
            ]
            visualUpdate();
        }
        else {
            console.log('rubber')
        }



        //console.log(`FP-${figure.firstPoint}`, `SP-${figure.secondPoint}`, `TL-${figure.topLeftCell}`, `BR-${figure.bottomRightCell}`)

    }

})

grid.addEventListener('mousedown', (event) => {
    mouseDownSwitch = true;
    figure = new Figure(getId(), 1.001, 1, colorNum.value);

    const positionX = event.clientX - leftBlock.offsetWidth - 300;
    const positionY = event.clientY - topBlock.offsetHeight;

    hoverItem = [Math.floor(positionX / (Number(config.lineWidth) + Number(config.gap))), Math.floor(positionY / (Number(config.lineHeight) + Number(config.gap)))]


    if (selectedTool == 'pen') {

        figure.firstPoint = hoverItem;
        figure.secondPoint = hoverItem;

        figure.reservedCells = [];

        figure.topLeftCell = figure.firstPoint;
        figure.bottomRightCell = figure.firstPoint;

        visualUpdate();
    }
    else if (selectedTool == 'rubber') {
        let idForDelete;
        for (item of figuresBank) {
            if (item.topLeftCell[0] <= hoverItem[0] &&
                item.topLeftCell[1] <= hoverItem[1] &&
                item.bottomRightCell[0] >= hoverItem[0] &&
                item.bottomRightCell[1] >= hoverItem[1]
            ) {
                for (cell of item.reservedCells) {
                    cell.style.backgroundColor = '';
                    cell.style.borderRadius = '';
                    cell.style.borderColor = '';
                }
                idForDelete = item.id;

                console.log(figuresBank)
                figuresBank = figuresBank.filter(element => element.id !== item.id);
                config.lines = config.lines.filter(element => element.id !== item.id);
                updateOutput();
                console.log(figuresBank);
                break;

            }
        }
    }

})

document.addEventListener('mouseup', (event) => {
    if (mouseDownSwitch) {
        if (selectedTool == 'pen') {
            figuresBank.push(figure);
            updateFigures(figure);
            updateOutput();
        }
    }
    mouseDownSwitch = false;

})


copyButton.onclick = () => {
    outputArea.select();
    document.execCommand('copy');
}

clearButton.onclick = () => {
    if (confirm('Are you sure you want to clear the canvas?')) {
        let arr = document.querySelectorAll('.selectedCell');
        arr.forEach((thisItem) => {
            thisItem.classList.remove('selectedCell', 'startPoint', 'endPoint');
            if (thisItem.style[0]) {
                thisItem.style.borderTopLeftRadius = 0;
                thisItem.style.borderTopRightRadius = 0;
                thisItem.style.borderBottomLeftRadius = 0;
                thisItem.style.borderBottomRightRadius = 0;
            }
        })
        for (item of figuresBank) {
            for (cell of item.reservedCells) {
                cell.style.backgroundColor = '';
                cell.style.borderRadius = '';
            }
        }

        figuresBank = [];
        visualUpdate();
        config = JSON.parse(JSON.stringify(template));
        update('all');
    }
}
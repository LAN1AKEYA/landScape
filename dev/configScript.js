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
const outputArea = document.getElementById('outputArea');
const copyButton = document.getElementById('copyButton');
const clearButton = document.getElementById('clearButton');

const topBlock = document.getElementById('top');
const rightBlock = document.getElementById('right');
const bottomBlock = document.getElementById('bottom');
const leftBlock = document.getElementById('left');

const template = {
    idContain: 'contain',
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

let config = Object.assign({}, template);

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
    for (let cell of document.querySelectorAll('.startPoint, .endPoint')) {
        if (cell.classList.contains('startPoint')) {
            cell.style.borderTopLeftRadius = `${config.lineRadius}px`;
            cell.style.borderTopRightRadius = `${config.lineRadius}px`;
        }
        if (cell.classList.contains('endPoint')) {
            cell.style.borderBottomLeftRadius = `${config.lineRadius}px`;
            cell.style.borderBottomRightRadius = `${config.lineRadius}px`;
        }
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







let hoverSwitch, clickSwitch = false;
let linesArray = [];



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

let startPoint, endPoint;

document.addEventListener('mousemove', (event) => {
    if (event.target.classList.contains('cell')) {
        hoverSwitch = true;
        if (clickSwitch) {
            document.querySelector(`.${startPoint.classList[2]}.${event.target.classList[1]}`).classList.add('selectedCell');
        }
    }
    else {
        hoverSwitch = false;
    }
})

document.addEventListener('mousedown', (event) => {
    if (hoverSwitch) {
        hoverSwitch = false;
        clickSwitch = true;

        startPoint = event.target;

        startPoint.style.borderTopLeftRadius = `${config.lineRadius}px`;
        startPoint.style.borderTopRightRadius = `${config.lineRadius}px`;
        startPoint.classList.add('selectedCell');
        startPoint.classList.add('startPoint');
    }
})

document.addEventListener('mouseup', (event) => {
    if (clickSwitch) {
        endPoint = document.querySelector(`.${startPoint.classList[2]}.${event.target.classList[1]}`);
        clickSwitch = false;
        endPoint.style.borderBottomLeftRadius = `${config.lineRadius}px`;
        endPoint.style.borderBottomRightRadius = `${config.lineRadius}px`;
        endPoint.classList.add('endPoint');

        linesArray.push({
            position: {
                width: {
                    start: Number(startPoint.classList[2].slice(2, 5)) + 1,
                    end: Number(endPoint.classList[2].slice(2, 5)) + 1
                },
                height: {
                    start: Number(startPoint.classList[1].slice(2, 5)) + 1,
                    end: Number(endPoint.classList[1].slice(2, 5)) + 2
                }
            },
            force: 1.001,
            duration: 1
        })
        config.lines = linesArray;
        updateOutput();

    }
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
        console.log(arr);
        linesArray = [];
        config = Object.assign({}, template);
        update('all');
    }
}



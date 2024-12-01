class Letter {
    constructor(config) {
        //idContain, widthFrame, heightFrame, lineWidth
        class Line {
            constructor(position, force, duration, color, invert, sensitivy) {

                this.line = document.createElement('div');
                this.line.classList.add('line');
                this.line.style = `
                background-color: ${color};
                border-radius: ${config.lineRadius};
                position: relative;
                `;
                if (position) {
                    this.line.style.gridColumn = `${position.width.start} / ${position.width.end}`
                    this.line.style.gridRow = `${position.height.start} / ${position.height.end}`;
                }
                this.force = force;
                this.duration = duration;
                globalThis.letterFrame.appendChild(this.line);
                this.rect = this.line.getBoundingClientRect();
                if (invert) {
                    this.line.style.top = `${((typeof (sensitivy) == 'number') ? sensitivy : Math.max(sensitivy.X, sensitivy.Y)) * this.duration}px`;
                }
            }
            move(event, sensitivy, invert) {
                let distance = Math.round(Math.sqrt((this.rect.left + this.rect.width / 2 - event[0]) ** 2 + (this.rect.top + this.rect.height / 2 - event[1]) ** 2));
                if (!invert) {
                    distance = -(distance - ((typeof (sensitivy) == 'number') ? sensitivy : Math.max(sensitivy.X, sensitivy.Y)));
                }

                if (typeof (sensitivy) == 'number') {
                    if (distance < sensitivy && distance > 0) {
                        this.line.style.top = `${distance ** this.force * this.duration}px`;
                    }
                    else {
                        this.line.style.top = invert ? distance : 0;
                    }
                }
                else {
                    if (
                        (this.rect.left - sensitivy.X / 2) < event[0] &&
                        event[0] < (this.rect.left + this.rect.width) + sensitivy.X / 2 &&
                        (this.rect.top - sensitivy.Y / 2) < event[1] &&
                        event[1] < (this.rect.top + this.rect.height) + sensitivy.Y / 2
                    ) {
                        this.line.style.top = `${distance ** this.force * this.duration}px`;
                    }
                    else {
                        this.line.style.top = invert ? distance : 0;
                    }
                }
            }
        }

        globalThis.letterFrame = document.createElement('div');
        globalThis.letterFrame.style = `
        
        display: grid;
        position: absolute;
        grid-template-rows: repeat(${config.heightFrame}, ${config.lineHeight});
        grid-template-columns: repeat(${config.widthFrame}, ${config.lineWidth});
        gap: ${config.gap};
        `;
        document.getElementById(config.idContain).appendChild(globalThis.letterFrame);

        this.linesArray = [];


        for (let line of config.lines) {
            this.linesArray.push(new Line(line.position, line.force, line.duration, line.color, config.invert, config.sensitivy));
        }


        document.addEventListener('mousemove', (event) => {
            requestAnimationFrame(() => {
                for (let line of this.linesArray) {
                    line.move([event.clientX, event.clientY], config.sensitivy, config.invert);
                }
            })
        })
    }
}

const currentSrc = document.currentScript.src;
let lettersArray = [];
fetch(new URL('../config.json', currentSrc))
    .then(response => response.json())
    .then((config) => {
        if (config) {
            for (letter of config) {
                lettersArray.push(new Letter(letter));
            }
        }
    })

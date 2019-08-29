import View from './view';

class StartFightBtn extends View {
    constructor() {
        super();

        this.createStartFightBtn();
    }

    createStartFightBtn() {
        const startFight = this.createElement({
            tagName: 'button',
            classNames: ['btn', 'btn-success', 'start-fight-btn'],
            attributes: {
                type: 'button',
            }
        });
        startFight.innerText = 'Start Fight';
        const fighters = document.querySelector('.fighters');
        fighters.append(startFight);
        return startFight;
    }
}

export default StartFightBtn;

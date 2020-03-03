import View from './view';
import {startBattle} from "./battle/startBattle";

class StartFightBtn extends View {
    constructor() {
        super();

        this.createStartFightBtn();
    }

    createStartFightBtn() {
        const startFightWrapper = this.createElement({
            tagName: 'div',
            classNames: ['start-fight-wrapper']
        });
        const startFight = this.createElement({
            tagName: 'button',
            classNames: ['btn', 'btn-danger', 'start-fight-btn'],
            attributes: {
                type: 'button',
            }
        });
        startFight.innerText = 'Start Fight';
        const fighters = document.querySelector('.carousel');
        startFightWrapper.append(startFight);
        fighters.append(startFightWrapper);
        startFight.addEventListener('click', startBattle);
        return startFight;
    }
}

export default StartFightBtn;

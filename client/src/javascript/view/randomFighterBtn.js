import View from "./view";
import {modalUtils} from "./utils/modalUtils";
import {startBattle} from "./battle/startBattle";

class RandomFighterBtn extends View {
    constructor() {
        super();
        this.createRandomFighterBtn();
    }

    createRandomFighterBtn() {
        const startFightWrapper = this.createElement({
            tagName: 'div',
            classNames: ['start-fight-wrapper']
        });
        const randomFighterBtn = modalUtils.createBtn();
        randomFighterBtn.classList.add('btn-success', 'random-fighter-btn');
        randomFighterBtn.setAttribute('data-toggle', 'tooltip');
        randomFighterBtn.setAttribute('data-placement', 'right');
        randomFighterBtn.setAttribute('type', 'button');
        randomFighterBtn.setAttribute('title', 'You can play with a random fighter.\n' +
            'If you want to choose the second fighter,\njust select it.');
        randomFighterBtn.innerText = 'Play with random Fighter';
        randomFighterBtn.addEventListener('click', startBattle);
        const fighters = document.querySelector('.carousel');
        startFightWrapper.append(randomFighterBtn);
        fighters.append(startFightWrapper);
        return randomFighterBtn;
    };

}

export default RandomFighterBtn;

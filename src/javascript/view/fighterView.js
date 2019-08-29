import View from './view';
import StartFightBtn from './startFightBtn';
import {fightHolder} from "../services/fightHolder";

class FighterView extends View {
    constructor(fighter, handleClick) {
        super();

        this.createFighter(fighter, handleClick);
    }

    createFighter(fighter, handleClick) {
        const {name, source} = fighter;
        const nameElement = this.createName(name);
        const imageElement = this.createImage(source);
        const selectBtn = this.createSelectBtn(fighter);

        this.element = this.createElement({tagName: 'div', classNames: ['fighter']});
        this.element.append(imageElement, nameElement, selectBtn);
        this.element.addEventListener('click', event => handleClick(event, fighter), false);
    }

    createName(name) {
        const nameElement = this.createElement({tagName: 'span', classNames: ['name']});
        nameElement.innerText = name;

        return nameElement;
    }

    createImage(source) {
        const attributes = {src: source};
        return this.createElement({
            tagName: 'img',
            classNames: ['fighter-image'],
            attributes
        });
    }

    createSelectBtn(fighter) {
        const selectBtn = this.createElement({
            tagName: 'button',
            classNames: ['btn', 'btn-warning'],
            attributes: {
                type: 'button'
            }
        });
        selectBtn.innerText = 'Select';
        const selectFighter = (event) => {
            event.preventDefault();
            event.stopPropagation();
            let wasSelected = false;
            let wasUnselected = false;

            if (fightHolder.hasFighter1()) {
                if (fightHolder.fighter1._id === fighter._id) {
                    fightHolder.fighter1 = undefined;
                    wasUnselected = true;
                }
            }

            if (fightHolder.hasFighter2()) {
                if (fightHolder.fighter2._id === fighter._id) {
                    fightHolder.fighter2 = undefined;
                    wasUnselected = true;
                }
            }

            if (!wasUnselected && fightHolder.hasAllFighters()) {
                return;
            }

            if (wasUnselected) {
                selectBtn.classList.remove('selected');
                const startBtn = document.querySelector('.start-fight-btn');
                if (startBtn !== undefined && startBtn !== null) {
                    startBtn.remove();
                }
                return;
            }

            if (!fightHolder.hasFighter1()) {
                fightHolder.fighter1 = fighter;
                wasSelected = true;
            } else if (!fightHolder.hasFighter2()) {
                fightHolder.fighter2 = fighter;
                wasSelected = true;
            }
            if (wasSelected) {
                selectBtn.classList.add('selected');
            }

            if (fightHolder.hasAllFighters()) {
                return new StartFightBtn();
            }
        };
        selectBtn.addEventListener('click', selectFighter);
        return selectBtn;
    }

}

export default FighterView;

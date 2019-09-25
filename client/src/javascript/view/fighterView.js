import View from './view';
import StartFightBtn from './startFightBtn';
import {fightHolder} from "../services/fightHolder";
import {fightersCache} from "../services/fightersCache";

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
        const nameElement = this.createElement({tagName: 'span', classNames: ['fighter_name']});
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
            classNames: ['btn', 'btn-warning', 'select'],
            attributes: {
                type: 'button'
            }
        });
        selectBtn.innerText = 'Select';
        const selectFighter = (event) => {
            event.preventDefault();
            event.stopPropagation();
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

            const selectFighter = (propName, funcName) => {
                let wasSelected = false;
                if (!fightHolder[funcName]()) {
                    fightersCache.retrieveDetails(fighter._id).then(fighterDetails => {
                        fightHolder[propName] = fighterDetails;
                        if (fightHolder.hasAllFighters()) {
                            return new StartFightBtn();
                        }
                    });
                    wasSelected = true;
                }
                return wasSelected;
            };
            const wasSelected = selectFighter('fighter1', 'hasFighter1') || selectFighter('fighter2', 'hasFighter2');

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

import View from './view';
import StartFightBtn from './startFightBtn';
import {fightHolder} from "../services/fightHolder";
import {fightersCache} from "../services/fightersCache";
import DeleteFighterEl from './deleteFighterEl';
import RandomFighterBtn from "./randomFighterBtn";

class FighterView extends View {
    constructor(fighter, handleClick, handleDeleteEl, handleHideDeleteEl) {
        super();

        this.createFighter(fighter, handleClick, handleDeleteEl, handleHideDeleteEl);
    }

    createFighter(fighter, handleClick, handleDeleteEl, handleHideDeleteEl) {
        const {name, source} = fighter;
        const id = fighter._id;
        const nameElement = this.createName(name);
        const imageElement = this.createImage(source);
        const selectBtn = this.createSelectBtn(fighter);
        const deleteFighterEl = this.createDeleteFighterEl(id, fighter);


        this.element = this.createElement({
            tagName: 'div',
            classNames: ['fighter'],
            attributes: {
                id: `fighter-${id}`,
                'data-id': id
            }
        });
        this.element.append(deleteFighterEl, imageElement, nameElement, selectBtn);
        this.element.addEventListener('click', event => handleClick(event, fighter), false);
        this.element.addEventListener('mouseover', handleDeleteEl);
        this.element.addEventListener('mouseout', handleHideDeleteEl);
    }

    createDeleteFighterEl(id, fighter) {
        return new DeleteFighterEl(id, fighter).element;
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
        const selectFighter = (e) => {
            e.preventDefault();
            e.stopPropagation();
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
            const wasSelected = selectFighter('fighter1', 'hasFighter1')
                || selectFighter('fighter2', 'hasFighter2');

            if (wasSelected) {
                selectBtn.classList.add('selected');
            }

            const selected = document.querySelectorAll('.selected').length;
            if (selected === 1) {
                return new RandomFighterBtn();
            } else if (selected === 0) {
                document.querySelector('.start-fight-wrapper').remove();
            }

            if (fightHolder.hasAllFighters()) {
                document.querySelector('.random-fighter-btn').remove();
                return new StartFightBtn();
            }
        };
        selectBtn.addEventListener('click', selectFighter);

        return selectBtn;
    }
}

export default FighterView;

import View from '../view';
import {fightHolder} from '../../services/fightHolder'
import FighterBattleView from "./fighterBattleView";
import {fight} from "../../services/fight";
import ProgressBar from "./progressBarView";

class BattleView extends View {
    constructor() {
        super();
        this.fighter1 = fightHolder.fighter1;
        this.fighter2 = fightHolder.fighter2;
        this.createBattleContainer();
    }

    createBattleContainer() {
        this.element = this.createContainer();
        const detailsRowElement = this.createRow();
        this.firstHealthCol = this.createFirstHealthCol();
        this.secondHealthCol = this.createSecondHealthCol();
        const fightRowElement = this.createRow();
        const firstColElement = this.createFirstCol();
        const secondColElement = this.createSecondCol();
        const thirdColElement = this.createThirdCol();
        document.querySelector('#root').append(this.element);
        this.element.append(detailsRowElement, fightRowElement, this.secondHealthCol.element);
        detailsRowElement.append(this.firstHealthCol.element, this.secondHealthCol.element);
        fightRowElement.append(firstColElement, secondColElement, thirdColElement);
    }

    createContainer() {
        return this.createElement({
            tagName: 'div',
            classNames: ['container']
        });
    }

    createRow() {
        return this.createElement({
            tagName: 'div',
            classNames: ['row']
        });
    }

    createFirstHealthCol() {
        return new ProgressBar(1);
    }

    createSecondHealthCol() {
        return new ProgressBar(2);
    }

    createFirstCol() {
        const firstCol = this.createElement({
            tagName: 'div',
            classNames: ['col-sm', 'first-fighter-col']
        });
        const firstFighterView = new FighterBattleView(this.fighter1);
        firstCol.append(firstFighterView.element);
        return firstCol;
    }

    createSecondCol() {
        const secondCol = this.createElement({
            tagName: 'div',
            classNames: ['col-sm']
        });

        const strikeBtn = this.createElement({
            tagName: 'button',
            classNames: ['btn', 'btn-info', 'strike-btn'],
            attributes: {
                type: 'button'
            }
        });
        strikeBtn.innerText = 'Strike!';
        fightHolder.fighter1.resetHealth();
        fightHolder.fighter2.resetHealth();
        strikeBtn.addEventListener('click', () => {
           fight(fightHolder.fighter1, fightHolder.fighter2);
           this.firstHealthCol.update(fightHolder.fighter1);
           this.secondHealthCol.update(fightHolder.fighter2);
        });

        const exitBattleBtn = this.createElement({
            tagName: 'button',
            classNames: ['btn', 'btn-outline-danger', 'exit-battle-btn'],
            attributes: {
                type: 'button'
            }
        });

        exitBattleBtn.innerText = 'Exit Battle';

        const exitBattle = () => {
            this.element.remove();
            const fighters = document.querySelector('.fighters');
            fightHolder.fighter1 = undefined;
            fightHolder.fighter2 = undefined;
            fighters.style.display = 'flex';
        };

        secondCol.append(exitBattleBtn, strikeBtn);
        exitBattleBtn.addEventListener('click', exitBattle);
        return secondCol;
    }

    createThirdCol() {
        const thirdCol = this.createElement({
            tagName: 'div',
            classNames: ['col-sm', 'second-fighter-col']
        });
        const secondFighterView = new FighterBattleView(this.fighter2);
        thirdCol.append(secondFighterView.element);
        return thirdCol;
    }

}

export default BattleView;

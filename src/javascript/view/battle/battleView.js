import View from '../view';
import {fightHolder} from '../../services/fightHolder'
import FighterBattleView from "./fighterBattleView";
import {fight} from "../../services/fight";
import ProgressBar from "./progressBarView";
import ExitBattleBtn from "../exitBattleBtn";

class BattleView extends View {
    constructor() {
        super();
        this.fighter1 = fightHolder.fighter1;
        this.fighter2 = fightHolder.fighter2;
        this.createBattleContainer();
        this.createExitBattleBtn
    }

    createExitBattleBtn() {
        return new ExitBattleBtn();
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
        this.element.append(detailsRowElement, fightRowElement);
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
            classNames: ['btn', 'btn-warning', 'strike-btn'],
            attributes: {
                type: 'button'
            }
        });
        strikeBtn.innerText = 'Strike!';
        const fightDetails = this.createElement({
            tagName: 'div',
            classNames: ['fight-details']
        });
        fightHolder.fighter1.resetHealth();
        fightHolder.fighter2.resetHealth();

        const createStrikeLogMsg = (fighter, fighterHealth) => {
            return `${fighter.name}: ${fighterHealth} -> ${fighter.currentHealth}`
        };

        strikeBtn.addEventListener('click', () => {
            const fighter1Health = fightHolder.fighter1.currentHealth;
            const fighter2Health = fightHolder.fighter2.currentHealth;
            fight(fightHolder.fighter1, fightHolder.fighter2);
            this.firstHealthCol.update(fightHolder.fighter1);
            this.secondHealthCol.update(fightHolder.fighter2);
            fightDetails.innerHTML += `${createStrikeLogMsg(fightHolder.fighter1, fighter1Health)}<br />${createStrikeLogMsg(fightHolder.fighter2, fighter2Health)}<br />`;
        });

        secondCol.append(strikeBtn, fightDetails);
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

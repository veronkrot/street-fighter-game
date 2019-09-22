import View from "./view";
import {fightHolder} from "../services/fightHolder";

class ExitBattleBtn extends View {
    constructor(){
        super();
        this.createExitBattleBtn();
    }
    createExitBattleBtn() {
        const exitBattleBtn = this.createElement({
            tagName: 'button',
            classNames: ['btn', 'btn-danger', 'exit-battle-btn'],
            attributes: {
                type: 'button'
            }
        });
        exitBattleBtn.innerText = 'Exit Battle';

        const exitBattle = () => {
            document.querySelector('.container').remove();
            const fighters = document.querySelector('.carousel');
            fightHolder.fighter1 = undefined;
            fightHolder.fighter2 = undefined;
            fighters.style.display = 'block';
            document.querySelector('.exit-battle-btn').style.display = 'none';
            document.querySelector('.add-fighter').style.display = 'block';
        };
        document.querySelector('.navbar').append(exitBattleBtn);
        exitBattleBtn.addEventListener('click', exitBattle);
        return exitBattleBtn;
    }
}

export default ExitBattleBtn;

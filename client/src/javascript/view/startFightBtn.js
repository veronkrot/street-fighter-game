import View from './view';
import BattleView from "./battle/battleView";

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

        const startBattle = () => {
            document.querySelector('.add-fighter').style.display = 'none';
            document.querySelector('.exit-battle-btn').style.display = 'block';

            fighters.style.display = 'none';
            document.querySelectorAll('.selected').forEach(el => {
                el.classList.remove('selected');
            });
            document.querySelector('.start-fight-btn').remove();
            return new BattleView();
        };
        startFight.addEventListener('click', startBattle)
    }
}

export default StartFightBtn;
import WinnerModal from "../view/modal/winnerModalView";
import {fightHolder} from "./fightHolder";

const performStrike = (fighter1, fighter2) => {
    fighter1.currentHealth = fighter1.currentHealth - fighter2.getHitPower() - fighter1.getBlockPower();
    fighter1.currentHealth = fighter1.currentHealth.toFixed(3);
};

export const fight = (fighter1, fighter2) => {
    performStrike(fighter1, fighter2);
    performStrike(fighter2, fighter1);
    const showWinner = (fighter, title) => {
        document.querySelector('.container').remove();
        const winnerModal = document.querySelector('#winner-modal');
        const closeFunc = () => {
            winnerModal.innerHTML = '';
            const fighters = document.querySelector('.carousel');
            fightHolder.fighter1 = undefined;
            fightHolder.fighter2 = undefined;
            fighters.style.display = 'block';
            document.querySelector('.exit-battle-btn').style.display = 'none';
            document.querySelector('.add-fighter').style.display = 'block';
        };
        const modalDialog = new WinnerModal(fighter, closeFunc, title).element;
        winnerModal.append(modalDialog);
        return winnerModal;
    };

    const fighter2Won = fighter1.currentHealth <= 0;
    const fighter1Won = fighter2.currentHealth <= 0;

    if (fighter2Won && fighter1Won) {
        const winners = [fighter1, fighter2];
        const title = 'A DRAW!';
        return showWinner(winners, title);
    }

    if (fighter2Won) {
        const winner = [fighter2];
        const title = `${fighter2.name} won!`;
        return showWinner(winner, title);
    }
    if (fighter1Won) {
        const winner = [fighter1];
        const title = `${fighter1.name} won!`;
        return showWinner(winner, title);
    }
};

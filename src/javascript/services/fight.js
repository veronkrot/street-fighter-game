import WinnerModal from "../view/modal/winnerModalView";
import {fightHolder} from "./fightHolder";

const performStrike = (fighter1, fighter2) => {
    fighter1.currentHealth = fighter1.currentHealth - fighter2.getHitPower() - fighter1.getBlockPower();
    console.log(fighter1.currentHealth);
};
export const fight = (fighter1, fighter2) => {
    performStrike(fighter1, fighter2);
    performStrike(fighter2, fighter1);
    const showWinner = (fighter) => {
        document.querySelector('.container').remove();
        const winnerModal = document.querySelector('#winner-modal');

        const closeFunc = () => {
            winnerModal.innerHTML = '';
            const fighters = document.querySelector('.fighters');
            fightHolder.fighter1 = undefined;
            fightHolder.fighter2 = undefined;
            fighters.style.display = 'flex';
        };

        const modalDialog = new WinnerModal(fighter, closeFunc).element;
        winnerModal.append(modalDialog);
        return winnerModal;
    };

    if (fighter1.currentHealth <= 0) {
        console.log(`${fighter2.name} won!`);
        return showWinner(fighter2);
    }
    if (fighter2.currentHealth <= 0) {
        console.log(`${fighter1.name} won!`);
        return showWinner(fighter1);
    }
    if (fighter1.currentHealth <= 0 && fighter2.currentHealth <= 0) {
        console.log('a draw!');

    }
};

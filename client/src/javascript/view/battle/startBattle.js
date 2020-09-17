import BattleView from "./battleView";

export const startBattle = () => {
    const fighters = document.querySelector('.carousel');
    document.querySelector('.add-fighter').style.display = 'none';
    document.querySelector('.exit-battle-btn').style.display = 'block';
    fighters.style.display = 'none';
    document.querySelectorAll('.selected').forEach(el => {
        el.classList.remove('selected');
    });
    document.querySelector('.start-fight-btn').remove();
    return new BattleView();
};

import View from "../view";

class ProgressBar extends View {

    constructor(className) {
        super();
        this.element = this.createProgressBar(className);
    }

    createProgressBar(className) {
        const fighterHealthCol = this.createElement({
            tagName: 'div',
            classNames: ['col']
        });

        const progressBarWrapper = this.createElement({
            tagName: 'div',
            classNames: ['progress']
        });

        const progressBar = this.createElement({
            tagName: 'div',
            classNames: ['progress-bar', 'progress-bar-striped', 'bg-success'],
            attributes: {
                role: 'progressbar',
                style: `width: 100%`,
                'aria-valuenow': '100',
                'aria-valuemin': '0',
                'aria-valuemax': '100'
            }
        });
        progressBarWrapper.classList.add(`progress-bar-${className}`);
        fighterHealthCol.append(progressBarWrapper);
        progressBarWrapper.append(progressBar);
        return fighterHealthCol;
    }

    update(fighter) {
        const el = this.element.querySelector('.progress-bar');

        const maxHp = 100;
        const currentHpPercent = (maxHp * fighter.currentHealth) / fighter.health;
        el.style.width = `${currentHpPercent}%`;

        if (currentHpPercent <= 50) {
            el.classList.remove('bg-success');
            el.classList.add('bg-warning');
        }
        if (currentHpPercent <= 20) {
            el.classList.remove('bg-warning');
            el.classList.add('bg-danger');
        }
    }
}

export default ProgressBar;

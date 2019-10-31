import View from "./view";

class DeleteFighterEl extends View {
    constructor(id){
        super();
        this.createDeleteFighterEl(id);
    }

    createDeleteFighterEl(id) {
        this.element = this.createElement({
            tagName: 'button',
            classNames: ['close', 'deleteEl'],
            attributes: {
                type: 'button',
                'data-dismiss': 'modal',
                'aria-label': 'Close',
                'data-id': id
            }
        });

        const ariaHiddenSpan = this.createElement({
            tagName: 'span',
            attributes: {
                'aria-hidden': 'true'
            }
        });
        ariaHiddenSpan.innerHTML = '&times;';
        this.element.append(ariaHiddenSpan);
        this.element.style.display = 'none';

        const deleteFighter = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const fighter = document.querySelector(`.fighter[data-id='${id}']`);
            fighter.style.display = 'none';
        };

        this.element.addEventListener('click', deleteFighter)
    }
}

export default DeleteFighterEl;

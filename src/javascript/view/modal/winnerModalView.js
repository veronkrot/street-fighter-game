import GenericModal from "./genericModal";

class WinnerModal extends GenericModal {
    constructor(fighter, closeBtnHandler) {
        super();
        this.fighter = fighter;
        this.closeBtnHandler = closeBtnHandler;
        const title = `${fighter.name} won!`;
        const buttons = [];
        buttons.push(this.createCloseBtn());
        super.createDialog(this.createModalBody(fighter), title, buttons, closeBtnHandler);
    }

    createModalBody(fighter) {
        const modalBody = this.createElement({
            tagName: 'div',
            classNames: ['modal-body'],
        });
        const {source} = fighter;
        const imageElement = this.createImage(source);
        const fighterElement = this.createElement({tagName: 'div', classNames: ['fighter']});
        fighterElement.append(imageElement);
        modalBody.append(fighterElement);
        return modalBody;
    }

    createImage(source) {
        const attributes = {src: source};
        return this.createElement({
            tagName: 'img',
            classNames: ['winner'],
            attributes
        });
    }

    createCloseBtn() {
        const closeBtn = this.createElement({
            tagName: 'button',
            classNames: ['btn', 'btn-secondary'],
            attributes: {
                'data-dismiss': 'exampleModalLabel'
            }
        });
        closeBtn.innerText = 'Close';
        closeBtn.addEventListener('click', this.closeBtnHandler);
        return closeBtn;
    }
}

export default WinnerModal;

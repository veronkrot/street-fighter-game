import GenericModal from "./genericModal";
import {modalUtils} from "./modalUtils";

class WinnerModal extends GenericModal {
    constructor(fighter, closeBtnHandler, title) {
        super();
        this.fighter = fighter;
        this.closeBtnHandler = closeBtnHandler;
        const buttons = [];
        buttons.push(this.createCloseBtn());
        super.createDialog(this.createModalBody(fighter), title, buttons, closeBtnHandler);
    }

    createModalBody(fighter) {
        const modalBody = modalUtils.createModalBody();
        fighter.forEach((el) => {

            const {source} = el;
            console.log(el);
            const imageElement = this.createImage(source);
            const fighterElement = this.createElement({tagName: 'div', classNames: ['fighter']});
            fighterElement.append(imageElement);
            modalBody.append(fighterElement);
        });
        return modalBody;
    }

    createImage(src) {
        const attributes = {src: src};
        console.log(attributes);
        return this.createElement({
            tagName: 'img',
            classNames: ['winner'],
            attributes
        });
    }

    createCloseBtn() {
        const closeBtn = modalUtils.createCloseBtn();
        closeBtn.innerText = 'Close';
        closeBtn.addEventListener('click', this.closeBtnHandler);
        return closeBtn;
    }
}

export default WinnerModal;

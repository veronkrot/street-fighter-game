import GenericModal from "./genericModal";
import {modalUtils} from "../utils/modalUtils";
import {btnUtils} from "../utils/btnUtils";

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
        return btnUtils.createCloseBtn(this.closeBtnHandler, 'Close');
    }
}

export default WinnerModal;

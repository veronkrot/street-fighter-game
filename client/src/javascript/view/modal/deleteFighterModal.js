import GenericModal from "./genericModal";
import {modalUtils} from "../utils/modalUtils";
import {btnUtils} from "../utils/btnUtils";

class DeleteFighterModal extends GenericModal {
    constructor(fighter, closeBtnHandler, confirmBtnHandler) {
        super();
        const buttons = [];
        this.confirmBtnHandler = confirmBtnHandler;
        buttons.push(this.createCloseBtn(closeBtnHandler));
        buttons.push(this.createConfirmBtn());
        super.createDialog(this.createModalBody(fighter), '', buttons, closeBtnHandler);
    }

    createModalBody(fighter) {
        const modalBody = modalUtils.createModalBody();
        const textWrapper = modalUtils.createTextWrapper();
        textWrapper.innerHTML = `Do you want to delete ${fighter.name}?`;
        modalBody.append(textWrapper);
        return modalBody;
    }

    createCloseBtn(closeBtnHandler) {
        return btnUtils.createCloseBtn(closeBtnHandler, 'Close');
    }

    createConfirmBtn() {
        return btnUtils.createSaveBtn(this.confirmBtnHandler, 'OK');
    }
}

export default DeleteFighterModal;

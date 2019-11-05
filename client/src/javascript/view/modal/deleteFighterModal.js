import GenericModal from "./genericModal";
import {modalUtils} from "./modalUtils";

class DeleteFighterModal extends GenericModal {
    constructor(fighter, closeBtnHandler, confirmBtnHandler) {
        super();
        const buttons = [];
        this.confirmBtnHandler = confirmBtnHandler;
        buttons.push(this.createCloseBtn(closeBtnHandler));
        buttons.push(this.createConfirmBtn(confirmBtnHandler));
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
        const closeBtn = modalUtils.createCloseBtn();
        closeBtn.innerText = 'Close';
        closeBtn.addEventListener('click', closeBtnHandler);
        return closeBtn;
    }

    createConfirmBtn() {
        const confirmBtn = modalUtils.createSaveBtn();
        confirmBtn.innerText = 'Ok';
        confirmBtn.addEventListener('click', this.confirmBtnHandler);
        return confirmBtn;
    }
}

export default DeleteFighterModal;

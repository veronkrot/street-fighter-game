import View from "../view";
import {modalUtils} from "./modalUtils";

class BtnUtils extends View {
    constructor(closeBtnHandler, saveBtnHandler, text) {
        super();
        this.createCloseBtn(closeBtnHandler, text);
        this.createSaveBtn(saveBtnHandler, text);
    }

    createCloseBtn(closeBtnHandler, text) {
        const closeBtn = modalUtils.createBtn();
        closeBtn.classList.add('btn-secondary');
        closeBtn.innerText = text;
        closeBtn.addEventListener('click', closeBtnHandler);
        return closeBtn;
    }

    createSaveBtn(saveBtnHandler, text) {
        const saveBtn =  modalUtils.createBtn();
        saveBtn.classList.add('btn-primary');
        saveBtn.innerText = text;
        saveBtn.addEventListener('click', saveBtnHandler);
        return saveBtn;
    }

    createAddFighterBtn() {
        const addFighterBtn = modalUtils.createBtn();
        addFighterBtn.classList.add('btn-info', 'add-fighter');
        addFighterBtn.setAttribute('type', 'button');
        return addFighterBtn;
    }
}

export const btnUtils = new BtnUtils();

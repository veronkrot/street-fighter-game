import GenericModal from "./genericModal";
import Fighter from "../../fighter";
import {modalUtils} from './modalUtils';
import {validationRules} from "../../services/validationService";


const noopFighter = new Fighter({});

const IGNORED_FIELDS = ['_id', 'currentHealth'];

class AddFighterModal extends GenericModal {
    constructor(noopFighter, saveBtnHandler, closeBtnHandler) {
        super();
        this.saveBtnHandler = saveBtnHandler;
        const title = 'Add Fighter';
        const buttons = [];
        buttons.push(this.createSaveBtn());
        buttons.push(this.createCloseBtn(closeBtnHandler));
        super.createDialog(this.createModalBody(), title, buttons, closeBtnHandler);
    }

    createModalBody() {
        const modalBody = modalUtils.createModalBody();
        const createFighterAttributes = (propName) => {
            const inputGroup = modalUtils.createInputGroup();
            const inputGroupPrepend = modalUtils.createInputGroupPrepend();
            const attributeName = modalUtils.createAttributeName();
            attributeName.innerText = propName;

            const inputAttributeValue = modalUtils.createInputAttributeValue(propName);
            const validFeedback = modalUtils.createValidFeedback(propName);

            const invalidFeedback = modalUtils.createInvalidFeedback(propName);
            if (validationRules[propName]) {
                invalidFeedback.innerText = validationRules[propName].errorMsg;
            }

            inputGroupPrepend.append(attributeName);
            inputGroup.append(inputGroupPrepend, inputAttributeValue, validFeedback,invalidFeedback);
            return inputGroup;
        };

        for (let prop in noopFighter) {
            if (!noopFighter.hasOwnProperty(prop) || IGNORED_FIELDS.includes(prop)) {
                continue;
            }
            const fighterAttribute = createFighterAttributes(prop);
            modalBody.append(fighterAttribute);
        }
        return modalBody;

    }

    createSaveBtn() {
        const saveBtn =  modalUtils.createSaveBtn();
        saveBtn.innerText = 'Save';
        saveBtn.addEventListener('click', this.saveBtnHandler);
        return saveBtn;
    }

    createCloseBtn(closeBtnHandler) {
        const closeBtn =  modalUtils.createCloseBtn();
        closeBtn.innerText = 'Close';
        closeBtn.addEventListener('click', closeBtnHandler);
        return closeBtn;
    }
}

export default AddFighterModal;

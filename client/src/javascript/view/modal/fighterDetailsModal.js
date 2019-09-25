import {validationRules} from "../../services/validationService";
import GenericModal from "./genericModal";
import {modalUtils} from './modalUtils';

const IGNORED_FIELDS = ['_id', 'source', 'name', 'currentHealth'];
const READONLY_FIELDS = ['defense'];

class FighterDetailsModal extends GenericModal {
    constructor(fighter, saveBtnHandler, closeBtnHandler) {
        super();
        this.fighter = fighter;
        this.saveBtnHandler = saveBtnHandler;
        const buttons = [];
        buttons.push(this.createSaveBtn());
        buttons.push(this.createCloseBtn(closeBtnHandler));
        super.createDialog(this.modalBody(), fighter.name, buttons, closeBtnHandler);
    }

    modalBody() {
        const modalBody = modalUtils.createModalBody();
        const createFighterAttributes = (propName, value) => {
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

            if (READONLY_FIELDS.includes(propName)) {
                inputAttributeValue.setAttribute('readonly', 'readonly');
            }

            inputAttributeValue.value = value;
            inputGroupPrepend.append(attributeName);
            inputGroup.append(inputGroupPrepend, inputAttributeValue, validFeedback, invalidFeedback);
            return inputGroup;
        };

        for (let fighterProp in this.fighter) {
            if (this.fighter.hasOwnProperty(fighterProp)) {
                if (IGNORED_FIELDS.includes(fighterProp)) {
                    continue;
                }
                const attr = createFighterAttributes(fighterProp, this.fighter[fighterProp]);
                modalBody.append(attr);
            }
        }
        return modalBody;
    };

    createSaveBtn() {
        const saveBtn = modalUtils.createSaveBtn();
        saveBtn.innerText = 'Save changes';
        saveBtn.addEventListener('click', this.saveBtnHandler);
        return saveBtn;
    }

    createCloseBtn(closeBtnHandler) {
        const closeBtn = modalUtils.createCloseBtn();
        closeBtn.innerText = 'Close';
        closeBtn.addEventListener('click', closeBtnHandler);
        return closeBtn;
    }

}

export default FighterDetailsModal;

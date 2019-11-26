import {validationRules} from "../../services/validationService";
import GenericModal from "./genericModal";
import {modalUtils} from './modalUtils';
import {btnUtils} from "../utils/btnUtils";

const IGNORED_FIELDS = ['_id', 'source', 'name', 'currentHealth'];
const READONLY_FIELDS = ['defense'];

class FighterDetailsModal extends GenericModal {
    constructor(fighter, saveBtnHandler, closeBtnHandler, deleteBtnHandler) {
        super();
        this.fighter = fighter;
        this.saveBtnHandler = saveBtnHandler;
        const buttons = [];
        buttons.push(this.createSaveBtn());
        buttons.push(this.createCloseBtn(closeBtnHandler));
        super.createDialog(this.modalBody(), fighter.name, buttons, closeBtnHandler, deleteBtnHandler);
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
        return btnUtils.createSaveBtn(this.saveBtnHandler, 'Save changes');
    }

    createCloseBtn(closeBtnHandler) {
        return btnUtils.createCloseBtn(closeBtnHandler, 'Close');
    }

}

export default FighterDetailsModal;

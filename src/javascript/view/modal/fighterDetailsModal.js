import {validations} from "../fightersView";
import GenericModal from "./genericModal";

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
        super.createDialog(this.createModalBody(), fighter.name, buttons, closeBtnHandler);
    }

    createModalBody() {
        const modalBody = this.createElement({
            tagName: 'div',
            classNames: ['modal-body'],
        });
        const createFighterAttributes = (propName, value) => {

            const inputGroup = this.createElement({
                tagName: 'div',
                classNames: ['input-group', 'mb-3']
            });
            const inputGroupPrepend = this.createElement({
                tagName: 'div',
                classNames: ['input-group-prepend', 'form-group']
            });
            const attributeName = this.createElement({
                tagName: 'span',
                classNames: ['input-group-text'],
                attributes: {
                    id: 'inputGroup-sizing-default'
                }
            });
            attributeName.innerText = propName;

            let id = `fighter-${propName}`;
            const inputAttributeValue = this.createElement({
                tagName: 'input',
                classNames: ['form-control'],
                attributes: {
                    type: 'number',
                    id: id
                }
            });

            const validFeedback = this.createElement({
                tagName: 'div',
                classNames: [propName, 'valid-feedback']
            });
            validFeedback.innerText = 'Looks good!';
            validFeedback.style.display = 'none';

            const invalidFeedback = this.createElement({
                tagName: 'div',
                classNames: [propName, 'invalid-feedback']
            });
            invalidFeedback.style.display = 'none';
            if (validations[propName]) {
                invalidFeedback.innerText = validations[propName].errorMsg;
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
        const saveBtn = this.createElement({
            tagName: 'button',
            classNames: ['btn', 'btn-primary'],
        });
        saveBtn.innerText = 'Save changes';
        saveBtn.addEventListener('click', this.saveBtnHandler);
        return saveBtn;
    }

    createCloseBtn(closeBtnHandler) {
        const closeBtn = this.createElement({
            tagName: 'button',
            classNames: ['btn', 'btn-secondary'],
            attributes: {
                'data-dismiss': 'exampleModalLabel'
            }
        });
        closeBtn.innerText = 'Close';
        closeBtn.addEventListener('click', closeBtnHandler);
        return closeBtn;
    }

}

export default FighterDetailsModal;

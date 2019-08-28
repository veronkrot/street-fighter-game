import View from './view';
import {validations} from "./fightersView";

const IGNORED_FIELDS = ['_id', 'source', 'name'];
const READONLY_FIELDS = ['defense'];

class FighterDetailsModal extends View {
    constructor(fighter, saveBtnHandler, closeBtnHandler) {
        super();
        this.fighter = fighter;
        this.saveBtnHandler = saveBtnHandler;
        this.closeBtnHandler = closeBtnHandler;
        this.createModal();
    }

    createModal() {
        const modalWrapper = this.createModalWrapper();
        const modalDialog = this.createModalDialog();
        const modalContent = this.createModalContent();
        const modalHeader = this.createModalHeader();
        const modalTitle = this.createModalTitle();
        const closeHeaderElement = this.createCloseHeaderElement();
        const modalBody = this.createModalBody();
        const modalFooter = this.createModalFooter();
        const closeBtn = this.createCloseBtn();
        const saveBtn = this.createSaveBtn();

        this.element = this.createElement({
            tagName: 'form',
            classNames: ['form-row'],
        });
        this.element.append(modalWrapper);
        modalWrapper.append(modalDialog);
        modalDialog.append(modalContent);
        modalHeader.append(modalTitle, closeHeaderElement);
        modalFooter.append(closeBtn, saveBtn);
        modalContent.append(modalHeader, modalBody, modalFooter);
    }

    createModalWrapper() {
        return this.createElement({
            tagName: 'div',
            classNames: ['modal', 'fade', 'show'],
            attributes: {
                id: 'exampleModal',
                tabindex: '-1',
                role: 'dialog',
                'aria-labelledby': 'exampleModalLabel',
                'aria-hidden': 'true',
            }
        });
    }

    createModalDialog() {
        return this.createElement({
            tagName: 'div',
            classNames: ['modal-dialog'],
            attributes: {
                role: 'document'
            }
        })
    }

    createModalContent() {
        return this.createElement({
            tagName: 'div',
            classNames: ['modal-content'],
        })
    }

    createModalHeader() {
        return this.createElement({
            tagName: 'div',
            classNames: ['modal-header'],
        })
    }

    createModalTitle() {
        const modalTitle = this.createElement({
            tagName: 'h5',
            classNames: ['modal-title'],
            attributes: {
                id: 'exampleModalLabel'
            }
        });
        modalTitle.innerText = this.fighter.name;
        return modalTitle;
    }

    createCloseHeaderElement() {
        const closeHeaderElement = this.createElement({
            tagName: 'button',
            classNames: ['close'],
            attributes: {
                type: 'button',
                'data-dismiss': 'modal',
                'aria-label': 'Close'
            }
        });
        const ariaHiddenSpan = this.createElement({
            tagName: 'span',
            attributes: {
                'aria-hidden': 'true'
            }
        });
        ariaHiddenSpan.innerHTML = '&times;';
        closeHeaderElement.append(ariaHiddenSpan);
        closeHeaderElement.addEventListener('click', this.closeBtnHandler);
        return closeHeaderElement;
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

    createModalFooter() {
        return this.createElement({
            tagName: 'div',
            classNames: ['modal-footer'],
        })
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

    createSaveBtn() {
        const saveBtn = this.createElement({
            tagName: 'button',
            classNames: ['btn', 'btn-primary'],
        });
        saveBtn.innerText = 'Save changes';
        saveBtn.addEventListener('click', this.saveBtnHandler);
        return saveBtn;
    }

}

export default FighterDetailsModal;

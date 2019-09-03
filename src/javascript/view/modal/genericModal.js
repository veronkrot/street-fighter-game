import View from "../view";

class GenericModal extends View {
    constructor() {
        super();
    }

    createDialog(modalBody, title, buttons, closeBtnHandler) {
        const modalWrapper = this.createModalWrapper();
        const modalDialog = this.createModalDialog();
        const modalContent = this.createModalContent();
        const modalHeader = this.createModalHeader();
        const modalTitle = this.createModalTitle(title);
        const closeHeaderElement = this.createCloseHeaderElement(closeBtnHandler);
        const modalFooter = this.createModalFooter();

        this.element = this.createElement({
            tagName: 'form',
            classNames: ['form-row'],
        });
        this.element.append(modalWrapper);
        modalWrapper.append(modalDialog);
        modalDialog.append(modalContent);
        modalHeader.append(modalTitle, closeHeaderElement);
        buttons.forEach(btn => {
            modalFooter.append(btn);
        });
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

    createModalTitle(title) {
        const modalTitle = this.createElement({
            tagName: 'h5',
            classNames: ['modal-title'],
            attributes: {
                id: 'exampleModalLabel'
            }
        });
        modalTitle.innerText = title;
        return modalTitle;
    }

    createCloseHeaderElement(closeBtnHandler) {
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
        closeHeaderElement.addEventListener('click', closeBtnHandler);
        return closeHeaderElement;
    }

    createModalFooter() {
        return this.createElement({
            tagName: 'div',
            classNames: ['modal-footer'],
        })
    }

}

export default GenericModal;

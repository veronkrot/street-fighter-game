import View from "../view";

const fighterPropTypes = {
    'attack': 'number',
    'health': 'number',
    'defense': 'number',
    'source': 'text',
    'name': 'text',
};

const fighterPropPlaceholder = {
    'attack': '5',
    'health': '45',
    'defense': '4',
    'source': 'image source url',
    'name': 'Max',
};

class ModalUtils extends View {
    constructor() {
        super();
    }

    createModalBody() {
        return this.createElement({
            tagName: 'div',
            classNames: ['modal-body'],
        });
    }

    createInputGroup() {
        return this.createElement({
            tagName: 'div',
            classNames: ['input-group', 'mb-3']
        });
    }

    createInputGroupPrepend() {
        return this.createElement({
            tagName: 'div',
            classNames: ['input-group-prepend', 'form-group'],
        });
    }

    createAttributeName() {
        return this.createElement({
            tagName: 'span',
            classNames: ['input-group-text'],
            attributes: {
                id: 'inputGroup-sizing-default'
            }
        });
    }

    createInputAttributeValue(propName) {
        let id = `fighter-${propName}`;
        return this.createElement({
            tagName: 'input',
            classNames: ['form-control'],
            attributes: {
                id: id,
                type: fighterPropTypes[propName],
                placeholder: fighterPropPlaceholder[propName]
            }
        });
    }

    createSaveBtn() {
        return this.createElement({
            tagName: 'button',
            classNames: ['btn', 'btn-primary'],
        });
    }

    createCloseBtn() {
        return this.createElement({
            tagName: 'button',
            classNames: ['btn', 'btn-secondary'],
            attributes: {
            }
        });
    }

    createValidFeedback(propName) {
        const validFeedback = this.createElement({
            tagName: 'div',
            classNames: [propName, 'valid-feedback']
        });
        validFeedback.innerText = 'Looks good!';
        validFeedback.style.display = 'none';
        return validFeedback;
    }

    createInvalidFeedback(propName) {
        const invalidFeedback = this.createElement({
            tagName: 'div',
            classNames: [propName, 'invalid-feedback']
        });
        invalidFeedback.style.display = 'none';
        return invalidFeedback;
    }

    createAddFighterBtn() {
        return this.createElement({
            tagName: 'button',
            classNames: ['btn', 'btn-info', 'add-fighter'],
            attributes: {
                type: 'button'
            }
        });
    }

    createTextWrapper(){
        return this.createElement({
            tagName: 'div',
            classNames: ['delete-modal-text']
        })
    }

    closeHeaderElement(){
        const closeHeaderElement = this.createElement({
            tagName: 'button',
            classNames: ['close'],
            attributes: {
                type: 'button',
                'data-dismiss': 'modal',
                'aria-label': 'Close',
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
        return closeHeaderElement;
    }
}

export const modalUtils = new ModalUtils();

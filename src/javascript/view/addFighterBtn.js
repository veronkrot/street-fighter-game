import View from "./view";
import {validationRules} from "../services/validationService";
import AddFighterModal from "./modal/addFighterModal";
import {validation} from "../services/validationService";
import {modalUtils} from "./modal/modalUtils";

const IGNORED_VALIDATION_FIELDS = ['_id', 'currentHealth'];

class AddFighterBtn extends View {
    constructor() {
        super();
        this.addFighterBtn();
    }

    showAddFighterModal(noopFighter) {
        const addFighterModal = document.querySelector('#add-fighter-modal');
        const modal = document.querySelector('#add-fighter-modal');

        const closeFunc = (e) => {
            e.preventDefault();
            modal.innerHTML = '';
        };

        const saveFunc = (e) => {
            e.preventDefault();

            const numValidations = ['defense', 'attack', 'health'];
            let totalValidations = 0;
            let validProps = 0;
            for (let propName in validationRules) {
                if (IGNORED_VALIDATION_FIELDS.includes(propName)) {
                    continue;
                }
                totalValidations++;

                if (propName === 'name') {
                    const propValidation = validationRules[propName];
                    const el = document.querySelector(propValidation.elSelector);
                    const isValidProp = validation.attrNameValidation(el.value, propValidation.minLength, propValidation.maxLength);
                    if (isValidProp) {
                        noopFighter[propName] = el;
                        validProps++;
                    }
                    validation.validationFeedback(isValidProp, propName);
                }

                if (propName === 'source') {
                    const propValidation = validationRules[propName];
                    const el = document.querySelector(propValidation.elSelector);
                    const isValidProp = validation.attrSourceValidation(el.value);
                    if (isValidProp) {
                        noopFighter[propName] = el;
                        validProps++;
                    }
                    validation.validationFeedback(isValidProp, propName);
                }

                if (numValidations.includes(propName)) {
                    const propValidation = validationRules[propName];
                    const el = document.querySelector(propValidation.elSelector);
                    const elVal = parseInt(el.value);
                    const isValidProp = validation.attrNumValidation(elVal, propValidation.min, propValidation.max);
                    if (isValidProp) {
                        noopFighter[propName] = elVal;
                        validProps++;
                    }
                    validation.validationFeedback(isValidProp, propName);
                }
            }
            if (totalValidations === validProps) {
                closeFunc(e);
            }
        };

        const modalDialog = new AddFighterModal(noopFighter, saveFunc, closeFunc).element;
        addFighterModal.append(modalDialog);

    }

    addFighterBtn() {
        const addFighterBtn = modalUtils.createAddFighterBtn();
        addFighterBtn.innerText = 'Add Fighter';
        document.querySelector('.navbar').append(addFighterBtn);
        addFighterBtn.addEventListener('click', this.showAddFighterModal);
        return addFighterBtn;
    }
}

export default AddFighterBtn;

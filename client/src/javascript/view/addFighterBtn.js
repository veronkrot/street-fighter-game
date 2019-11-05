import View from "./view";
import {validation, validationRules} from "../services/validationService";
import AddFighterModal from "./modal/addFighterModal";
import {modalUtils} from "./modal/modalUtils";
import {idGenerator} from "../services/idGenerator";
import {fighterService} from "../services/fightersService";

const IGNORED_VALIDATION_FIELDS = ['_id', 'currentHealth'];
const newFighter = {
    _id: '',
    name: '',
    health: '',
    attack: '',
    defense: '',
    source: ''

};

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
                        newFighter[propName] = el.value;
                        validProps++;
                    }
                    validation.validationFeedback(isValidProp, propName);
                }

                if (propName === 'source') {
                    const propValidation = validationRules[propName];
                    const el = document.querySelector(propValidation.elSelector);
                    const isValidProp = validation.attrSourceValidation(el.value);
                    if (isValidProp) {
                        newFighter[propName] = el.value;
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
                        newFighter[propName] = elVal;
                        validProps++;
                    }
                    validation.validationFeedback(isValidProp, propName);
                }
            }
            if (totalValidations === validProps) {
                console.log(newFighter);
                fighterService.addFighter(newFighter).then(x => console.log(x));
            }
        };
        localStorage.setItem('myStorage', JSON.stringify(newFighter));
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

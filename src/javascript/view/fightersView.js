import View from './view';
import FighterView from './fighterView';
import {fighterService} from '../services/fightersService';
import FighterDetailsModal from './fighterDetailsModal';

export const validations = {
    'attack': {
        min: 2,
        max: 10,
        errorMsg: 'Attack should be a number [2 , 10]!',
        elSelector: '#fighter-attack'
    },
    'health': {
        min: 30,
        max: 80,
        errorMsg: 'Health should be a number [30 , 80]!',
        elSelector: '#fighter-health'
    }
};

class FightersView extends View {
    constructor(fighters) {
        super();

        this.handleClick = this.handleFighterClick.bind(this);
        this.createFighters(fighters);
    }

    fightersDetailsMap = new Map();

    createFighters(fighters) {
        const fighterElements = fighters.map(fighter => {
            const fighterView = new FighterView(fighter, this.handleClick);
            return fighterView.element;
        });

        this.element = this.createElement({tagName: 'div', classNames: ['fighters']});
        this.element.append(...fighterElements);
    }

    showFighterDetails(fighter) {
        const modal = document.querySelector('#modal');

        const closeFunc = () => {
            modal.innerText = '';
        };

        const saveFunc = (e) => {
            e.preventDefault();

            const attrValidation = (inputValue, minValue, maxValue) => {
                return (typeof inputValue === 'number') && (inputValue >= minValue) && (inputValue <= maxValue);
            };

            const validationFeedback = (isValid, propName) => {
                const validFeedback = document.querySelector(`.${propName}.valid-feedback`);
                const invalidFeedback = document.querySelector(`.${propName}.invalid-feedback`);
                if (isValid) {
                    validFeedback.style.display = 'block';
                    invalidFeedback.style.display = 'none';
                } else {
                    invalidFeedback.style.display = 'block';
                    validFeedback.style.display = 'none';
                }
            };

            let totalValidations = 0;
            let validProps = 0;
            for (let propName in validations) {
                totalValidations++;
                const propValidation = validations[propName];
                const el = document.querySelector(propValidation.elSelector);
                const elVal = parseInt(el.value);
                const isValidProp = attrValidation(elVal, propValidation.min, propValidation.max);
                if (isValidProp) {
                    fighter[propName] = elVal;
                    validProps++;
                }
                validationFeedback(isValidProp, propName);
            }
            if (totalValidations === validProps) {
                closeFunc();
            }
        };

        const modalDialog = new FighterDetailsModal(fighter, saveFunc, closeFunc).element;
        modal.append(modalDialog);

    };

    handleFighterClick(event, fighter) {
        const id = fighter._id;
        if (this.fightersDetailsMap.has(id)) {
            console.log('Getting fighter from CACHE');
            const fighterDetails = this.fightersDetailsMap.get(id);
            this.showFighterDetails(fighterDetails);
        } else {
            console.log('Getting fighter from API');
            const fighterPromise = fighterService.getFighterDetails(fighter._id);
            fighterPromise.then((fighter) => {
                this.fightersDetailsMap.set(id, fighter);
                this.showFighterDetails(fighter);
            });
        }
    }
}

export default FightersView;

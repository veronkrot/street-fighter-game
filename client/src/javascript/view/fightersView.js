import View from './view';
import FighterView from './fighterView';
import FighterDetailsModal from './modal/fighterDetailsModal';
import {fightersCache} from "../services/fightersCache";
import NavBar from "./navBarView";
import AddFighterBtn from "./addFighterBtn";
import {validation} from "../services/validationService";
import {validationRules} from "../services/validationService";
import Carousel from './carousel';
import ExitBattleBtn from "./exitBattleBtn";

const IGNORED_VALIDATION_FIELDS = ['_id', 'source', 'name', 'defense', 'currentHealth'];

class FightersView extends View {
    constructor(fighters) {
        super();

        this.handleFighterClick = this.handleFighterClick.bind(this);
        this.createFighters(fighters);
        this.createNavBar();
        this.createAddFighterBtn();
        this.createExitBattleBtn();
    }

    createNavBar() {
        return new NavBar();
    }

    createAddFighterBtn() {
        return new AddFighterBtn();
    }

    createExitBattleBtn() {
        const exitBattleBtn = new ExitBattleBtn();
        document.querySelector('.exit-battle-btn').style.display = 'none';
        return exitBattleBtn;
    }

    createFighters(fighters) {
        const fighterElements = fighters.map(fighter => {
            const fighterView = new FighterView(fighter, this.handleFighterClick);
            return fighterView.element;
        });

        const carousel = new Carousel(fighterElements);
        this.element = carousel.element;

        return this.element;
    }

    showFighterDetails(fighter) {
        const modal = document.querySelector('#fighter-details-modal');

        const closeFunc = (e) => {
            e.preventDefault();
            modal.innerHTML = '';
        };

        const saveFunc = (e) => {
            e.preventDefault();

            let totalValidations = 0;
            let validProps = 0;
            for (let propName in validationRules) {
                if (IGNORED_VALIDATION_FIELDS.includes(propName)) {
                    continue;
                }
                totalValidations++;
                const propValidation = validationRules[propName];
                const el = document.querySelector(propValidation.elSelector);
                const elVal = parseInt(el.value);
                const isValidProp = validation.attrNumValidation(elVal, propValidation.min, propValidation.max);
                if (isValidProp) {
                    fighter[propName] = elVal;
                    validProps++;
                }
                validation.validationFeedback(isValidProp, propName);
            }
            if (totalValidations === validProps) {
                closeFunc(e);
            }
        };

        const modalDialog = new FighterDetailsModal(fighter, saveFunc, closeFunc).element;
        modal.append(modalDialog);

    };

    handleFighterClick(event, fighter) {
        const id = fighter._id;
        fightersCache.retrieveDetails(id).then(fighter => {
            this.showFighterDetails(fighter);
        });
    }
}

export default FightersView;

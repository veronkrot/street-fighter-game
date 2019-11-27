import View from "./view";
import DeleteFighterModal from "./modal/deleteFighterModal";
import {modalUtils} from "./utils/modalUtils";
import {fighterService} from "../services/fightersService";

class DeleteFighterEl extends View {
    constructor(id, fighter) {
        super();
        this.createDeleteFighterEl(id, fighter);
    }

    createDeleteFighterEl(id, fighter) {
        this.element = modalUtils.closeHeaderElement();
        this.element.setAttribute('class', 'close deleteEl');
        this.element.setAttribute('data-id', `${id}`);

        this.element.style.display = 'none';

        const deleteModal = document.querySelector('#delete-fighter-modal');

        const deleteFighter = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const closeFunc = () => {
                deleteModal.innerHTML = '';
            };

            const confirmFunc = () => {
                fighterService.deleteFighter(id).then(x => console.log(x));
            };
            const modalDialog = new DeleteFighterModal(fighter, closeFunc, confirmFunc).element;
            deleteModal.append(modalDialog);
            return deleteModal;
        };

        this.element.addEventListener('click', deleteFighter)
    }
}

export default DeleteFighterEl;

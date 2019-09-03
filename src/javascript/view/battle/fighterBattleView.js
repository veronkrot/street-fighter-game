import View from "../view";

class FighterBattleView extends View {
    constructor(fighter) {
        super();

        this.createFighter(fighter);
    }

    createFighter(fighter) {
        const {name, source} = fighter;
        const imageElement = this.createImage(source);
        const nameElement = this.createName(name);
        this.element = this.createElement({tagName: 'div', classNames: ['fighter']});
        this.element.append(nameElement, imageElement);
    }

    createName(name) {
        const nameElement = this.createElement({tagName: 'span', classNames: ['fighter-name']});
        nameElement.innerText = name;
        return nameElement;
    }

    createImage(source) {
        const attributes = {src: source};
        return this.createElement({
            tagName: 'img',
            classNames: ['fighter-image-fight'],
            attributes
        });
    }
}

export default FighterBattleView;

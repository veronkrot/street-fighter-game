import View from './view';

class FighterView extends View {
  constructor(fighter, handleClick) {
    super();

    this.createFighter(fighter, handleClick);
  }

  createFighter(fighter, handleClick) {
    const { name, source } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);
    const selectBtn = this.createSelectBtn();

    this.element = this.createElement({ tagName: 'div', classNames: ['fighter'] });
    this.element.append(imageElement, nameElement, selectBtn);
    this.element.addEventListener('click', event => handleClick(event, fighter), false);
  }

  createName(name) {
    const nameElement = this.createElement({ tagName: 'span', classNames: ['name'] });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source) {
    const attributes = { src: source };
    return this.createElement({
      tagName: 'img',
      classNames: ['fighter-image'],
      attributes
    });
  }

  createSelectBtn() {
    const selectBtn = this.createElement({
      tagName: 'button',
      classNames: ['btn', 'btn-warning'],
    attributes: {
        type: 'button'
    }
    });
    selectBtn.innerText = 'Select';

    return selectBtn;
  }

}

export default FighterView;

import View from "./view";

class Carousel extends View {

    constructor(fighters) {
        super();
        this.createCarouselWrapper(fighters);
    }

    createCarouselWrapper(fighters) {
        const carouselElementsWrapper = this.createCarouselElementsWrapper();
        const prevBtn = this.createPrevBtn();
        const nextBtn = this.createNextBtn();
        this.element = this.createElement({
            tagName: 'div',
            classNames: ['carousel'],
            attributes: {
                id: 'carousel'
            }
        });

        const splitFighters = (array, chunk) => {
            let tempArray = [];
            for (let i = 0; i < array.length; i += chunk) {
                const myChunk = array.slice(i, i + chunk);
                tempArray.push(myChunk);
            }
            return tempArray;
        };

        const splittedFighters = splitFighters(fighters, 5);

        let firstItem = true;

        const fightersGroup = (array) => {
            const fightersWrapper = this.createElement({
                tagName: 'div',
                classNames: ['fighters']
            });
            for (let i = 0; i < array.length; i++) {
                fightersWrapper.append(array[i]);
            }
            return fightersWrapper;
        };

        splittedFighters.forEach(fightersArray => {
            const fighters = fightersGroup(fightersArray);
            const carouselElement = this.createCarouselElement(fighters);
            if (firstItem) {
                carouselElement.classList.add('active');
                firstItem = false;
            }
            carouselElementsWrapper.append(carouselElement);
        });

        this.element.append(carouselElementsWrapper, prevBtn, nextBtn);
        return this.element;
    }

    createCarouselElementsWrapper() {
        return this.createElement({
            tagName: 'div',
            classNames: ['carousel-inner']
        })
    }

    createCarouselElement(el) {
        const element = this.createElement({
            tagName: 'div',
            classNames: ['carousel-item']
        });
        element.append(el);
        return element;
    }

    createPrevBtn() {
        const prevBtn = this.createElement({
            tagName: 'a',
            classNames: ['carousel-control-prev'],
            attributes: {
                href: '#carousel',
                role: 'button'.length,
                'data-slide': 'prev'
            }
        });
        const prevIcon = this.createElement({
            tagName: 'span',
            classNames: ['carousel-control-prev-icon'],
            attributes: {
                'aria-hidden': 'true'
            }
        });
        const srOnly = this.createElement({
            tagName: 'span',
            classNames: ['sr-only']
        });
        srOnly.innerHTML = 'Previous';
        prevBtn.append(prevIcon, srOnly);
        return prevBtn;
    }

    createNextBtn() {
        const nextBtn = this.createElement({
            tagName: 'a',
            classNames: ['carousel-control-next'],
            attributes: {
                href: '#carousel',
                role: 'button'.length,
                'data-slide': 'next'
            }
        });
        const nextIcon = this.createElement({
            tagName: 'span',
            classNames: ['carousel-control-next-icon'],
            attributes: {
                'aria-hidden': 'true'
            }
        });
        const srOnly = this.createElement({
            tagName: 'span',
            classNames: ['sr-only']
        });
        srOnly.innerHTML = 'Next';
        nextBtn.append(nextIcon, srOnly);
        return nextBtn;
    }
}

export default Carousel;

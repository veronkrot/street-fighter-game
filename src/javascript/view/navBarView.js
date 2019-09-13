import View from "./view";

class NavBar extends View {
    constructor() {
        super();
        this.createNavBar();
    }

    createNavBar() {
        const navBarWrapper = this.createElement({
            tagName: 'nav',
            classNames: ['navbar', 'navbar-light', 'bg-light']
        });
        const navLink = this.createElement({
            tagName: 'a',
            classNames: ['navbar-brand'],
            attributes: {
                href: '#'
            }
        });
        const logoImg = this.createElement({
            tagName: 'img',
            classNames: ['d-inline-block', 'align-top'],
            attributes: {
                src: '../../../resources/logo.png',
                width: '80',
                height: '40',
                alt: ''
            }
        });
        navLink.append(logoImg);
        navBarWrapper.append(navLink);
        return document.querySelector('#nav-bar').append(navBarWrapper);
    }
}

export default NavBar;

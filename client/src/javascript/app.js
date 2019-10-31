import FightersView from './view/fightersView';
import { fighterService } from './services/fightersService';
import $ from 'jquery';

class App {
  constructor() {
    this.startApp();
  }

  static rootElement = document.getElementById('root');
  static loadingElement = document.getElementById('loading-overlay');

  async startApp() {
    try {
      App.loadingElement.style.visibility = 'visible';

      const fighters = await fighterService.getFighters();
      const newFighters = [...fighters];

      const fightersView = new FightersView(newFighters);
      const fightersElement = fightersView.element;

      App.rootElement.appendChild(fightersElement);
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = 'Failed to load data';
    } finally {
      App.loadingElement.style.visibility = 'hidden';
      $('.carousel').carousel('pause');
    }
  }
}

export default App;

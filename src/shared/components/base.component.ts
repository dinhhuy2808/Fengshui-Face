import { LoaderComponent } from './loader/loader.component'

export abstract class BaseComponent {

    showLoader() {
        LoaderComponent.show();
    }

    hideLoader() {
        LoaderComponent.hide();
    }
}

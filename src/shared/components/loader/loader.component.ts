import { Component } from "@angular/core";

@Component( {
    selector: 'app-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['./loader.component.css']
})

export class LoaderComponent {
    isLoaderVisible: boolean = false;

    static currentInstance: LoaderComponent;

    constructor() {
        LoaderComponent.currentInstance = this;
    }

    static show() {
        LoaderComponent.currentInstance.isLoaderVisible = true;
    }

    static hide() {
        LoaderComponent.currentInstance.isLoaderVisible = false;
    }
}
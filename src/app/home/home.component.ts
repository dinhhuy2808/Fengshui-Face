import { Component, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../../shared/components';
import { DynamicScriptLoaderService } from '../../shared/services/DynamicScriptLoaderService.service';
@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [DynamicScriptLoaderService]
})

export class HomeComponent extends BaseComponent implements AfterViewInit {

    constructor(private dynamicScriptLoader: DynamicScriptLoaderService) {
        super();
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.loadScripts();
    }

    private loadScripts() {
        this.dynamicScriptLoader.load('main').then(data => {
        }).catch(error => console.log(error));
    }
}

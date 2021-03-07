import { Component } from '@angular/core';
import { BaseComponent } from '../../shared/components';
import { TimeLine } from '../../shared/models/TimeLine.model';
import { DynamicScriptLoaderService } from '../../shared/services/DynamicScriptLoaderService.service';
@Component( {
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [DynamicScriptLoaderService]
})

export class HomeComponent extends BaseComponent {
    objects: Array<TimeLine> = new Array();
    hours: Map<number, TimeLine[]> = new Map<number, TimeLine[]>();
    hour: number[] = [800, 900, 1000, 1100, 1200
                      , 1300, 1400, 1500, 1600
                      , 1700, 1800, 1900, 2000
                      , 2100, 2200, 2300];
    abc:string ="";
    constructor( private dynamicScriptLoader: DynamicScriptLoaderService ) {
        super();
    }
    ngOnInit() {/*
        this.loadScripts();
        this.showLoader();
        setTimeout(() => this.hideLoader(), 1000 );
        this.hour.forEach( (myObject, index) => {
            this.hours.set(myObject,[new TimeLine(800,945,'Place Monday'),
                                     new TimeLine(0,0,'Place Tuesday'),
                                     new TimeLine(1100,1300,'Place Wednesday'),
                                     new TimeLine(0,0,'Place 1'),
                                     new TimeLine(0,0,'Place 1'),
                                     new TimeLine(2100,2350,'Place 1'),
                                     new TimeLine(800,900,'Place 3'),]);
          });
    */}
    private loadScripts() {
        // You can load multiple scripts by just providing the key as argument into load method of the service
        this.dynamicScriptLoader.load( 'drag-drop', 'jquery-1.12.4', 'jquery-ui' ).then( data => {
            // Script Loaded Successfully
        }).catch( error => console.log( error ) );
    }
    drop(){
        console.log('drop');
    }
}

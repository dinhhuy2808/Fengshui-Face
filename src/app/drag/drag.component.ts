import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TimeLine } from '../../shared/models/TimeLine.model';
import { TimeLineByDay } from '../../shared/models/TimeLineByDay.model';
@Component( {
    selector: 'app-drag',
    templateUrl: './drag.component.html',
    styleUrls: ['./drag.component.css']
})

export class DragComponent {
    timelineByDay = [];
    timelines: TimeLine[] = [];
    hour = ['800', '900', '1000', '1100', '1200'
        , '1300', '1400', '1500', '1600'
        , '1700', '1800', '1900', '2000'
        , '2100', '2200', '2300'];
    color = ['#7f6799', '#e8b601', '#c00c39', '#783f46', '#018675', '#393846',
        '#403434', '#f65e2d', '#623077', '#008eb4', '#017d63', '#c5185a',
        '#ff3922', '#8f4175', '#4c4e8b', '#00703e', '#4d4b34', '#9d0625',
        '#c8dc01', '#c3a101', '#a3a3a1', '#44546d', '#ff91a1', '#b67966'];
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    constructor() {
        this.hour.forEach(( myObject, index ) => {
            this.timelines = [new TimeLine( 800, 945, 'Place Monday', this.color[index] ),
            new TimeLine( 0, 0, 'Place Tuesday', this.color[index] ),
            new TimeLine( 1100, 1300, 'Place Wednesday', this.color[index] ),
            new TimeLine( 0, 0, 'Place 1', this.color[index] ),
            new TimeLine( 0, 0, 'Place 1', this.color[index] ),
            new TimeLine( 2100, 2350, 'Place 1', this.color[index] ),
            new TimeLine( 800, 900, 'Place 3', this.color[index] )];
            this.timelineByDay[index] = new TimeLineByDay( myObject, this.timelines );
        });
    }
    ngOnInit() {

    }
    drop( event: CdkDragDrop<TimeLine[]> ) {
        if ( event.previousContainer === event.container ) {
            moveItemInArray( event.container.data, event.previousIndex, event.currentIndex );
        } else {
            transferArrayItem( event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex );
            event.previousContainer.data.splice( event.previousIndex, 0, new TimeLine( 0, 0, 'Place','' ) );
            var timeChange = +event.container.data[event.currentIndex].startFrom - +event.container.id;
            event.container.data[event.currentIndex].startFrom = Number(event.container.id);
            event.container.data[event.currentIndex].startTo = +event.container.data[event.currentIndex].startTo - timeChange;
            event.container.data.splice( event.currentIndex + 1, 1 );
        }
    }
    checkHourApplicable( hour: string, startFrom: number ) {
        var numbHour = +hour;
        return startFrom >= numbHour && startFrom <= ( numbHour + 60 );
    }
}

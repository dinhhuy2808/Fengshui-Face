import {TimeLine} from './TimeLine.model';
export class TimeLineByDay {
    public hour: string='';
    public TimeLine: TimeLine[];
    
    constructor( hour:string, TimeLine: TimeLine[]) {
        this.hour=hour;
        this.TimeLine=TimeLine;
    }
}
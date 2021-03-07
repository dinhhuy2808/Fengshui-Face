export class TimeLine {
    public startFrom: number = 0;
    public startTo: number = 0;
    public place:string='ABC';
    public color: string ='';
    constructor(startFrom: number, startTo: number, place:string, color:string) {
        this.startFrom=startFrom;
        this.startTo=startTo;
        this.place=place;
        this.color=color;
    }
}
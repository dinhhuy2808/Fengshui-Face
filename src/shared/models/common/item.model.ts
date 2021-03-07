export class Item {
    value: number | string;
    name: string;

    constructor( name?: string, value?: number | string ) {
        this.name = name;
        this.value = value;
    }
}
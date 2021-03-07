import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Component, HostListener, Inject } from '@angular/core';
declare var $: any;

@Component( {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    showSearchOverlay = false;

    constructor( @Inject( DOCUMENT ) private document: Document ) {
    }

    public openSearch() {
        this.showSearchOverlay = true;
    }

    public closeSearch() {
        this.showSearchOverlay = false;
    }

    @HostListener( "window:scroll", [] )
    onWindowScroll() {
        let number = window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
        if ( number >= 100 ) {
            this.document.getElementById( "sticky" ).classList.add( 'fixed' );
        } else {
            this.document.getElementById( "sticky" ).classList.remove( 'fixed' );
        }
    }
}

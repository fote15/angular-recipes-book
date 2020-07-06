import { Directive, Input, OnChanges, HostBinding } from "@angular/core";


@Directive({
    selector: "[appDropdownHere]"
})

export class appDropdownHere implements OnChanges{
    @Input() showDaHere:boolean 
    showHere = false;
    @HostBinding('class.show') kaktam = false

    constructor(){
        
        
    }
    ngOnChanges(){
        this.kaktam = this.showDaHere
    }
}
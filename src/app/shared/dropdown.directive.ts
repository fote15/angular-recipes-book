import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';


@Directive({
    selector: '[appDropdown]',

})

export class DropDownDir{
@Output() showList = new EventEmitter<boolean>();

    constructor(elRef: ElementRef ){
        elRef.nativeElement.style.backgroundColor = 'yellow';
    }
    @HostListener('mouseenter') onMouseEnter() {
        this.showList.emit(true)
      }
    @HostListener('mouseleave') mslv(){
        this.showList.emit(false)
    }
}
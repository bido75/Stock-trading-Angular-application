import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appFocus]',
})
export class FocusDirective implements AfterViewInit {
  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.element.nativeElement.focus();
  }
}

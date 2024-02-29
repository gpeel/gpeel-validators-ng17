import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Optional, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import {fromEvent} from 'rxjs';

/**
 * Use :
 *   <input errorMsg>
 *     Needed if the error-message.component of your input is under an OnPush component
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[errorMsg]',
  standalone: true
})
export class ErrorDirective implements OnInit {

  @Input() monInput!: string;
  @HostBinding() id: string = 'TYTY44 ';

  constructor(private host: ElementRef,
              @Optional() @Self() private ngControlSelf: NgControl) {}

  /**
   *  fromEvent(this.host.nativeElement, 'blur') could be done here with a @HostListener('blur')
   */
  @HostListener('blur') onBlur() {
    console.log('fromEvent subscribing HOSTLISTENER');
    // sending here a fake modification event
    // this is a good solution
    // if (this.ngControlSelf) {
    //   console.log('self not null');
    //   (this.ngControlSelf as any).control.updateValueAndValidity();
    // }
  }

  ngOnInit(): void {
    console.log('MON INPUT ***********', this.monInput);
    console.log(this.host.nativeElement);

    /**
     * needed to force a refresh in error-message.component.ts when under OnPush and the input is touched
     * => sending the values again to validation (and valueChanges) will make the error message component able to ask
     * for cd.markForCheck() and refresh the view
     */
    fromEvent(this.host.nativeElement, 'blur')
      .subscribe(() => {
        console.log('fromEvent subscribing');
        // sending here a fake modification event

        // this is a good solution
        if (this.ngControlSelf) {
          console.log('self not null');
          (this.ngControlSelf as any).control.updateValueAndValidity();
        }

        // OR uncomment this other solution: (and comment in the previous one, to see it works alone)

        // // for standard input "input" an event will trigger changes
        // setTimeout(() => {
        //   const newEvent = document.createEvent('Event');
        //   newEvent.initEvent('input', false, false);
        //   // <<<<<<<<< ANGULAR will catch this input event and dispatch a valueChanges for the blur initial event
        // !!;
        //   this.host.nativeElement.dispatchEvent(newEvent);
        // }, 0);
        //
        // // for <select> "change" event is better!
        // setTimeout(() => {
        //   const newEvent = document.createEvent('Event');
        //   newEvent.initEvent('change', false, false);
        //   // <<<<<<<<< ANGULAR will catch this "change" event and dispatch a valueChanges for the blur initial event
        // !!; this.host.nativeElement.dispatchEvent(newEvent); }, 0);
      });
  }
}



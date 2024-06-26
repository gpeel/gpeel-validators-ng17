/* eslint-disable no-underscore-dangle */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  Optional
} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Plog} from '@gpeel/plog';
import {debounceTime, merge, Subscription} from 'rxjs';
import {
  DEFAULT_SHOW_ERROR_MSG_FUNCTION,
  MY_SHOW_ERROR_MSG_FUNCTION_API,
  ShowFunction
} from '../pluggable-api/messages/messages-service-api';
import {ErrorMsgFn, ErrorMsgMap} from './error-msg-api';

/**
 * Use:
 * It is REQUIRED to use the directve myErrorMsg directly on the <input> like
 *
 * <input myErrorMsg='theNameOfTheField'>
 *
 * And OPTIONNALY define in HTML another component where the validation error messages would go
 * <my-error-msg #theNameOfTheField="myErrorMsg" ></my-error-msg>
 * #refVar="myErrorMsg" creates a template-var-reference to the <my-error-msg> component.
 * And then this ref is given to the directive myErrorMsg with [myErrorMsg]="refVar"
 *
 * If the component  <my-error-msg> is not created, the directive myErrorMsg will create it automatically
 * under the <input>
 *
 * => The directive myErrorMsg will listen to the blur event and transform it
 * into a valueChanges event so show the validation errors even when using OnPush.
 *
 * Note:
 *  the formControl SHOULD NOT change overtime, since it is RESOLVED at OnInit()
 *  Hereafter the control will NOT evolve if you change your form dynamically.
 *  for example it won't work if you rebuild new formControls with the FormBuilder.
 */
@Component({
  selector: 'my-error-msg',
  template: `
    {{onRefreshCounter()}}
    <!--    <ng-container *ngIf="errors && (this.control.dirty || this.control.touched)">-->
    <ng-container *ngIf="errors && showErrorUsed(control)">
      <div [ngClass]="customClassObject" class="my-error-GLOBAL">
        <div *ngFor="let message of mymsgs" role="message">{{message}}</div>
      </div>
    </ng-container>
  `,
  exportAs: 'myErrorMsg',
  styles: [
    `
        div[role=message] {
            color: red;
            display: block;
            margin-bottom: 0;
        }

        /* Define CSS with .my-error-GLOBAL in the GLOBAL file ./src/styles.css */
        /* For example*/
        /* .my-error-GLOBAL[class] label { color: blue;    }*/
    `
  ],
  // encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyErrorMessageComponent implements OnDestroy, AfterViewInit {

  @Input() myErrorExtraMsg: ErrorMsgMap = {};
  @Input() showErrorFunction!: (control: AbstractControl) => boolean | undefined;

  showErrorUsed!: (control: AbstractControl) => boolean | undefined;
  control!: AbstractControl;
  errors = false;
  subscription!: Subscription;
  customClassObject: any;
  mymsgs: string[] = [];
  id = ''; // id of corresponding <input id=xx> if defined
  counter = 1;
  // memoControlErrors: any | undefined;
  // adebounce: number = 3000; // debouncing is NOT very interesting, because there is still a full changeDetection
  // cycle for each user keystroke ... it is just that the error are not shown until the debounceTime, but there is no
  // gain of perf because there IS a CD reaching the Component containing the <input> emitting the for each keystroke.
  // You could also devise a CVA like ControlOptionDirective int this folder to choose which events input and/or blur +
  // debounce will make the Validators re-compute. In that case there is still as many CD. So it's just a matter of UI
  // ergonomics

  constructor(private cd: ChangeDetectorRef,
              @Inject(MY_SHOW_ERROR_MSG_FUNCTION_API) @Optional()
              public showFunctionGlobal: ShowFunction = DEFAULT_SHOW_ERROR_MSG_FUNCTION) {
    Plog.validationErrorMsgCreation('Component <my-error-msg> created');
    this.showErrorUsed = showFunctionGlobal;
  }

  // @Input() set debounce(value: any) {
  //   if (typeof value === 'string') {
  //     this.adebounce = +value;
  //   } else if (typeof value === 'number') {
  //     this.adebounce = value;
  //   }
  // }

  @Input() set myErrorClass(className: string) {
    // this.host.nativeElement.classList.add(className);
    this.customClassObject = {[`${className}`]: true};
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * With ngMaterial INPUT, the blur does NOT generate a valueChanges ...
   * So for example an error computed at startup is not shown because dirty==false, touched==false at that time.
   * ok so far.
   * This error Will NOT be shown when touched turns true, because I need an explicit  this.cd.markForCheck();
   * for this OnPush MyErrorMessageComponent.
   * 4 Options:
   *    -1 inspect control.touched on each CD with DoCheck,
   *      and kick off a compute and markForCheck when turning true
   *    -2 OR NOT be OnPush, and let the HTML refresh with a *ngIf on the touched/dirty flag
   *    We can pre-compute the errors-msgs before so we don't have to do it again.
   *    This works only if the <my-error-msg> is not in OnPush wrapping component around ...
   *    -3 OR use a specific CVA (ControlValueAccessor), which generates always a valueChanges when a blur is made.
   *    So if a CVA like that is added on each input it will work. The problem with transforming myErrorMsg
   *    into a CVA is that you can't add other CVA afterward. NG only takes one custom CVA per <element>.
   *    But with such a CVA ErrorMessageComponent could be OnPush and refresh only on valueChanges() +
   * cd.markForCheck()
   *    -4 OR NEW SOLUTION : *** probably the BEST *** and this is the Strategy used in this toolkit.
   *    Don't use a CVA but just add an event handler on the <input> to catch (blur) or (focusout) and generate a
   * valueChanges. Make the use of myErrorMsg DIRECTIVE the required strategy to have validation errors. So myErrorMsg
   * will add a blur listener to emit a valueChanges event when there is a blur. The myErrorMsg directive will CONNECT
   * to this component MyErrorMessageComponent or create it dynamically. This solution is described in the comment
   * above this class
   */


  // ngOnInit(): void {
  // NOt the right place to do the following => better in ngAfterViewInit()
  // this.compute(); // for startup, so that this.msgs is filled
  // this.subscription = this.control.valueChanges.subscribe(() => {
  //   this.compute();
  //   this.cd.markForCheck();
  // });
  // }

  ngAfterViewInit(): void {
    // prefer local customization than global
    if (this.showErrorFunction) {
      this.showErrorUsed = this.showErrorFunction;
    }
    this.compute(); // for startup, so that this.msgs is filled
    // subscribing to this.control.statusChanges seems redundant
    // it is ! for sync validators
    // But for async validators the value was changed much before, so we need to be triggered when validity comes back.
    // Since async only execute when sync are ok, if there is a change means errors coming back.
    this.subscription = merge(this.control.valueChanges, this.control.statusChanges)
      .pipe(debounceTime(10)) // very short denounce to avoid  this.control.valueChanges, this.control.statusChanges to trigger 2 computes
      // .pipe(debounceTime(this.adebounce))
      // Also following seems interresting BUT when "makeDirty" a form which resends the new valueChanges
      // will no longer reach the cd.markForCheck, it was meant for !
      // .pipe(
      //   map(() => this.control.errors),
      //   distinctUntilChanged((x, y) => {
      //     Plog.red(x, y);
      //     return deepEqual(x, y);
      //   }),
      // )
      .subscribe(() => {
        this.compute();
        this.cd.markForCheck();
      });
  }

  compute() {
    this.mymsgs = [];
    if (this.control && this.control.errors) {
      Object.keys(this.control.errors)
        .forEach(key => {
          // for each key, check if there is a custom messages override
          const c: string | ErrorMsgFn = this.myErrorExtraMsg[key];
          if (c) {
            if (typeof c === 'string') {
              this.mymsgs.push(c);
            } else {
              this.mymsgs.push(c(this.control.errors![key]));
            }
          } else {
            this.mymsgs.push(this.control.errors![key].msg);
          }
        });
    }

    if (this.mymsgs.length > 0) {
      this.errors = true;
    } else {
      this.errors = false;
    }
    const msg = this.id ? `${this.id}.valueChanges() extracting` : 'c.valueChanges() extracting';
    Plog.validationCompute(msg, this.errors ? this.mymsgs : 'no-errors');
  }

  onRefreshCounter() {
    Plog.validationErrorMsgRefresh(`MY-ERROR-MSG ${this.id} ${this.counter++}`);
  }

}

export function deepEqual(object1: any, object2: any): boolean {

  if (!object1 && !object2) {
    return true;
  }
  if (!object1 && object2) {
    return false;
  }
  if (object1 && !object2) {
    return false;
  }

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      areObjects && !deepEqual(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }

  return true;
}

export function isObject(object: any) {
  return object != null && typeof object === 'object';
}

import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Injector,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule} from '@angular/forms';
import {MyValidatorsModule} from '@gpeel/validators';

/**
 * Use:
 *
 * <cva-combo formControlName="subscription"></cva-combo-subscription>
 */
@Component({
  selector: 'cva-combo',
  standalone : true,
  imports: [
    ReactiveFormsModule, MyValidatorsModule, CommonModule
  ],
  template: `
    <select class="form-control" [attr.id]="id"
            (change)="onSelectionChange($any($event.target).value)"
            [myErrorMsg]="comboSubscription"
            [formControl]="formControl"
    >
      <option *ngFor="let o of options" [value]="o">{{o}}</option>
    </select>
    <my-error-msg #comboSubscription="myErrorMsg"></my-error-msg>
  `,
  styles: [
    `
        .ng-invalid.ng-dirty, .ng-invalid.ng-touched {
            border-color: red;
        }
    `
  ],
  // I don't have to declare this CVA as a potential injectable CVA,
  // because I do the injection myself in the constructor
  // ngControl.valueAccessor = this;
  // IF you had the providers .. you would get an infinite injection loop
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => CvaComboManagerComponent),
  //     multi: true,
  //   },
  // ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvaComboComponent implements OnInit, ControlValueAccessor {

  @HostBinding('attr.id')
  externalId = null;

  @Input() id = '';

  @Output() selectionChange = new EventEmitter<number>();
  @Input() options: any[] = [];
  formControl!: FormControl;

  constructor(private ngControl: NgControl,
              private cd: ChangeDetectorRef,
              private injector: Injector
  ) {
    // this.ngControl = injector.get(NgControl);
    this.ngControl = ngControl;
    // the .valueAccessor is required by NG (otherwise exception)
    // but it will not be used in any way, that's why the implementation of the CVA is NOT filled.
    ngControl.valueAccessor = this;
  }

  ngOnInit() {
    // the HACK is here
    if (this.ngControl.control) {
      this.formControl = this.ngControl.control as FormControl;
    }
  }

  onSelectionChange(value: any) {
    console.log('VALUE', value);
    this.selectionChange.emit(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registerOnTouched(fn: any): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDisabledState(isDisabled: boolean): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registerOnChange(fn: any): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  writeValue(obj: any): void {
  }

}

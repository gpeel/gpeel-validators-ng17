import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  ValidationErrors
} from '@angular/forms';
// import {makeDirty} from '@gpeel/my-validators';
import {Plog} from '@gpeel/plog';
import {MyValidators} from '../my-validators/my-validators';
import {InterfaceStyleEnum, UserData} from './user-data';

export function makeDirty(fg: FormGroup | FormArray | NgForm): void {
  Plog.errorMsg('Turning every pristine field to dirty in the Form to reveal validation errors');
  Object.values(fg.controls).forEach((ac: AbstractControl) => {
    ac.markAsDirty();
    if ((ac instanceof FormGroup) || (ac instanceof FormArray)) {
      makeDirty(ac);
    }
  });
}

@Component({
  selector: 'reactive-all',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'reactive-all.component.html',
  styleUrls: ['reactive-all.component.css']
})
export class ReactiveAllComponent implements OnInit {

  originalUserData: UserData = {
    id: 5,
    name: 'Tom',
    emailOffers: true,
    interfaceStyle: undefined,
    subscriptionType: undefined,
    notes: undefined,
    uneditedField: 'whatwhat'
  };

  form!: FormGroup; // ! is used to get rid of STRICT null check for that variable, it is better than // @ts-ignore
  InterfaceStyleEnum = InterfaceStyleEnum;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    // extracting a bean of ONLY the edited fields
    const {uneditedField, id, ...allotherFields} = this.originalUserData;

    // this.form = this.fb.group({
    //   age : '',
    //   nom : [ 'Tom', [val], [valAsync]],
    // });
    //

    // allotherField is of type : Omit<UserData, 'uneditedField | 'id'>
    this.form = this.fb.group(allotherFields);
    console.log(allotherFields, this.form);

    // this.form.get('name')!.setValidators([
    //   Validators.required,
    //   Validators.minLength(5),
    //   Validators.pattern(/titi/),
    //   this.myCustomValidatorForbiddenName]);
    this.form.get('name')!.setValidators([
      MyValidators.required,
      MyValidators.minLength(5),
      MyValidators.pattern(/titi/),
      this.myCustomValidatorForbiddenName]);
    //
    // this.form.get('emailOffers')!.setValidators([Validators.requiredTrue]);
    // this.form.get('interfaceStyle')!.setValidators([Validators.required, Validators.minLength(5)]);
    // this.form.get('subscriptionType')!.setValidators([Validators.required]);
    // this.form.get('notes')!.setValidators([Validators.required]);

    this.form.get('emailOffers')!.setValidators([MyValidators.requiredTrue]);
    this.form.get('interfaceStyle')!.setValidators([MyValidators.required, MyValidators.minLength(5)]);
    this.form.get('subscriptionType')!.setValidators([MyValidators.required]);
    this.form.get('notes')!.setValidators([MyValidators.required]);

    // For DEBUG and demo purpose, some logs to NG feedbacks:
    this.form.valueChanges.subscribe(d => Plog.colorGreen('form.valueChanges', d));
    this.form.statusChanges.subscribe(d => Plog.colorGreen('form.statusChanges', d));
    this.form.get('name')!.valueChanges.subscribe(d => Plog.colorGreen('name.valueChanges', d));
    this.form.get('name')!.statusChanges.subscribe(d => Plog.colorGreen('name.statusChanges', d));

  }

  /**
   * All logic is inside Directive [mySubmitIfValidAndDirty]
   */
  onSendWithDirtyfication() {
    console.log('in onSendWithDirtification: form ', this.form);
    // Recomposing the data object
    // Strategy ES5
    // const result = Object.assign({}, this.originalUserData, this.form.value);
    // Strategy ES6, using spread ...
    const modifiedInstance = {...this.originalUserData, ...this.form.value};
    console.log('Recomposed full DTO to call the Backend', modifiedInstance);
    // makeDirty(this.form);

  }

  onCancel() {
    const {uneditedField, id, ...allotherFields} = this.originalUserData;
    this.form.reset(allotherFields);
  }

  onSubmit() {
    console.log('in onSubmit: form ', this.form);
    console.log('form.value ', this.form.value);
  }

  onFillaCorrectForm() {
    const fillingValues: Omit<UserData, 'uneditedField' | 'id'> = {
      name: 'Aristotetiti',
      emailOffers: true,
      interfaceStyle: InterfaceStyleEnum.Medium,
      subscriptionType: 'Annual',
      notes: ' a minimum of comments',
    };
    // this.form.setValue(fillingValues); // setValues does NOT turn the form into dirty;
    this.form.patchValue(fillingValues); // setValues does NOT turn the form into dirty;
    // you must change the flag by yourself.
    // This in normal behavior, only user actions on the browser changes the flags
    this.form.markAsDirty({onlySelf: false}); // NOT enough => use the custom method makeDirty
    makeDirty(this.form);
  }

  myCustomValidatorForbiddenName(control: AbstractControl): ValidationErrors | null {
    if (control.value?.includes('toto')) {
      console.log('TOTO!!!!!!!!!!!!!!!!!!!!!!!!');
      return {myCustomValidator: {msg: 'Toto is forbidden'}};
    }
    return null;
  }
}

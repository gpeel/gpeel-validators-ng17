import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DebugFormComponent} from './debug-form/debug-form.component';
import {DebugInputFieldComponent} from './debug-form/debug-input-field.component';
import {MyControlOptionsDirective} from './error-messages/my-control-options.directive';
import {MyErrorMessageComponent} from './error-messages/my-error-message.component';
import {MyErrorDirective} from './error-messages/my-error.directive';
import {MySubmitIfValidAndDirtyDirective} from './submit-button/my-submit-if-valid-and-dirty.directive';
import {MySubmitIfValidDirective} from './submit-button/my-submit-if-valid.directive';
import {
  MyCheckboxRequiredValidator,
  MyEmailValidator,
  MyMaxLengthValidator,
  MyMinLengthValidator,
  MyPatternValidator,
  MyRequiredValidator
} from './validators/solution-1-simplest/my-validators-directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DebugFormComponent,
    DebugInputFieldComponent,
    MyErrorMessageComponent,
    MyErrorDirective,
    MyControlOptionsDirective,
    MySubmitIfValidAndDirtyDirective,
    MySubmitIfValidDirective,
    // extended Validators originaly from Angular, now with an embedded 'msg' property
    MyRequiredValidator,
    MyEmailValidator,
    MyMinLengthValidator,
    MyMaxLengthValidator,
    MyPatternValidator,
    MyCheckboxRequiredValidator,
  ],
  exports: [
    DebugFormComponent,
    DebugInputFieldComponent,
    MyErrorMessageComponent,
    MyErrorDirective,
    MyControlOptionsDirective,
    MySubmitIfValidAndDirtyDirective,
    MySubmitIfValidDirective,
    MyRequiredValidator,
    MyEmailValidator,
    MyMinLengthValidator,
    MyMaxLengthValidator,
    MyPatternValidator,
    MyCheckboxRequiredValidator,
  ],
  // entryComponents: [MyErrorMessageComponent],
  providers: [
  // for service import MyValidatorsServicesModule explictly in addition to MyValidatorsModule
  ]
})
export class MyValidatorsModule {
}

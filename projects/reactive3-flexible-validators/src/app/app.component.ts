import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MY_ALERT_SERVICE_API, MY_MESSAGES_SERVICE_API} from '@gpeel/validators';
import {ReactiveAllComponent} from './reactive-all/reactive-all.component';
import {AlertWithSimpleLogService} from './validators/alert-with-simple-log.service';
import {TypicalMessagesService} from './validators/typical-messages.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveAllComponent],
  template: `

    <reactive-all></reactive-all>

  `,
  // Defining overriding providers HERE WORKS ! but not in app.config.ts
  // I have no idea why.
  providers: [
    {
      provide: MY_ALERT_SERVICE_API,
      useClass: AlertWithSimpleLogService
    },
    // providing MY_MESSAGES_SERVICE_API enables the (mySubmitIfValidAndDirty) Directive
    // to pop alert with message label you define in your MessageService (here I18nMessagesService)
    // when makin the form dirty for example
    {
      provide: MY_MESSAGES_SERVICE_API,
      useClass: TypicalMessagesService,
    },
    // MY_SHOW_ERROR_MSG_FUNCTION_API enable to change to function used by <my-error-msg> component to show the errors
    // You can change globally this function here,
    // or you can make a local change for one specific input with the use showErrorFunction @Input
    // on <my-error-msg [showErrorFunction]="fn" > or on <input myErrorMsg  [showErrorFunction]="fn" >
    // NOTE: solution 2 => you can pass that function as a parameter to provideMyValidators( showFunction ) instead of
    // overriding the token MY_SHOW_ERROR_MSG_FUNCTION_API.
    // {
    //   provide: MY_SHOW_ERROR_MSG_FUNCTION_API,
    //   // default value:
    //   // useValue: (control: AbstractControl) => (control.dirty || control.touched)
    //   // not showing error until blurred
    //   useValue: (control: AbstractControl) => control.touched
    //   /**
    //    * If you want a Strategy that will reveal the errors when the form is (submitted or field blurred)
    //    * you have to split your code. because (PB) in an Angular form there is no way to know if the form has been
    //    * submitted or not using the forms APIs. So you must do the job yourslef to keep track in a boolean if the form
    //    * has been submitted or not. The rest of the job
    //    * is done by this function with useValue: (control: AbstractControl) => control.touched
    //    * HERE sinci I used on the button the @Directive mySubmitIfValidAndDirty, all fields are turned into touched and
    //    * dirty when you click. So I don't have to explicitly track the submit event.
    //    */
    // }
    ]

})
export class AppComponent {

}

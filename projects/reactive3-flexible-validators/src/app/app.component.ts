import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {MY_ALERT_SERVICE_API, MY_MESSAGES_SERVICE_API, MY_SHOW_ERROR_MSG_FUNCTION_API} from '@gpeel/validators';
import {ReactiveAllComponent} from './reactive-all/reactive-all.component';
import {AlertWithSimpleLogService} from './validators/alert-with-simple-log.service';
import {TypicalMessagesService} from './validators/typical-messages.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports : [CommonModule,  ReactiveAllComponent],
  template: `

    <reactive-all></reactive-all>

  `,
  // Defining overriding providers HERE WORK ! but not in app.config.ts
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
    {
      provide: MY_SHOW_ERROR_MSG_FUNCTION_API,
      // default value:
      // useValue: (control: AbstractControl) => (control.dirty || control.touched)
      // not showing error until blurred
      useValue: (control: AbstractControl) => control.touched
      /**
       * If you want a Strategy when you reveal the errors when the form is submitted or field blurred.
       * PB : With Angular there is no way to know if the form is submitted or not.
       * So you must do part of the job behind the button handler which submit the form.
       * The rest of the job is done by this function with useValue: (control: AbstractControl) => control.touched
       */
    }]

})
export class AppComponent {

}

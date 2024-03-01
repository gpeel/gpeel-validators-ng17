import {ApplicationConfig} from '@angular/core';
import {providePlog} from '@gpeel/plog';
import {provideMyValidators} from '@gpeel/validators';
import {plogConfig} from './plog-config';
import {TypicalStandaloneValidatorsService} from './validators/typical-standalone-validators.service';
import {TypicalValidatorsService} from './validators/typical-validators.service';

export const appConfig: ApplicationConfig = {
  providers: [
    providePlog(plogConfig),
    // provideMyValidators((control: AbstractControl) => control.touched),
    provideMyValidators(),
    // TypicalMessagesService,
    TypicalValidatorsService,
    TypicalStandaloneValidatorsService,

    // DECLARING HERE the custom Tokens MY_ALERT_SERVICE_API (and the others) is NOT taken into account be Angular.
    // I succeeded when declaring in AppComponent @Compoennt.providers property.
    // see ./app/AppComponent
    //
    // AlertWithSimpleLogService,
    // Providing MY_ALERT_SERVICE_API is useful only for the submit directive feature (mySubmitIfValidAndDirty)="onSend()"
    // to show popup
    // {
    //   provide: MY_ALERT_SERVICE_API,
    //   useClass: AlertWithSimpleLogService
    // },
    // // providing MY_MESSAGES_SERVICE_API enables the (mySubmitIfValidAndDirty) Directive
    // // to pop alert with message label you define in your MessageService (here I18nMessagesService)
    // // when makin the form dirty for example
    // {
    //   provide: MY_MESSAGES_SERVICE_API,
    //   useClass: TypicalMessagesService,
    // },
    // // MY_SHOW_ERROR_MSG_FUNCTION_API enable to change to function used by <my-error-msg> component to show the errors
    // // You can change globally this function here,
    // // or you can make a local change for one specific input with the use showErrorFunction @Input
    // // on <my-error-msg [showErrorFunction]="fn" > or on <input myErrorMsg  [showErrorFunction]="fn" >
    // {
    //   provide: MY_SHOW_ERROR_MSG_FUNCTION_API,
    //   // default value:
    //   // useValue: (control: AbstractControl) => (control.dirty || control.touched)
    //   // not showing error until blurred
    //   useValue: (control: AbstractControl) => control.touched
    //   /**
    //    * If you want a Strategy when you reveal the errors when the form is submitted or field blurred.
    //    * PB : With Angular there is no way to know if the form is submitted or not.
    //    * So you must do part of the job behind the button handler which submit the form.
    //    * The rest of the job is done by this function with useValue: (control: AbstractControl) => control.touched
    //    */
    // }

  ]
};

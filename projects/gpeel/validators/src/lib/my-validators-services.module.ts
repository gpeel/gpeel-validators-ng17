import {NgModule} from '@angular/core';
import {MY_ALERT_SERVICE_API} from './pluggable-api/alert/alert-api';
import {DefaultAlertService} from './pluggable-api/alert/default-alert.service';
import {DefaultMessagesService} from './pluggable-api/messages/default-messages.service';
import {
  DEFAULT_SHOW_ERROR_MSG_FUNCTION,
  MY_MESSAGES_SERVICE_API,
  MY_SHOW_ERROR_MSG_FUNCTION_API
} from './pluggable-api/messages/messages-service-api';
import {DefaultValidatorsService} from './pluggable-api/validators/default-validators.service';
import {MY_VALIDATORS_SERVICE_API} from './pluggable-api/validators/validators-service-api';

@NgModule({
  // entryComponents: [MyErrorMessageComponent],
  providers: [
    DefaultAlertService,
    DefaultValidatorsService,
    DefaultMessagesService,
    {
      provide: MY_ALERT_SERVICE_API,
      useClass: DefaultAlertService
    },
    {
      provide: MY_MESSAGES_SERVICE_API,
      useClass: DefaultMessagesService
    },
    {
      provide: MY_VALIDATORS_SERVICE_API,
      useClass: DefaultValidatorsService
    },
    {
      provide: MY_SHOW_ERROR_MSG_FUNCTION_API,
      useValue: DEFAULT_SHOW_ERROR_MSG_FUNCTION
    }
  ],
})
export class MyValidatorsServicesModule {
}

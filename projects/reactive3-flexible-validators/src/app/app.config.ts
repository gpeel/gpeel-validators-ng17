import {ApplicationConfig} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {providePlog} from '@gpeel/plog';
import {provideMyValidators} from '@gpeel/validators';
import {plogConfig} from './plog-config';
import {AlertWithSimpleLogService} from './validators/alert-with-simple-log.service';
import {TypicalStandaloneValidatorsService} from './validators/typical-standalone-validators.service';
import {TypicalValidatorsService} from './validators/typical-validators.service';

export const appConfig: ApplicationConfig = {
  providers: [
    providePlog(plogConfig),
    provideMyValidators({
      showFunction: (control: AbstractControl) => control.touched,
      alertService :  AlertWithSimpleLogService
    }),
    // provideMyValidators(),
    // TypicalMessagesService,
    TypicalValidatorsService,
    TypicalStandaloneValidatorsService,

    // DECLARING HERE the custom Tokens MY_ALERT_SERVICE_API (and the others) is NOT taken into account be Angular.
    // I succeeded when declaring in AppComponent @Component.providers property.
    // And then I changed the API to pass the customizable Services inside the provideMyValidators()
    // see in app.config.ts
    //
    // I could also write explicitly any provider like
    // {
    //   provide: MY_ALERT_SERVICE_API,
    //   useClass: AlertWithSimpleLogService
    // },
    // But it is easier with the methods provideMyValidators. It helps to tell the user WHT can be customized
    // because options is typed and each type is an optional customization.

  ]
};

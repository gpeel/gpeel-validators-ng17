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
    // I succeeded when declaring in AppComponent @Compoennt.providers property.
    // And then I changed the API to pass the customizable Services inside the provideMyValidators()
    // see in app.config.ts
    //

  ]
};

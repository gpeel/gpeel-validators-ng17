import {ApplicationConfig} from '@angular/core';
import {providePlog} from '@gpeel/plog';
import {provideMyValidators} from '@gpeel/validators';
import {plogConfig} from './plog-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideMyValidators(),
    providePlog(plogConfig),
  ]
};

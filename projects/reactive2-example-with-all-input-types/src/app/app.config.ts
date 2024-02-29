import {ApplicationConfig} from '@angular/core';
import {provideMyValidators} from '@gpeel/validators';

export const appConfig: ApplicationConfig = {
  providers: [
    provideMyValidators()
  ]
};

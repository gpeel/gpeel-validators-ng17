import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {providePlog} from '@gpeel/plog';

import {routes} from './app.routes';
import {plogConfig} from './plog-config';

export const appConfig: ApplicationConfig = {
  providers: [
    providePlog(plogConfig),
    provideRouter(routes)
  ]
};

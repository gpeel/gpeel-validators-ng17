import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {MY_VALIDATORS_PROVIDERS} from './my-validators.module';
import {MY_SHOW_ERROR_MSG_FUNCTION_API, ShowFunction} from './pluggable-api/messages/messages-service-api';

/**
 * default value for MY_SHOW_ERROR_MSG_FUNCTION_API is following function:
 * export function DEFAULT_SHOW_ERROR_MSG_FUNCTION(control: AbstractControl) {
 *   return (control.dirty || control.touched);
 */

export function provideMyValidators(showFunction?: ShowFunction): EnvironmentProviders {

  const providers = MY_VALIDATORS_PROVIDERS;

  if (showFunction) {
    providers.push(
      {
        provide: MY_SHOW_ERROR_MSG_FUNCTION_API,
        useValue: showFunction
      }
    );
  }

  return makeEnvironmentProviders(providers);

}

/**
 * Source for inspiration:
 * <angular17>/packages/router/src/provide_router.ts
 *
 * export function provideRouter(routes: Routes, ...features: RouterFeatures[]): EnvironmentProviders {
 *   return makeEnvironmentProviders([
 *     {provide: ROUTES, multi: true, useValue: routes},
 *     (typeof ngDevMode === 'undefined' || ngDevMode) ?
 *         {provide: ROUTER_IS_PROVIDED, useValue: true} :
 *         [],
 *     {provide: ActivatedRoute, useFactory: rootRoute, deps: [Router]},
 *     {provide: APP_BOOTSTRAP_LISTENER, multi: true, useFactory: getBootstrapListener},
 *     features.map(feature => feature.ɵproviders),
 *   ]);
 * }
 */

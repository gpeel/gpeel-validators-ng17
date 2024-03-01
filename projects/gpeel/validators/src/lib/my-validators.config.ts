import {EnvironmentProviders, makeEnvironmentProviders, Provider} from '@angular/core';
import {MY_ALERT_SERVICE_API, MyAlertServiceAbstract} from './pluggable-api/alert/alert-api';
import {DefaultAlertService} from './pluggable-api/alert/default-alert.service';
import {DefaultMessagesService} from './pluggable-api/messages/default-messages.service';
import {
  DEFAULT_SHOW_ERROR_MSG_FUNCTION,
  MY_MESSAGES_SERVICE_API,
  MY_SHOW_ERROR_MSG_FUNCTION_API,
  MyMessagesServiceAbstract,
  ShowFunction
} from './pluggable-api/messages/messages-service-api';
import {DefaultValidatorsService} from './pluggable-api/validators/default-validators.service';
import {
  MY_VALIDATORS_SERVICE_API,
  MyValidatorsServiceAbstract
} from './pluggable-api/validators/validators-service-api';

export type ProvideMyValidatorsOptions = {
  showFunction?: ShowFunction;
  alertService?: typeof MyAlertServiceAbstract;
  messageService? : typeof  MyMessagesServiceAbstract;
  validatorService?: typeof MyValidatorsServiceAbstract;
}

/**
 * - MY_SHOW_ERROR_MSG_FUNCTION_API default function is:
 *
 * export function DEFAULT_SHOW_ERROR_MSG_FUNCTION(control: AbstractControl) {
 *   return (control.dirty || control.touched);
 *
 * - MY_ALERT_SERVICE_API default is DefaultAlertService (just logging when submitted a pristine form ...)
 * - MY_MESSAGES_SERVICE_API default is DefaultMessagesService
 * This DefaultMessagesService has all classic message keys for classic validators :
 * email required requiredTrue max min maxlength minlength pattern
 * With an english message.
 * - MY_VALIDATORS_SERVICE_API default is: DefaultValidatorsService
 * DefaultValidatorsService has all classic validators functions available in Angular Validators static class.
 * But here it is a service, so now you can inject other services.
 * The DefaultValidatorsService injects MY_MESSAGES_SERVICE_API to extract the message from it and use it to create the
 * errorr-message of the .errors property of a FormControl (or any other type of AbstractControl(s)).
 */


export function provideMyValidators(options?: ProvideMyValidatorsOptions): EnvironmentProviders {

  const providers: (EnvironmentProviders | Provider)[] = [];

  if (options && options.showFunction) {
    console.log('****************** SHOW function custom');
    providers.push(
      {
        provide: MY_SHOW_ERROR_MSG_FUNCTION_API,
        useValue: options.showFunction
      }
    );
  } else {
    providers.push(
      {
        provide: MY_SHOW_ERROR_MSG_FUNCTION_API,
        useValue: DEFAULT_SHOW_ERROR_MSG_FUNCTION
      }
    );
  }

  if (options && options.alertService) {
    providers.push(
      [
        // @ts-ignore
        {
          provide: MY_ALERT_SERVICE_API,
          useClass: options.alertService
        },
        // @ts-ignore
        {
          provide: options.alertService,
          useClass: options.alertService
        },
      ]
    );
  } else {
    providers.push(
      // [
        {
          provide: MY_ALERT_SERVICE_API,
          useClass: DefaultAlertService
        },
        {
          provide: DefaultAlertService,
          useClass: DefaultAlertService
        }
        // ]
    );
  }

  if (options && options.messageService) {
    providers.push(
      [
        // @ts-ignore
        {
          provide: MY_MESSAGES_SERVICE_API,
          useClass: options.messageService
        },
        // @ts-ignore
        {
          provide: options.messageService,
          useClass: options.messageService
        },
      ]
    );
  } else {
    providers.push(
      // [
        {
          provide: MY_MESSAGES_SERVICE_API,
          useClass: DefaultMessagesService
        },
        {
          provide: DefaultMessagesService,
          useClass: DefaultMessagesService
        }
        // ]
    );
  }

  if (options && options.validatorService) {
    providers.push(
      [
        // @ts-ignore
        {
          provide: MY_VALIDATORS_SERVICE_API,
          useClass: options.validatorService
        },
        // @ts-ignore
        {
          provide: options.validatorService,
          useClass: options.validatorService
        },
      ]
    );
  } else {
    providers.push(
      // [
        {
          provide: MY_VALIDATORS_SERVICE_API,
          useClass: DefaultValidatorsService
        },
        {
          provide: DefaultValidatorsService,
          useClass: DefaultValidatorsService
        }
        // ]
    );
  }
  console.log('PPPP', providers);
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

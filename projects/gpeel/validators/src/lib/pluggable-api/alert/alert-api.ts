import {InjectionToken} from '@angular/core';

export abstract class MyAlertServiceAbstract {
  abstract warn(...msg: any[]): void;
}

export const MY_ALERT_SERVICE_API = new InjectionToken<MyAlertServiceAbstract>('MyAlert');


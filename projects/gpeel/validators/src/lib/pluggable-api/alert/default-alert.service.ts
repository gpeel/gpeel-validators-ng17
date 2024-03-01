import {Injectable} from '@angular/core';
import {MyAlertServiceAbstract} from './alert-api';

@Injectable()
export class DefaultAlertService extends MyAlertServiceAbstract {
  public warn(msg: any): void {
    console.log('WARNNNNNNNNNNNNNNNNNNNNNNNNNNNNN', msg);
  }
}

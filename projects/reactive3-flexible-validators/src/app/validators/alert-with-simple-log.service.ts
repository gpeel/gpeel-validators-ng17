import {Injectable} from '@angular/core';
import {Plog} from '@gpeel/plog';
import {MyAlertServiceAbstract} from '@gpeel/validators';

@Injectable()
export class AlertWithSimpleLogService extends MyAlertServiceAbstract{

  constructor() {
    super();
    Plog.createComponent('AlertWithSimpleLogService');
  }

  warn(...msg: any[]) {
    console.log(...msg, '$$$$$$$$$$$$$$$$$');
    alert(...msg);
  }

}

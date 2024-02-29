import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {ReactiveUiComponent} from './reactive-flexible-ui/reactive-ui.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports : [CommonModule, ReactiveUiComponent],
  template: `

    <reactive-ui></reactive-ui>

  `
})
export class AppComponent {

}

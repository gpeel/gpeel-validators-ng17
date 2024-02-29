import {Component} from '@angular/core';
import {MyValidatorsModule} from '@gpeel/validators';
import {ReactiveSimplestComponent} from './reactive-simplest/reactive-simplest.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MyValidatorsModule,
    ReactiveSimplestComponent,
  ],
  template: `

    <reactive-simplest></reactive-simplest>

  `
})
export class AppComponent {

}

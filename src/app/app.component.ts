import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule,],
  template: '<router-outlet />',

})
export class AppComponent {
  title = 'Hunter-Is-League-Front';
  faCoffee = faCoffee;
}

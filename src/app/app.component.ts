import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
  <app-header ></app-header>

<div class="container">
  <div class="row">
    <div class="col-12">
     <router-outlet>

     </router-outlet>
    </div>
  </div>
</div>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit() {
    this.authService.autoLogin();
  }
  constructor(private authService: AuthService) {

  }
}

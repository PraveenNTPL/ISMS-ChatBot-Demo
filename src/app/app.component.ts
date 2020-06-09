import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

import './_content/app.less';

@Component({ selector: 'app', templateUrl: 'app.component.html', styles: ['p { font-family: "Times New Roman", Times, serif;color: red;font-size: 60px;font-style: oblique; }'] })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    private loadImage() {
        console.log("http://localhost:8080/"+document.getElementById('hiddenLoginBKImage').getAttribute('src'));
        return ("http://localhost:8080/"+document.getElementById('hiddenLoginBKImage').getAttribute('src'));
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
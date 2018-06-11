import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;

    error = false;

    constructor(
        public router: Router,
        public userService: UserService
    ) {}

    ngOnInit() {}

    login() {
        this.userService
            .login(this.email, this.password)
            .subscribe(
                (res: any) => {
                    if (res.auth && res.token && res.user) {
                        const user = res.user;
                        user.token = res.token;
                        localStorage.setItem('user', JSON.stringify(user));
                        this.router.navigate(['/dashboard']);
                    }
                },
                err => this.error = true
            );
    }
}

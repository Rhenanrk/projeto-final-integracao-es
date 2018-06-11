import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    model: User = new User();
    repeatPassword = '';
    invalid = false;
    error = false;

    constructor(
        public userService: UserService,
        public router: Router
    ) {}

    ngOnInit() {}

    onSubmit(f) {
        if (this.model.password !== this.repeatPassword) {
            this.invalid = true;
            return;
        }
        this.invalid = false;
        this.userService
            .register(this.model)
            .subscribe(
                (res: any) => {
                    if (res.auth && res.token) {
                        this.model.token = res.token;
                        localStorage.setItem('user', JSON.stringify(this.model));
                        this.router.navigate(['/dashboard']);
                    }
                },
                err => this.error = true
            )
    }
}

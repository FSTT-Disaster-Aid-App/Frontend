import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
interface Response {
  token: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loginHandler(): void {
    this.http
      .post<Response>('http://localhost:8080/auth/token', this.loginForm.value)
      .subscribe({
        next: (res) => {
          // set token in local storage
          localStorage.setItem('token', res.token);
          // Redirect to the desired route after successful login
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
  }
}

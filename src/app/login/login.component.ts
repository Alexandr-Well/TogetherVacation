import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { UserService } from '../service/user.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public subs: Subscription
  userPk: number

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private readonly userService: UserService
  ) {
  }

  ngOnInit(): void {
    localStorage.removeItem('AngularPJName')
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  submit(): void {

    this.http.post('http://127.0.0.1:8000/api/login/', this.form.getRawValue(), {
      withCredentials: true
    }).subscribe(() => this.router.navigate(['/']));
    this.subs = this.userService.count$.subscribe((count) => (this.userPk = count))
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
    document.location.reload()
  }
}

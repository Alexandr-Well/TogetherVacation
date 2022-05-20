import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Emitters} from '../emitters/emitters';
import { UserService } from '../service/user.service'


interface carrentUser {
  username: string
  pk: number
  photo?: string
  email?: string
  phone?: string

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  message = '';
  user: carrentUser = {
    pk : 0,
    username : ''
  }
  constructor(
    private http: HttpClient,
    private readonly userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:8000/api/user/', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.username}`;
        Emitters.authEmitter.emit(true);
        this.user.pk = res.pk
        this.user.username = res.username
        this.userService.changeCount(res.pk)
        window.localStorage.setItem('AngularPJName', res.pk)
      },

      err => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }

    );
  }

}

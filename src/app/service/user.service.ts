import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Subject } from 'rxjs'


interface CarrentUser {
  username: string
  pk: number
  photo?: string
  email?: string
  phone?: string

}

Injectable({providedIn: 'root'})
export class UserService {
  public count$ = new Subject<number>()

  public changeCount(count: number) {
     this.count$.next(count);
  }
  public getCount() {
    return this.count$
 }
}




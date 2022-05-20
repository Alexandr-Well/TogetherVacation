import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import * as moment from 'moment'


interface TaskPaginated {
  count: number
  next: any
  previous: any
  results: any
}

export interface Task {
  pk?: any
  title: string
  date: string
  name: any
}

interface CreateResponse {
  pk: string
  name: number
}

@Injectable({providedIn: 'root'})
export class TasksService {
  static url = 'http://127.0.0.1:8000/api/tasks/'
  nextPage: string|null = null
  previousPage: string|null = null
  pageNumber: number = 0
  user: any = localStorage.getItem('AngularPJName')


  constructor(public http: HttpClient) {
  }

  ngOnInit(): void {
  }

  load(date: moment.Moment): Observable<Task[]>{
    const userPk = localStorage.getItem('AngularPJName')
    return this.http
    .get<TaskPaginated>(`${TasksService.url}?date=${date.format('DD-MM-YYYY')}&id=${userPk}`)
    .pipe(map(tasks => {
      if (!tasks) {
        return []
      }
      this.nextPage = tasks.next
      this.previousPage = tasks.previous
      return Object.keys(tasks.results).map(key => ({...tasks.results[key], id: key}))
    }))
  }
  create(task: Task): Observable<Task> {
    return this.http
    .post<CreateResponse>(`${TasksService.url}`, task)
    .pipe(map(rez => {
      task.pk = rez.pk
      rez.name = task.name
      return {...task, pk: rez.pk}
    }))
  }

  remove(task: Task) {
    return this.http
    .delete<void>(`${TasksService.url}${task.pk}`)
  }

  move(step: number): Observable<Task[]>{
    return this.http
    .get<TaskPaginated>((step > 0)?this.nextPage:this.previousPage)
    .pipe(map(tasks => {
      if (!tasks) {
        return []
      }
      if (step > 0) {
        this.pageNumber +=5
      } else{
        this.pageNumber -=5
      }
      this.nextPage = tasks.next
      this.previousPage = tasks.previous
      return Object.keys(tasks.results).map(key => ({...tasks.results[key], id: key}))
    }))
  }
}

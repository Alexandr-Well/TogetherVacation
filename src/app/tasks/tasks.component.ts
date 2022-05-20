import { Component, OnInit } from '@angular/core';
import { DateService } from '../service/date.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { TasksService, Task } from '../service/tasks.service'
import { switchMap } from 'rxjs/operators';
import { UserService } from '../service/user.service'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent implements OnInit {

  form: FormGroup
  tasks: Task[] = []
  public subs: Subscription
  userPk: number

  constructor(public dateService: DateService,
              public tasksService: TasksService,
              private readonly userService: UserService) { }

  ngOnInit(): void {
    this.subs = this.userService.count$.subscribe((count) => (this.userPk = count))
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value
    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
      name: Number(this.userPk)
    }

    this.tasksService.create(task).subscribe(task => {
      this.tasks.push(task)
      this.form.reset()
    }, err => console.error(err))
  }

  remove(task: Task) {
    this.tasksService.remove(task).subscribe(()=> {
      this.tasks = this.tasks.filter(t => t.pk !== task.pk)
    }, err => console.error(err))
  }

  move(step: number){
      this.dateService.date.pipe(
        switchMap(() => this.tasksService.move(step))
      ).subscribe(tasks => {
        this.tasks = tasks
      })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

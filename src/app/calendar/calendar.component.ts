import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { DateService } from '../service/date.service'

interface Day {
  value: moment.Moment
  active: boolean
  disabled: boolean
  selected: boolean
}

interface Week {
  days: Day[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Week[]

  constructor(public dateService: DateService) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this))
  }

  generate(now: moment.Moment) {
    const startD = now.clone().startOf('month').startOf('week')
    const endD = now.clone().endOf('month').endOf('week')
    const date = startD.clone().subtract(1, 'day')
    const calendar = []

    while (date.isBefore(endD, 'day')) {
      calendar.push({
        days: Array(7)
        .fill(0)
        .map( () => {
          const value = date.add(1, 'day').clone()
          const active = moment().isSame(value, 'date')
          const disabled = !now.isSame(value, 'month')
          const selected = now.isSame(value, 'date')
          return {
            value, active, disabled, selected
          }
        })
      })
    }
    this.calendar = calendar
  }
  select (day: any){
    this.dateService.changeDate(day)

  }

}

import { Component, OnInit } from '@angular/core';
import { DateService } from '../service/date.service'

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {

  constructor(public dateService: DateService) { }

  move(dir: number) {
    this.dateService.changeMonth(dir)
  }

}

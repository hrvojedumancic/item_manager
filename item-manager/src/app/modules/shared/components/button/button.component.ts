import { Component, Input, OnInit } from '@angular/core';
import * as EventEmitter from 'events';

@Component({
  selector: 'app-shared-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  public icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}

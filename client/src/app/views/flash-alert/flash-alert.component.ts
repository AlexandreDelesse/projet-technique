import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flash-alert',
  templateUrl: './flash-alert.component.html',
  styleUrls: ['./flash-alert.component.scss'],
})
export class FlashAlertComponent implements OnInit {
  @Input() message: string = 'Success!';
  @Input() type: string = 'success';
  @Input() show: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  close() {
    this.show = false;
  }
}

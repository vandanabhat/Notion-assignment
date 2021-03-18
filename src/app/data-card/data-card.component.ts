import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss']
})
export class DataCardComponent implements OnInit {
  @Input() uniData: any;
  constructor() { }

  ngOnInit(): void {
  }

}

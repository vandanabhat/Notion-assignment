import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
// import { debug } from 'console';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchText = '';

  @Output() searchEmit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  onSearchUni($event: any): void {
    // emit search event
    this.searchEmit.emit(this.searchText);
  }
}

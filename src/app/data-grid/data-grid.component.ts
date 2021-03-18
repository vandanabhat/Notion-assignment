import { Component, OnInit } from '@angular/core';
import { UniDataService } from './../uni-data.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {
  public uniDataList: any[] = [];
  private dataListAll: any[] = [];
  private dataHeader: any;
  noDataMessage = 'No Result';
  searchChange: Subject<string> = new Subject<string>();

  constructor(private uniDataService: UniDataService) {
    // subscribe to search event
    this.searchChange.pipe(
      debounceTime(400), // wait 400ms after the last event before emitting last event
       distinctUntilChanged()  // only emit if value is different from previous value
    )
    .subscribe((searchText: string) => this.filterSearch(searchText));
  }

  ngOnInit(): void {
    // get data on init
    this.uniDataService.getUniData().subscribe(
      (data: any) => {
        this.dataListAll = data.split('\n');
        this.dataHeader = this.dataListAll.shift().split(',');
        this.uniDataList = this.indexUniData(this.dataListAll);
      },
      (err: any) => {
        console.error(err);
        this.noDataMessage = err.error;
      });
  }

  onSearch(searchText: any): void {
    if (searchText === '') {
      this.clearSearch();
    }else {
      this.searchChange.next(searchText);
    }
  }

  private filterSearch(searchText: any): void {
    // regex pattern to search text start and ends with comma or space
    const regex = new RegExp(`(?:^|[, ])${searchText}(?:$|[, ])`, 'gi');

    const filteredRow = this.dataListAll.filter((item: string) => {
      return regex.test(item);
    });
    this.uniDataList = this.indexUniData(filteredRow);
  }

  private clearSearch(): void{
    this.uniDataList = this.indexUniData(this.dataListAll);
  }

  private indexUniData(uniData: any): any{
    // add row headers to the row data
    return uniData.map((row: string) => {
      const uniDetails: any = {};
      row.split(',').forEach((item: string, index: number) => {
        uniDetails[this.dataHeader[index]] = item;
      });
      return uniDetails;
    });
  }
}

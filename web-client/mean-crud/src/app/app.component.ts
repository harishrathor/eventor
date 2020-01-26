import { ApiService } from './services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mean-crud';

  constructor(protected _apiService: ApiService) {

  }
  ngOnInit() {
    this._apiService.getUsersList().subscribe(response => {
      console.log('Got user list');
      console.log(response);
    });
  }
  
}

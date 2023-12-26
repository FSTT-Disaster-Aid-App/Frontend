import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  helloWorldMessage: string = '';

  constructor(private http: HttpClient) {}

  getHelloWorld() {
    this.http.get<string>('http://localhost:8080/hello').subscribe(
      (response) => {
        this.helloWorldMessage = response;
      },
      (error) => {
        console.error('Error fetching hello world:', error);
        this.helloWorldMessage = 'Error fetching hello world';
      },
    );
  }
}

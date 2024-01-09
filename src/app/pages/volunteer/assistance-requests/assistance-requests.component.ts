import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Assistancerequest } from 'src/app/interfaces/assistancerequest';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-assistance-requests',
  templateUrl: './assistance-requests.component.html',
  styleUrls: ['./assistance-requests.component.scss'],
})
export class AssistanceRequestsComponent {
  assistanceRequests: Assistancerequest[] = [];
  private gatewayUrl = environment.gatewayUrl;
  private baseUrl = `${this.gatewayUrl}/victim/AssistantRequests`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllAssistanceRequests();
  }

  getAllAssistanceRequests(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const requestOptions = { headers: headers };

      this.http
        .get<{ data: Assistancerequest[] }>(`${this.baseUrl}`, requestOptions)
        .subscribe(
          (response) => {
            this.assistanceRequests = response.data;
          },
          (error) => {
            console.error('Error fetching Assistance Requests:', error);
          },
        );
    } else {
      console.error('Token is missing');
    }
  }
  makeOfer(id: string | undefined): void {
    console.log('clicked');
  }
}

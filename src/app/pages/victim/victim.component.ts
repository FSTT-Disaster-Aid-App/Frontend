import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Assistancerequest } from "../../interfaces/assistancerequest";
import { environment } from "../../../environments/environment";
import {Observable, tap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-victim',
  templateUrl: './victim.component.html',
  styleUrls: ['./victim.component.scss']
})
export class VictimComponent implements OnInit {
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

      this.http.get<{ data: Assistancerequest[] }>(`${this.baseUrl}`, requestOptions)
        .subscribe(response => {
            this.assistanceRequests = response.data;
          },
          error => {
            console.error('Error fetching Assistance Requests:', error);
          });
    } else {
      console.error('Token is missing');
    }
  }
  deleteItem(id: string | undefined): Observable<any> {
    const token = localStorage.getItem('token');
    if (token && id) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const requestOptions = { headers: headers };

      return this.http.delete<any>(`${this.baseUrl}/${id}`, requestOptions);
    } else {
      return new Observable<any>(observer => observer.error('Token or ID is missing'));
    }
  }
  deleteIte(id: string | undefined): void {
    this.deleteItem(id).subscribe(
      () => {
        // Mettez à jour la liste des éléments après la suppression
        this.getAllAssistanceRequests();
      },
      error => {
        console.error('Error deleting item:', error);
      }
    );
  }


}

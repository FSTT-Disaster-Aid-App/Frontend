import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Assistancerequest } from "../../interfaces/assistancerequest";
import { environment } from "../../../environments/environment";
import {Observable, tap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AssistantrequestsService} from "../../services/victim/assistantrequests.service";

@Component({
  selector: 'app-victim',
  templateUrl: './victim.component.html',
  styleUrls: ['./victim.component.scss']
})
export class VictimComponent implements OnInit {
  assistanceRequests: Assistancerequest[] = [];
  private gatewayUrl = environment.gatewayUrl;
  private baseUrl = `${this.gatewayUrl}/victim/AssistantRequests`;
  // Inside your VictimComponent class
  showAddForm: boolean = false;


  constructor(private http: HttpClient, private assistantservice: AssistantrequestsService) {}

  ngOnInit(): void {
    this.getAllAssistanceRequests();
  }
  getAllAssistanceRequests(): void {
    this.assistantservice.getAllItems().subscribe(
      (response) => {
        this.assistanceRequests = response.data;
      },
      (error) => {
        console.error('Error fetching Assistance Requests:', error);
      }
    );
  }


  deleteIte(id: string | undefined): void {
    this.assistantservice.deleteItem(id).subscribe(
      () => {
        // Mettez à jour la liste des éléments après la suppression
        this.getAllAssistanceRequests();
      },
      error => {
        console.error('Error deleting item:', error);
      }
    );
  }

  createAssistanceRequest(assistanceRequest: Assistancerequest): Observable<Assistancerequest> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const requestOptions = { headers: headers };

      return this.http.post<Assistancerequest>(`${this.baseUrl}`, assistanceRequest, requestOptions)
        .pipe(
          catchError(error => {
            console.error('Error creating Assistance Request:', error);
            return throwError(error);
          })
        );
    } else {
      return throwError('Token is missing');
    }
  }

  addAssistantRequest(assistanceRequest: Assistancerequest): void {
    this.assistantservice.postItem(assistanceRequest).subscribe(
      (response) => {
        console.log('Assistance Request added successfully:', response);
        this.getAllAssistanceRequests(); // Refresh the list after adding
        this.showAddForm = false; // Close the form
      },
      (error) => {
        console.error('Error adding Assistance Request:', error);
      }
    );
  }





}

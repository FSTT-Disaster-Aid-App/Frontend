import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private gatewayUrl = environment.gatewayUrl;
  private baseUrl = `${this.gatewayUrl}/victim/skills`;

  constructor(private http: HttpClient) {}

  deleteItem(id: string | undefined): Observable<any> {
    const token = localStorage.getItem('token');
    if (token && id) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const requestOptions = { headers: headers };

      return this.http.delete<any>(`${this.baseUrl}/${id}`, requestOptions);
    } else {
      return new Observable<any>((observer) =>
        observer.error('Token or ID is missing')
      );
    }
  }

  // Add method for POST operation
  createItem(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const requestOptions = { headers: headers };

      return this.http.post<any>(this.baseUrl, data, requestOptions);
    } else {
      return new Observable<any>((observer) => observer.error('Token is missing'));
    }
  }

  // Add method for UPDATE operation
  updateItem(id: string | undefined, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (token && id) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const requestOptions = { headers: headers };

      return this.http.put<any>(`${this.baseUrl}/${id}`, data, requestOptions);
    } else {
      return new Observable<any>((observer) =>
        observer.error('Token or ID is missing')
      );
    }
  }
}

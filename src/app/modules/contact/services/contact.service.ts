import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../interfaces/contact.interface';
import { ApiResponse } from '../../../shared/interfaces/api.response.interface';


@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly apiUrl = 'http://localhost:3000/api/contacts';

  constructor(private readonly http: HttpClient) {}

  private handleResponse<T>(response: Observable<ApiResponse<T>>): Observable<T> {
    return response.pipe(
      map(res => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          return res.data;
        }
        throw new Error(res.message || 'Error en la solicitud');
      })
    );
  }

  getContacts(): Observable<Contact[]> {
    return this.handleResponse(
      this.http.get<ApiResponse<Contact[]>>(this.apiUrl)
    );
  }

  getContactById(id: number): Observable<Contact> {
    return this.handleResponse(
      this.http.get<ApiResponse<Contact>>(`${this.apiUrl}/${id}`)
    );
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.handleResponse(
      this.http.post<ApiResponse<Contact>>(this.apiUrl, contact)
    );
  }

  updateContact(id: number, contact: Contact): Observable<Contact> {
    return this.handleResponse(
      this.http.put<ApiResponse<Contact>>(`${this.apiUrl}/${id}`, contact)
    );
  }

  deleteContact(id: number): Observable<void> {
    return this.handleResponse(
      this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`)
    );
  }
}
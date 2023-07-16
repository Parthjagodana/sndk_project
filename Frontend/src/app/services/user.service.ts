import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models';
import { environment } from '../../environments/environment';

const baseUrl = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData!: User;

  constructor(private http: HttpClient) {}

  getAllUser(statusFilter: number, search: string) {
    let params = new HttpParams();

    // Set the query parameters
    if (statusFilter) params = params.set('isActive', statusFilter);
    if (search) params = params.set('search', search.toString());

    return this.http.get<User[]>(`${baseUrl}`, { params: params });
  }

  update(id: string, params: any) {
    return this.http.put(`${baseUrl}/changePassword/${id}`, params).pipe(
      map((update: any) => {
        return update;
      })
    );
  }

  updateUser(id: string, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params).pipe(
      map((update: any) => {
        return update;
      })
    );
  }
}

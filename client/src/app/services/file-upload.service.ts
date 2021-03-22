import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from '@app/models/file';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  baseUrl: string = 'http://127.0.0.1:8000/api/files';
  constructor(private http: HttpClient) {}

  upload(formData: FormData): Observable<File> {
    return this.http.post<File>(`${this.baseUrl}`, formData, {
      headers: new HttpHeaders({
        accept: 'application/json',
        'content-type': 'application/json',
      }),
    });
  }
}

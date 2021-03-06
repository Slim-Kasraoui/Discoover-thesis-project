import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Guide from 'src/app/models/Guide';

@Injectable({
  providedIn: 'root'
})
export class GuidesService {

  constructor(private http: HttpClient) { }

  getGuide(id:string): Observable<Guide> {
    return this.http.get<Guide>(`/api/users/guides/${id}`);
  }
}

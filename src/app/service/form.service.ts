import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  public save(formContents, images) {

    let formData =  new FormData();
    formData.append('FormContent', formContents);
    formData.append("Images", images);

    return this.http.post("backend-base-url/save-form", formData)
   }

}


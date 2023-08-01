import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from '../company/company.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  url = environment.API_URL + '/companies';

  constructor(private http: HttpClient) {}

  saveCompany(company: any): Observable<Company> {
    return this.http.post<Company>(this.url, company);
  }

  updateCompany(id: Number, company: any): Observable<Company> {
    return this.http.put<Company>(this.url + `/${id}`, company);
  }

  deleteCompany(company: Company): any {
    return this.http.delete<Company>(this.url + `/${company.id}`);
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.url);
  }
}

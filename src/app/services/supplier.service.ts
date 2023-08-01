import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Supplier } from '../supplier/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  url = environment.API_URL + '/suppliers';

  constructor(private http: HttpClient) {}

  saveSupplier(supplier: any): Observable<Supplier> {
    return this.http.post<Supplier>(this.url, supplier);
  }

  updateSupplier(id: Number, supplier: any): Observable<Supplier> {
    return this.http.put<Supplier>(this.url + `/${id}`, supplier);
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.url);
  }

  deleteSupplier(supplier: Supplier): any {
    return this.http.delete(this.url + `/${supplier.id}`);
  }
}

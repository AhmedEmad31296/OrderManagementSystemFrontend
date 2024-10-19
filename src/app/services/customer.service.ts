import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CreateCustomerInput,
  CustomerPagedDto,
  FilterCustomerPagedInput,
  FullInfoCustomerDto,
  UpdateCustomerInput,
} from '../models/customer/CustomerDto';
import { DataTableFilteredDto } from '../models/datatableDto/DataTableFilteredDto';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = environment.apiUrl + 'Customer';

  constructor(private http: HttpClient) {}

  getPaged(
    filter: FilterCustomerPagedInput
  ): Observable<ApiResponse<DataTableFilteredDto<CustomerPagedDto>>> {
    let params = new HttpParams()
      .set('Page', filter.page.toString())
      .set('PageSize', filter.pageSize.toString());

    if (filter.searchTerm) {
      params = params.set('SearchTerm', filter.searchTerm);
    }

    if (filter.sortColumn) {
      params = params.set('SortColumn', filter.sortColumn);
    }

    if (filter.sortDirection) {
      params = params.set('SortDirection', filter.sortDirection);
    }

    return this.http.get<ApiResponse<DataTableFilteredDto<CustomerPagedDto>>>(
      `${this.baseUrl}/GetPaged`,
      { params }
    );
  }

  create(customerInput: CreateCustomerInput): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${this.baseUrl}/Create`,
      customerInput
    );
  }

  update(customerInput: UpdateCustomerInput): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${this.baseUrl}/Update`,
      customerInput
    );
  }

  get(id: number): Observable<ApiResponse<FullInfoCustomerDto>> {
    return this.http.get<ApiResponse<FullInfoCustomerDto>>(
      `${this.baseUrl}/Get?id=${id}`
    );
  }

  delete(id: number): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${this.baseUrl}/Delete/${id}`,
      {}
    );
  }
}

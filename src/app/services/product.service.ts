import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DataTableFilteredDto } from '../models/datatableDto/DataTableFilteredDto';
import { ApiResponse } from '../models/ApiResponse';
import { environment } from 'src/environments/environment';
import {
  CreateProductInput,
  FilterProductPagedInput,
  FullInfoProductDto,
  ProductPagedDto,
  UpdateProductInput,
} from '../models/product/ProductDto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.apiUrl + 'Product';
  constructor(private http: HttpClient) {}

  getPaged(
    filter: FilterProductPagedInput
  ): Observable<ApiResponse<DataTableFilteredDto<ProductPagedDto>>> {
    let params = new HttpParams()
      .set('Page', filter.page.toString())
      .set('PageSize', filter.pageSize.toString());

    if (filter.lowPrice !== undefined) {
      params = params.set('LowPrice', filter.lowPrice.toString());
    }

    if (filter.highPrice !== undefined) {
      params = params.set('HighPrice', filter.highPrice.toString());
    }

    if (filter.searchTerm) {
      params = params.set('SearchTerm', filter.searchTerm);
    }

    if (filter.sortColumn) {
      params = params.set('SortColumn', filter.sortColumn);
    }

    if (filter.sortDirection) {
      params = params.set('SortDirection', filter.sortDirection);
    }

    return this.http
      .get<ApiResponse<DataTableFilteredDto<ProductPagedDto>>>(
        `${this.baseUrl}/GetPaged`,
        { params }
      )
      .pipe(catchError(this.handleError));
  }

  get(id: number): Observable<ApiResponse<FullInfoProductDto>> {
    return this.http
      .get<ApiResponse<FullInfoProductDto>>(`${this.baseUrl}/Get?id=${id}`)
      .pipe(catchError(this.handleError));
  }

  create(input: CreateProductInput): Observable<ApiResponse<string>> {
    return this.http
      .post<ApiResponse<string>>(`${this.baseUrl}/Create`, input)
      .pipe(catchError(this.handleError));
  }

  update(input: UpdateProductInput): Observable<ApiResponse<string>> {
    return this.http
      .post<ApiResponse<string>>(`${this.baseUrl}/Update`, input)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<ApiResponse<string>> {
    return this.http
      .post<ApiResponse<string>>(`${this.baseUrl}/Delete/${id}`, {})
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}

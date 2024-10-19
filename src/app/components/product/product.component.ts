// src/app/products/products.component.ts
import { Component, OnInit } from '@angular/core';
import {
  CreateProductInput,
  FilterProductPagedInput,
  FullInfoProductDto,
  ProductPagedDto,
  UpdateProductInput,
} from 'src/app/models/product/ProductDto';
import { ProductService } from 'src/app/services/product.service';
import { ProductModalComponent } from './product-dialog/product-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { DataTableFilteredDto } from 'src/app/models/datatableDto/DataTableFilteredDto';
@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  products: ProductPagedDto[] = [];
  totalRecords: number = 0;
  selectedProduct: FullInfoProductDto | null = null;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(
    page: number = 1,
    pageSize: number = 100,
    lowPrice?: number,
    highPrice?: number,
    searchTerm?: string
  ): void {
    const filter: FilterProductPagedInput = {
      page: page,
      pageSize: pageSize,
      lowPrice: lowPrice,
      highPrice: highPrice,
      searchTerm: searchTerm,
    };
    this.productService.getPaged(filter).subscribe({
      next: (res: ApiResponse<DataTableFilteredDto<ProductPagedDto>>) => {
        this.products = res.data.aaData;
        this.totalRecords = res.data.recordsTotal;
        setTimeout(() => {
          this.initializeDataTable();
        }, 0);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  initializeDataTable(): void {
    $('#productsTable').DataTable({
      paging: true,
      searching: true,
      ordering: true,
      info: true,
      lengthChange: true,
      processing: true,
      destroy: true,
    });
  }
  openCreateModal(): void {
    this.selectedProduct = {
      productId: 0,
      name: '',
      price: 0,
      stockQuantity: 0,
    };
    const modalRef = this.modalService.open(ProductModalComponent);
    modalRef.componentInstance.product = this.selectedProduct;

    modalRef.result.then((result) => {
      if (result) {
        this.createProduct(result);
      }
    });
  }

  openEditModal(productId: number): void {
    this.getProductDetails(productId);
  }

  getProductDetails(productId: number): void {
    this.productService.get(productId).subscribe({
      next: (res: ApiResponse<FullInfoProductDto>) => {
        this.selectedProduct = res.data;
        const modalRef = this.modalService.open(ProductModalComponent);
        modalRef.componentInstance.product = this.selectedProduct;
        modalRef.result.then((result) => {
          if (result) {
            this.updateProduct(result);
          }
        });
      },
      error: (res) => {
        this.toastr.error(res.error);
      },
    });
  }

  createProduct(product: CreateProductInput): void {
    this.productService.create(product).subscribe({
      next: (res: ApiResponse<string>) => {
        this.toastr.success(res.message);
        setTimeout(() => {
          this.fetchProducts();
        }, 0);
      },
      error: (res) => {
        console.log(res);
        this.toastr.error(res.error);
      },
    });
  }

  updateProduct(product: UpdateProductInput): void {
    this.productService.update(product).subscribe({
      next: (res: ApiResponse<string>) => {
        this.toastr.success(res.message);
        setTimeout(() => {
          this.fetchProducts();
        }, 0);
      },
      error: (res) => {
        console.log(res);
        this.toastr.error(res.error);
      },
    });
  }

  deleteProduct(productId: number): void {
    this.productService.delete(productId).subscribe({
      next: (res: ApiResponse<string>) => {
        this.toastr.success(res.message);
        setTimeout(() => {
          this.fetchProducts();
        }, 0);
      },
      error: (res) => {
        this.toastr.error(res.error);
      },
    });
  }
}

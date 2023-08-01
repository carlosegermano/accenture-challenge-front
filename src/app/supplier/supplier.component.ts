import { Component, ViewChild } from '@angular/core';
import { Supplier } from './supplier.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SupplierDialogComponent } from './supplier-dialog/supplier-dialog.component';
import { SupplierService } from '../services/supplier.service';
import { MessageService } from '../services/message.service';
import { ConfirmationDialogComponent } from '../utils/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent {
  supplier!: Supplier;
  suppliers: Supplier[] = [];
  displayedColumns: string[] = [
    'id',
    'nationalDocument',
    'name',
    'email',
    'zipCode',
    'nationalId',
    'birthday',
    'actions',
  ];
  dataSource: MatTableDataSource<Supplier> = new MatTableDataSource(
    this.suppliers
  );

  @ViewChild(MatTable) table!: MatTable<Supplier[]>;

  constructor(
    private supplierService: SupplierService,
    private dialog: MatDialog,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getSuppliers();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(SupplierDialogComponent, {
      height: '80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.supplier = result;
      this.getSuppliers();
    });
  }

  openEditDialog(supplier: Supplier) {
    const dialogRef = this.dialog.open(SupplierDialogComponent, {
      height: '80%',
      data: { supplier: supplier },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.supplier = result;
      this.getSuppliers();
    });
  }

  getSuppliers(): void {
    this.supplierService.getSuppliers().subscribe((data) => {
      this.suppliers = data;
      this.dataSource.data = data;
    });
  }

  openDeleteDialog(supplier: Supplier): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Tem certeza que deseja excluir este fornecedor?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Cancelar',
        },
        data: {
          supplier: supplier,
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteSupplier(supplier);
      }
    });
  }

  deleteSupplier(supplier: Supplier): void {
    this.supplierService.deleteSupplier(supplier).subscribe(
      () => {
        this.messageService.showSuccessMessage(
          'Fornecedor excluído com sucesso!'
        );
        this.getSuppliers();
      },
      () => {
        this.messageService.showErrorMessage(
          'Erro ao tentar deletar o fornecedor!'
        );
      }
    );
  }
}

import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Company } from './company.model';
import { CompanyService } from '../services/company.service';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDialogComponent } from './company-dialog/company-dialog.component';
import { ConfirmationDialogComponent } from '../utils/confirmation-dialog/confirmation-dialog.component';
import { MessageService } from '../services/message.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit, AfterViewInit {
  company!: Company;
  companies: Company[] = [];
  displayedColumns: string[] = [
    'id',
    'cnpj',
    'tradeName',
    'suppliers',
    'zipCode',
    'address',
    'actions',
  ];
  dataSource: MatTableDataSource<Company> = new MatTableDataSource(
    this.companies
  );
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Company[]>;

  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(CompanyDialogComponent, {
      height: '80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.company = result;
      this.getCompanies();
    });
  }

  openEditDialog(company: Company) {
    const dialogRef = this.dialog.open(CompanyDialogComponent, {
      height: '80%',
      data: { company: company },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.company = result;
      this.getCompanies();
    });
  }

  openDeleteDialog(company: Company): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Tem certeza que deseja excluir esta empresa?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Cancelar',
        },
        data: {
          company: company,
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteCompany(company);
      }
    });
  }

  deleteCompany(company: Company): void {
    this.companyService.deleteCompany(company).subscribe(
      () => {
        this.messageService.showSuccessMessage('Empresa excluída com sucesso!');
        this.getCompanies();
      },
      () => {
        this.messageService.showErrorMessage(
          'Erro ao tentar deletar a empresa!'
        );
      }
    );
  }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe((data) => {
      this.companies = data;
      this.dataSource.data = data;
    });
  }
}

import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Company } from './company.model';
import { CompanyService } from '../services/company.service';
import { MatDialog } from '@angular/material/dialog';
import { CompanyAddComponent } from './company-add/company-add.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  company!: Company;
  companies: Company[] = [];
  displayedColumns: string[] = [
    'id',
    'cnpj',
    'tradeName',
    'zipCode',
    'address',
    'actions',
  ];
  dataSource: MatTableDataSource<Company> = new MatTableDataSource(
    this.companies
  );

  @ViewChild(MatTable) table!: MatTable<Company[]>;

  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(CompanyAddComponent, {
      height: '80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.company = result;
      this.getCompanies();
    });
  }

  openEditDialog(company: Company) {
    const dialogRef = this.dialog.open(CompanyAddComponent, {
      height: '80%',
      data: { company: company },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.company = result;
      this.getCompanies();
    });
  }

  openDeleteDialog(company: Company) {}

  getCompanies(): void {
    this.companyService.getCompanies().subscribe((data) => {
      this.companies = data;
      this.dataSource.data = data;
    });
  }
}

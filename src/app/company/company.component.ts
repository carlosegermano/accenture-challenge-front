import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Company } from './company.model';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
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

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  openAddDialog() {}

  openEditDialog(company: Company) {}

  openDeleteDialog(company: Company) {}

  getCompanies(): void {
    this.companyService.getCompanies().subscribe((data) => {
      this.companies = data;
      this.dataSource.data = data;
      console.log(data);
    });
  }
}

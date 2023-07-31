import { Company } from './../company.model';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  client: Company;
}

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css'],
})
export class CompanyAddComponent implements OnInit {
  title: string = '';

  company = {
    cnpj: '',
    tradeName: '',
    zipCode: '',
  };

  companyForm = new FormGroup({
    cnpj: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(14),
    ]),
    tradeName: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<CompanyAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.company = this.data?.client;

    this.title =
      this.company === undefined || this.company === null
        ? 'Nova Empresa'
        : 'Editar Empresa';

    if (this.company !== undefined) {
      this.setValuesInForm();
    }
  }

  saveCompany() {
    console.log(this.company);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  setValuesInForm(): void {
    this.companyForm.patchValue({
      cnpj: this.company.cnpj,
      tradeName: this.company.tradeName,
      zipCode: this.company.zipCode,
    });
  }

  onSubmit(form: FormGroupDirective): boolean | null {
    return form.valid;
  }
}

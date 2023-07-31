import { Company } from './../company.model';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';
import { MessageService } from 'src/app/services/message.service';

interface DialogData {
  company: Company;
}

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css'],
})
export class CompanyAddComponent implements OnInit {
  title: string = '';

  company!: Company;

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
    private companyService: CompanyService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.company = this.data?.company;

    this.title =
      this.company === undefined || this.company === null
        ? 'Nova Empresa'
        : 'Editar Empresa';

    if (this.company !== undefined) {
      this.setValuesInForm();
    }
  }

  saveCompany() {
    if (this.company?.id === undefined || this.company?.id === null) {
      this.companyService.saveCompany(this.companyForm.value).subscribe(
        () => {
          this.messageService.showSuccessMessage('Empresa salva com sucesso!');
          this.dialogRef.close();
        },
        (error) => {
          this.messageService.showErrorMessage(
            JSON.stringify(error.error.message)
          );
        }
      );
    } else {
      this.companyService
        .updateCompany(this.company.id, this.companyForm.value)
        .subscribe(
          () => {
            this.messageService.showSuccessMessage(
              'Empresa alterada com sucesso!'
            );
            this.dialogRef.close();
          },
          (error) => {
            this.messageService.showErrorMessage(error.error.message);
          }
        );
    }
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

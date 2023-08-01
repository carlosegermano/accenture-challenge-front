import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { Person, Supplier } from '../supplier.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SupplierService } from 'src/app/services/supplier.service';
import { MessageService } from 'src/app/services/message.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

interface DialogData {
  supplier: Supplier;
}

@Component({
  selector: 'app-supplier-dialog',
  templateUrl: './supplier-dialog.component.html',
  styleUrls: ['./supplier-dialog.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class SupplierDialogComponent {
  title: string = '';
  labelPosition: 'before' | 'after' = 'after';

  supplier!: Supplier;

  supplierForm = new FormGroup({
    nationalDocument: new FormControl('', [
      Validators.required,
      Validators.pattern('((^[\\d]{14})|([\\d]{11}$))'),
    ]),
    personType: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    zipCode: new FormControl('', [
      Validators.required,
      Validators.pattern('([\\d]{8})'),
    ]),
    nationalId: new FormControl('', [Validators.pattern('([\\d]{7})')]),
    birthday: new FormControl(),
  });

  constructor(
    private dialogRef: MatDialogRef<SupplierDialogComponent>,
    private supplierService: SupplierService,
    private messageService: MessageService,
    private dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    this.supplier = this.data?.supplier;

    this.title =
      this.supplier === undefined || this.supplier === null
        ? 'Novo Fornecedor'
        : 'Editar Fornecedor';

    if (this.supplier !== undefined) {
      this.setValuesInForm();
    }
  }

  saveSupplier() {
    if (
      this.supplierForm.value.nationalDocument != undefined &&
      this.supplierForm.value.nationalDocument.length == 11
    ) {
      this.supplierForm.value.personType = Person.NATURAL_PERSON.toString();
    } else if (
      this.supplierForm.value.nationalDocument != undefined &&
      this.supplierForm.value.nationalDocument.length == 14
    ) {
      this.supplierForm.value.personType = Person.LEGAL_PERSON.toString();
    }

    if (this.supplier?.id === undefined || this.supplier?.id === null) {
      this.supplierService.saveSupplier(this.supplierForm.value).subscribe(
        (obj) => {
          this.messageService.showSuccessMessage(
            'Fornecedor salvo com sucesso!'
          );
          this.dialogRef.close();
        },
        (error) => {
          debugger;
          if (error.error.errors != undefined) {
            this.messageService.showErrorMessage(
              JSON.stringify(error.error.errors[0].message)
            );
          } else {
            this.messageService.showErrorMessage(
              JSON.stringify(error.error.message)
            );
          }
        }
      );
    } else {
      this.supplierService
        .updateSupplier(this.supplier.id, this.supplierForm.value)
        .subscribe(
          () => {
            this.messageService.showSuccessMessage(
              'Fornecedor alterado com sucesso!'
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
    this.supplierForm.patchValue({
      nationalDocument: this.supplier.nationalDocument,
      name: this.supplier.name,
      email: this.supplier.email,
      zipCode: this.supplier.zipCode,
      nationalId: this.supplier.nationalId,
      birthday: this.supplier.birthday,
    });
  }

  onSubmit(form: FormGroupDirective): boolean | null {
    return form.valid;
  }
}

import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccessMessage(message: string): void {
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-class'];
    config.duration = 3000;
    this.snackBar.open(message, 'Sair', config);
  }

  showErrorMessage(message: string): void {
    const config = new MatSnackBarConfig();
    config.panelClass = ['red-snackbar'];
    config.duration = 3000;
    this.snackBar.open(message, 'Sair', config);
  }
}

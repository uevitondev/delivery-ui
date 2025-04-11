import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: any): void {
    console.error('OCORREU UM ERRO: ', error.message);
    throwError(() => error);
  }
}

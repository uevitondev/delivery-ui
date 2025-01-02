import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  toastService = inject(ToastrService);
  handleError(error: any, message: string): void {
    this.toastService.error(message);
    console.error('OCORREU UM ERRO:', error.message);
    throwError(() => error);
  }
}

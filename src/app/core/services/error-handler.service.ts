import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  toastService = inject(ToastrService);
  handleError(error: any): void {
    this.toastService.error(error.message);
  }
}

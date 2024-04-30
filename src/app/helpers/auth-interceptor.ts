import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { StorageService } from "../services/storage.service";




export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  console.log('Chamando authInterceptor');
  const storageService = inject(StorageService);
  const authUser = storageService.get('authUser');


  return next(req).pipe(
    catchError((error) => {
      console.log(error)
      return throwError(() => error);
    })
  );
}



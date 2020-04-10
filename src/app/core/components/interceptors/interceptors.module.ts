import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Injectable, NgModule } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MensagensService } from '@shared/services/mensagens.service';
import { ToastType } from '../toasts/toasts.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private mensagensService: MensagensService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((event: HttpEvent<any>) => {
          if (event instanceof HttpErrorResponse) {
            if (event.status === 401) {
              this.router.navigate(['autenticacao/login'], { queryParams: { redirectTo: window.location.pathname } });
            } else if (event.status === 403) {
              this.router.navigate(['semacesso']);
            } else {
              if (typeof event.error === 'object') {
                this.mensagensService.exibirNotificacao({
                  message: (event.error.errors && event.error.errors[Object.keys(event.error.errors)[0]][0]) || event.message,
                  title: 'Erro de Processamento!',
                  type: ToastType.error
                });
              } else {
                this.mensagensService.exibirNotificacao({
                  message: event.error || event.message,
                  title: 'Erro de Processamento!',
                  type: ToastType.error
                });
              }

            }
          }
          return throwError(event);
        })
      );
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ]
})
export class InterceptorsModule { }

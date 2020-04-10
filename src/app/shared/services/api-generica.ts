import { HttpClient, HttpEvent } from '@angular/common/http';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PagedResult } from '@shared/models/paged-result';
import { downloadArquivo } from '@shared/utils/rxjs-operators';

export class ApiGenerica<T> {

    constructor(protected http: HttpClient, protected url: string) { }

    listar(params: any = {}): Observable<T[] | PagedResult<T>> {
        return this.http.get<T[]>(this.url, { params: this.validParams(params) }).pipe(take(1));
    }

    buscarPeloId(id: number | string): Observable<T> {
        return this.http.get<T>(`${this.url}${id}`).pipe(take(1));
    }

    adicionar(data: T): Observable<T> {
        return this.http.post<T>(`${this.url}`, data).pipe(take(1));
    }

    atualizar(id: number | string, data: T): Observable<void | T> {
        return this.http.put<void | T>(`${this.url}${id}`, data).pipe(take(1));
    }

    exculir(id: number | string): Observable<T> {
        return this.http.delete<T>(`${this.url}${id}`).pipe(take(1));
    }

    fazerDownload(url: string, nomeArquivo: string, contentType: string) {
        return this.http.get(url, { responseType: 'arraybuffer' })
            .pipe(downloadArquivo(contentType, nomeArquivo), take(1));
    }

    fazerUpload(url: string, files: FileList): Observable<HttpEvent<{}>> {
        const formData: FormData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append(`file${i}`, files[i]);
        }

        return this.http.post(url, formData, {
            observe: 'events',
            reportProgress: true
        });
    }

    private validParams(params: any = {}): any {
        const newParams: any = {};
        for (const param in params) {
            if (params[param] !== undefined) {
                newParams[param] = params[param];
            }
        }
        return newParams;
    }
}

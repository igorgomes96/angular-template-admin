import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '@shared/models/usuario';
import { Observable, BehaviorSubject, pipe } from 'rxjs';
import { environment } from '@env/environment';
import { take, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private url = environment.api;
  private userChangesEmitter = new BehaviorSubject<Usuario>(null);

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  private get decodeToken(): Usuario {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    return {
      email: decodedToken.unique_name
    };
  }

  get usuario$(): Observable<Usuario> {
    return this.userChangesEmitter.asObservable();
  }

  login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<string>(`${this.url}login`, usuario)
      .pipe(this.atualizarToken());
  }

  resetarSenha(email: string): Observable<void> {
    return this.http.put<void>(`${this.url}solicitacaoredefinicao`, { email }).pipe(take(1));
  }

  cadastrarSenha(usuario: Usuario): Observable<Usuario> {
    return this.http.put<string>(`${this.url}redefinicacaosenha`, usuario)
      .pipe(this.atualizarToken());
  }

  private atualizarToken() {
    return pipe(
      take(1),
      map((token: string) => {
        localStorage.setItem('token', token);
        const usuarioAutenticado = this.decodeToken;
        this.userChangesEmitter.next(usuarioAutenticado);
        return usuarioAutenticado;
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }
}

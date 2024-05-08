import { Injectable } from '@angular/core';
import { UsuarioModel } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { UsuarioValidadoModel } from '../modelos/usuario.validado.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  urlBase:string = ConfiguracionRutasBackend.urlSeguridad;

  constructor(private http: HttpClient) { 
    this.validacionDeSesion();
  }


   /**
   * Identificar Usuario
   * @param usuario
   * @param clave
   * @returns datos del usuario validado 
   */

  IdentificarUsuario(usuario:string, clave:string): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(`${this.urlBase}identificar-usuario`, {
      correo: usuario, 
      clave: clave
    });
  }

  /**
   * Almacenar Datos Usuario Identificado
   * @param datos del usuario
   * 
   */
  AlmacenarDatosUsuarioIdentificado(datos:UsuarioModel):boolean{
    let cadena = JSON.stringify(datos);
    let datosLS = localStorage.getItem('datos-usuario');
    if(datosLS){
      return false;
    }else{
      localStorage.setItem('datos-usuario', cadena);
      return true;
    }
  }

  /**
   * Busca los datos en el local storage de un usuario
   * @returns 
   */

  ObtenerDatosUsuarioLS():UsuarioModel | null{
    let datosLS = localStorage.getItem('datos-usuario');
    if(datosLS){
       let datos = JSON.parse(datosLS);
       return datos
    }else{
      return null;
    }
  }


  /**
   * Validar 2fa
   * @param idUsuario 
   * @param codigo 
   * @returns 
   */

  ValidarCodigo2FA(idUsuario:string, codigo:string): Observable<UsuarioValidadoModel>{
    return this.http.post<UsuarioValidadoModel>(`${this.urlBase}verificar-2fa`, {
      usuarioId: idUsuario, 
      codigo2fa: codigo
    });
}

RegistrarUsuarioPublico(datos: any): Observable<UsuarioModel>{
  return this.http.post<UsuarioModel>(`${this.urlBase}usuario-publico`, datos);
}

ValidarHashUsuarioPublico(hash: string): Observable<boolean>{
  return this.http.post<boolean>(`${this.urlBase}validar-hash-usuario`, {
    codigoHash: hash
  });
}

/**
 * Guarda en el local storage la informacion de los datos validados
 * @param datos datos d el usuario validado
 * @returns respuesta
 */
AlmacenarDatosUsuarioValidado(datos:UsuarioValidadoModel):boolean{
  let cadena = JSON.stringify(datos);
  let datosLS = localStorage.getItem('datos-sesion');
  if(datosLS != null){
    return false;
  }else{
    let datosString = JSON.stringify(datos);
    localStorage.setItem('datos-sesion', datosString);
    this.ActualizarComportamientoUsuario(datos);
    return true;
  }

}


/**
 * Cerrando Sesion
 */
RemoverDatosUsuarioValidado(){
  let datosUsuario = localStorage.getItem('datos-usuario');
  let datosSesion = localStorage.getItem('datos-sesion');
  if(datosUsuario){
    localStorage.removeItem('datos-usuario');

  if(datosSesion){
    localStorage.removeItem('datos-sesion');  
  }

  }
  this.ActualizarComportamientoUsuario(new UsuarioValidadoModel());
}

/**
 * Cambiar Clave
 */

/*CambiarClave(){
}*/

RecuperarClavePorUsuario(usuario: string): Observable<UsuarioModel>{
  return this.http.post<UsuarioModel>(`${this.urlBase}recuperar-clave`, {
    correo: usuario
  });
}

/** Administracion de la sesion de usuario */

datosUsuarioValidado = new BehaviorSubject<UsuarioValidadoModel>(new UsuarioValidadoModel())
ObtenerDatosSesion():Observable<UsuarioValidadoModel>{
  return this.datosUsuarioValidado.asObservable();
}

validacionDeSesion(){
  let ls = localStorage.getItem('datos-sesion');
  if (ls){
    let objuusuario = JSON.parse(ls);
    this.ActualizarComportamientoUsuario(objuusuario);
  }
}

ActualizarComportamientoUsuario(datos:UsuarioValidadoModel){
  return this.datosUsuarioValidado.next(datos)
}
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  selector: 'app-cerrar-sesion',
  standalone: true,
  imports: [],
  templateUrl: './cerrar-sesion.component.html',
  styleUrl: './cerrar-sesion.component.css'
})
export class CerrarSesionComponent {

  constructor(
  private servicioSeguridad: SeguridadService,
  private router: Router
  ){

  }
  ngOnInit(){
    this.cerrarSesion();
  }

  cerrarSesion(){
    this.servicioSeguridad.RemoverDatosUsuarioValidado();
    this.router.navigate([""]);
  }
}

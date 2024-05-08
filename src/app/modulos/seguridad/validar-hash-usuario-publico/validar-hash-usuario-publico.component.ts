import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  selector: 'app-modulos-seguridad-validar-hash-usuario-publico',
  templateUrl: './modulos-seguridad-validar-hash-usuario-publico.component.html',
  styleUrl: './modulos-seguridad-validar-hash-usuario-publico.component.css'
})
export class ValidarHashUsuarioPublicoComponent {
  validado = false;
  hash:string = "";

  constructor(
    private servicioSeguridad: SeguridadService,
    private route: ActivatedRoute
  ){
   
  }

  ngOnInit(){
    this.hash = this.route.snapshot.params['hash'];
    this.ValidarHash();
  }


  // metodo de validacion del hash 

  ValidarHash(){
    this.servicioSeguridad.ValidarHashUsuarioPublico(this.hash).subscribe({
      next: (respuesta:boolean) => {
        this.validado = respuesta;
      },
      error: (err) => {

      }
  });
}

}
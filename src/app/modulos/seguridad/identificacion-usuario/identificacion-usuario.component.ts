import { Component } from '@angular/core';
import { FormGroup, NgControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';
import { MD5 } from 'crypto-js'
import { Router } from '@angular/router';

@Component({
  selector: 'app-identificacion-usuario',
  standalone: true,
  imports: [],
  templateUrl: './identificacion-usuario.component.html',
  styleUrl: './identificacion-usuario.component.css'
})

export class IdentificacionUsuarioComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) { }

  ngOnInit(){
    this.ConstruirFormulario();
  }

  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]]
    });
  }


  IdentificarUsuario(){
    if(this.fGroup.invalid){
      alert("Datos Incompletos")
    } else {
      let usuario = this.obtenerFormGroup['usuario'].value;
      let clave = this.obtenerFormGroup['clave'].value;
      let claveCifrada = MD5(clave).toString();
      this.servicioSeguridad.IdentificarUsuario(usuario, claveCifrada).subscribe({
        next: (datos:UsuarioModel) => {
          if(datos._id == undefined || datos._id == null){
          alert("Credenciales incorrectas o falta validación del correo electrónico");
          }else{
          console.log(datos);
          //this.servicioSeguridad.AlmacenarDatosUsuarioValidado(datos);
          if(this.servicioSeguridad.AlmacenarDatosUsuarioIdentificado(datos)){
          this.router.navigate(['/seguridad/2fa']);
          }
        }
        },
        error: (err) => {
          console.log(err);
      }
    });
    }
  }
  get obtenerFormGroup(){
    return this.fGroup.controls;
  }
}



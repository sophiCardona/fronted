import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from '../../../modelos/usuario.model';
import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  selector: 'app-registro-publico-usuarios',
  templateUrl: './registro-publico-usuarios.component.html',
  styleUrl: './registro-publico-usuarios.component.css'
})

export class RegistroPublicoUsuariosComponent {
  fGroup: FormGroup = new FormGroup({});


  constructor(
    private fb: FormBuilder,
    private serviciosSeguridad: SeguridadService
   ) {
}

ngOnInit(){
  this.ConstruirFormulario();
}

// Construccion del fomrulario con los controles

ConstruirFormulario(){
  this.fGroup = this.fb.group({
    primerNombre: ['', [Validators.required, Validators.minLength(2)]],
    segundoNombre: ['', [Validators.minLength(2)]],
    primerApellido: ['', [[Validators.required, Validators.minLength(2)]]],
    segundoApellido: ['', Validators.minLength(2)],
    correo: ['', Validators.required],
    telefono: ['', Validators.required, Validators.minLength(12)],
  }); 
}

//fUNCION DE REGISTRO PUBLIco

Registrarse(){
  let campos = this.ObtenerFormGroup;
  let datos = {
    primerNombre: campos['primerNombre'].value,
    segundoNombre: campos['segundoNombre'].value,
    primerApellido: campos['primerApellido'].value,
    segundoApellido: campos['segundoApellido'].value,
    correo: campos['correo'].value,
    telefono: campos['telefono'].value,
  }
  this.serviciosSeguridad.RegistrarUsuarioPublico(datos).subscribe({
    next: (respuesta:UsuarioModel) => {
      alert('Usuario registrado con exito');
    },
    error: (err) => {
      alert('Error al registrar usuario');
    }
  })
}

  get ObtenerFormGroup(){
    return this.fGroup.controls;
  }
}

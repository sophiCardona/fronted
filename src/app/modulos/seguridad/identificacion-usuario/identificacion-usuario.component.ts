import { Component } from '@angular/core';
import { FormGroup, NgControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-identificacion-usuario',
  standalone: true,
  imports: [],
  templateUrl: './identificacion-usuario.component.html',
  styleUrl: './identificacion-usuario.component.css'
})

export class IdentificacionUsuarioComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

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
        alert("Identiicando..")
      }
  }
  

  get obtenerFormGroup(){
    return this.fGroup.controls;
  }
}



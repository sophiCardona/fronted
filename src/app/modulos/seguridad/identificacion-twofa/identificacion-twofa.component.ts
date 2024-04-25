import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';

@Component({
  selector: 'app-identificacion-twofa',
  standalone: true,
  imports: [],
  templateUrl: './identificacion-twofa.component.html',
  styleUrl: './identificacion-twofa.component.css'
})
export class IdentificacionTwofaComponent {

  usuarioId:string=""
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private servicioSeguridad: SeguridadService,
    private fb: FormBuilder,
    private router: Router

  ) { }
NgOnInit(){
  let datos = this.servicioSeguridad.ObtenerDatosUsuarioLS();
  if(datos != null){
    this.usuarioId = datos._id!; // Change access modifier to public
    this.ConstruirFormulario();
  }else{
    this.router.navigate(['/seguridad/identificar-usuario']);
  }

}

ConstruirFormulario(){
  this.fGroup = this.fb.group({
    codigo: ["", [Validators.required]]
  })
}

ValidarCodigo2fa(){
  if (this.fGroup.invalid){
    alert("Debe ingresar el código de verificación")
  }else{
  let codigo2fa = this.ObtenerFormGroup['codigo'].value;
  this.servicioSeguridad.ValidarCodigo2FA(this.usuarioId, codigo2fa).subscribe({
    next: (datos:UsuarioValidadoModel) => {
      console.log(datos);
      this.servicioSeguridad.AlmacenarDatosUsuarioValidado(datos);
      this.router.navigate([""]);
    },
    error: (err) => {
      console.log(err);
    }
  });
  }
}

get ObtenerFormGroup(){
  return this.fGroup.controls;

}

}

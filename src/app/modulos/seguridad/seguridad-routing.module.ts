import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './usuario/eliminar-usuario/eliminar-usuario.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { IdentificacionTwofaComponent } from './identificacion-twofa/identificacion-twofa.component';

const routes: Routes = [{
  path: 'autenticar-usuario',
  component: IdentificacionUsuarioComponent
},
{
  path: 'cambia-clave',
  component: CambioClaveComponent
},
{
  path: 'recuperar-clave',
  component: RecuperarClaveComponent
},
{
  path: 'cerrar-sesion',
  component: CerrarSesionComponent
},

{
  path: 'crear-usuario',
  component: CrearUsuarioComponent
},
{
  path: 'editar-usuario',
  component: EditarUsuarioComponent
},
{
  path: 'eliminar-usuario',
  component: EliminarUsuarioComponent
},
{
  path: 'listar-usuario',
  component: ListarUsuarioComponent
},
{
  path: 'listar-usuario/:id',
  component: ListarUsuarioComponent
}, 
{
  path: '2fa',
  component: IdentificacionTwofaComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }

import { PermisoModel } from "./permiso.model";
import { UsuarioModel } from "./usuario.model";

export class UsuarioValidadoModel{
    public user?: UsuarioModel;
    public token?: string = "";
    menu: PermisoModel[]= []
}
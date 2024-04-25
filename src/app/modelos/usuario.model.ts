export class UsuarioModel{
    constructor(
        public _id?: string,
        public primerNombre?: string,
        public segundoNombre?: string,
        public primerApellido?: string,
        public segundoApellido?: string,
        public correo?: string,
        public celular?: string,
        public clave?: string,
        public rolId?: string,
        public user?: UsuarioModel,
        public token: string = ""
    ){}
}
export interface UsuarioResponse {
  id: number
  nome: string
  email: string
  ativo: boolean
  provedor: string
  grupo: {
    id: number
    nome: string
  }
}

export interface EditarUsuarioRequest {
  ativo: boolean
  idGrupo: number
}

export interface BuscarRemessasResponse {
  id: number
  descricao: string
  data: Date
}

export interface ObterRemessaResponse {
  id: number
  descricao: string
  data: Date
  pacotes: number[]
}

export interface CriarOuEditarRemessaRequest {
  descricao: string
  data: Date
  pacotes: number[]
}

export interface CriarRemessaResponse {
  id: number
}

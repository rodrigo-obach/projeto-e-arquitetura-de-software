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

export interface ObterRotaResponse {
  pacotes: {
    identificador: string
    destinatario: string
    coordinates: number[]
  }[]
  points: {
    type: string
    coordinates: [number, number][]
  }
}

export type FiltroRemessa = 'todos' | 'com-remessa' | 'sem-remessa'


export interface BuscarPacotesResponse {
  id: number
  identificador: string
  prazoEntrega: Date
  destinatario: string
  endereco: string
}

export interface ObterPacoteResponse {
  id: number
  identificador: string
  prazoEntrega: Date
  destinatario: string
  endereco: string
  complemento: string
  latitude: number
  longitude: number
  idRemessa: number | null
}

export interface CriarOuEditarPacoteRequest {
  identificador: string
  prazoEntrega: Date
  destinatario: string
  endereco: string
  complemento: string | null
  latitude: number
  longitude: number
}

export interface CriarPacoteResponse {
  id: number
}

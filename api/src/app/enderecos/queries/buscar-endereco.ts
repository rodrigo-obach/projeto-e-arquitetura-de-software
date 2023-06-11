import { GraphHopperClient } from '../../../client/GraphHopperClient'

export interface DadosEndereco {
  nome: string
  latitude: number
  longitude: number
}

export type BuscarEnderecoResponse = DadosEndereco[]

export class BuscarEnderecoHandler {
  private readonly api = new GraphHopperClient()

  async executar(endereco: string): Promise<BuscarEnderecoResponse> {
    const response = await this.api.geocode(endereco)
    const hits = response.hits ?? []
    return hits.map((h) => ({
      nome: h.name,
      latitude: h.point.lat,
      longitude: h.point.lng
    }))
  }
}

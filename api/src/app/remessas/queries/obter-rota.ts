import { RemessaRepository } from '../../../repository'
import { GraphHopperClient } from '../../../client/GraphHopperClient'
import { getConfigSection } from '../../../config'
import { isAxiosError } from 'axios'

const { routeOrigin } = getConfigSection((c) => c.graphHopper)

export interface PacoteData {
  identificador: string
  destinatario: string
  coordinates: number[]
}

export interface DadosRota {
  pacotes: PacoteData[]
  points: {
    type: string
    coordinates: number[][]
  }
}

export type CriarRotaResponse = DadosRota[]

export class ObterRotaRemesaHandler {
  private readonly remessaRepository = new RemessaRepository()
  private readonly graphHopper = new GraphHopperClient()

  async executar(id: number): Promise<CriarRotaResponse> {
    const remessa = await this.remessaRepository.obter(id)

    if (!remessa?.pacotes?.length) {
      return undefined
    }

    const rota = await this.graphHopper.createRoute({
      calc_points: true,
      instructions: false,
      locale: 'pt-BR',
      profile: 'car',
      points_encoded: false,
      optimize: 'true',
      points: [
        [routeOrigin.longitude, routeOrigin.latitude],
        ...remessa.pacotes.map((p) => [p.longitude, p.latitude] as [number, number])
      ]
    })

    return rota.paths?.map((path) => ({
      points: path.points,
      pacotes: path.snapped_waypoints.coordinates.slice(1).map((coordinates, index) => {
        const pacote = remessa.pacotes[index]
        return {
          coordinates,
          identificador: pacote.identificador,
          destinatario: pacote.destinatario
        }
      })
    }))
  }
}

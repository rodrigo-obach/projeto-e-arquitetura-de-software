import { RemessaRepository } from '../../../repository'
import { GeocodeResponse, GraphHopperClient } from '../../../client/GraphHopperClient'
import { getConfigSection } from '../../../config'

const { routeOrigin } = getConfigSection((c) => c.graphHopper)

export class ObterRotaRemesaHandler {
  private readonly remessaRepository = new RemessaRepository()
  private readonly graphHopper = new GraphHopperClient()

  async executar(id: number): Promise<GeocodeResponse> {
    const remessa = await this.remessaRepository.obter(id)

    if (!remessa?.pacotes?.length) {
      return undefined
    }

    return await this.graphHopper.createRoute({
      calc_points: true,
      instructions: false,
      locale: 'pt-BR',
      profile: 'car',
      points: [
        [routeOrigin.longitude, routeOrigin.latitude],
        ...remessa.pacotes.map((p) => [p.longitude, p.latitude] as [number, number])
      ]
    })
  }
}

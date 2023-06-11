import axios from 'axios'
import { getConfigSection } from '../config'

const config = getConfigSection((c) => c.graphHopper)
axios.defaults.baseURL = config.url

export class GraphHopperClient {
  async geocode(q: string) {
    const { data } = await axios.get<GeocodeResponse>('1/geocode', {
      params: { key: config.apiKey, q, provider: 'nominatim' }
    })
    return data
  }
}

export interface GeocodeResponse {
  hits: {
    name: string
    point: {
      lat: number
      lng: number
    }
  }[]
}

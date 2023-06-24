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

  async createRoute(request: CreateRouteRequest) {
    const { data } = await axios.post<CreateRouteResponse>('1/route', request, {
      params: { key: config.apiKey }
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

export interface CreateRouteRequest {
  points: [longitude: number, latitude: number][]
  profile: 'foot' | 'car'
  locale: string
  instructions: boolean
  calc_points: boolean
  points_encoded: false
  optimize: "true" | "false"
}

export interface RoutePath {
  bbox: number[]
  points: {
    type: string
    coordinates: [longitude: number, latitude: number][]
  }
  snapped_waypoints: {
    type: string
    coordinates: [longitude: number, latitude: number][]
  }
}

export interface CreateRouteResponse {
  paths: RoutePath[]
  profile: 'foot' | 'car'
  locale: string
  instructions: boolean
  calc_points: boolean
}

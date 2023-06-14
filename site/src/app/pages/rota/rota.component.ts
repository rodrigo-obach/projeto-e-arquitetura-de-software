import { Component, OnInit } from '@angular/core'
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs'
import { PagedResult } from 'src/app/api/common/page-result'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { UsuarioClient } from 'src/app/api/usuario/usuario.client'
import { UsuarioResponse } from 'src/app/api/usuario/usuario.types'
import { AuthService } from 'src/app/services/auth.service'
import { Feature, Map, Tile, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import VectorLayer from 'ol/layer/Vector'
import { LineString, Point } from 'ol/geom'
import Icon from 'ol/style/Icon'
import Fill from 'ol/style/Fill'
import { format } from 'ol/coordinate'
import { useGeographic } from 'ol/proj'

const data = {
  hints: {
    'visited_nodes.sum': 118,
    'visited_nodes.average': 118
  },
  info: {
    copyrights: ['GraphHopper', 'OpenStreetMap contributors'],
    took: 1
  },
  paths: [
    {
      distance: 2783.836,
      weight: 566.276563,
      time: 524522,
      transfers: 0,
      bbox: [11.539425, 48.118355, 11.561864, 48.128378],
      points: {
        type: 'LineString',
        coordinates: [
          [11.539420000000002, 48.11835000000001],
          [11.540450000000002, 48.11836],
          [11.540460000000001, 48.118550000000006],
          [11.540610000000001, 48.119730000000004],
          [11.540640000000002, 48.11986],
          [11.541110000000002, 48.12084],
          [11.541150000000002, 48.12102],
          [11.54114, 48.121120000000005],
          [11.541020000000001, 48.12149],
          [11.54105, 48.12163],
          [11.54118, 48.121640000000006],
          [11.542330000000002, 48.12209000000001],
          [11.54259, 48.12216],
          [11.543920000000002, 48.122220000000006],
          [11.54409, 48.122240000000005],
          [11.544360000000001, 48.12229000000001],
          [11.545050000000002, 48.122490000000006],
          [11.546190000000001, 48.123000000000005],
          [11.547030000000001, 48.12344],
          [11.547870000000001, 48.12391],
          [11.54856, 48.124190000000006],
          [11.54869, 48.12427],
          [11.54898, 48.124500000000005],
          [11.549050000000001, 48.12464000000001],
          [11.54964, 48.125080000000004],
          [11.550220000000001, 48.125490000000006],
          [11.550740000000001, 48.12576000000001],
          [11.552790000000002, 48.12670000000001],
          [11.553400000000002, 48.127010000000006],
          [11.554210000000001, 48.127480000000006],
          [11.55507, 48.12796],
          [11.555930000000002, 48.128370000000004],
          [11.55606, 48.12825],
          [11.55644, 48.12794],
          [11.558100000000001, 48.12639],
          [11.558240000000001, 48.126290000000004],
          [11.558470000000002, 48.126160000000006],
          [11.55877, 48.126020000000004],
          [11.55897, 48.12594000000001],
          [11.56066, 48.12547000000001],
          [11.56089, 48.12534],
          [11.56131, 48.12519],
          [11.56164, 48.1251],
          [11.56173, 48.12509000000001],
          [11.561860000000001, 48.12512],
          [11.561760000000001, 48.125020000000006],
          [11.56137, 48.124520000000004],
          [11.56099, 48.124080000000006],
          [11.559880000000001, 48.12304],
          [11.559550000000002, 48.12277],
          [11.558890000000002, 48.12236]
        ]
      },
      instructions: [
        {
          distance: 76.616,
          heading: 88.82,
          sign: 0,
          interval: [0, 1],
          text: 'Continue onto Lindenschmitstraße',
          time: 27582,
          street_name: 'Lindenschmitstraße',
          points: [
            [11.539420000000002, 48.11835000000001],
            [11.540450000000002, 48.11836]
          ]
        },
        {
          distance: 371.087,
          sign: -2,
          interval: [1, 9],
          text: 'Turn left onto Plinganserstraße and drive toward Zentrum',
          time: 95424,
          street_destination: 'Zentrum',
          street_name: 'Plinganserstraße',
          points: [
            [11.540450000000002, 48.11836],
            [11.540460000000001, 48.118550000000006],
            [11.540610000000001, 48.119730000000004],
            [11.540640000000002, 48.11986],
            [11.541110000000002, 48.12084],
            [11.541150000000002, 48.12102],
            [11.54114, 48.121120000000005],
            [11.541020000000001, 48.12149],
            [11.54105, 48.12163]
          ]
        },
        {
          distance: 1364.717,
          sign: 2,
          interval: [9, 31],
          text: 'Turn right onto Lindwurmstraße and drive toward Zentrum',
          time: 228753,
          street_destination: 'Zentrum',
          street_name: 'Lindwurmstraße',
          points: [
            [11.54105, 48.12163],
            [11.54118, 48.121640000000006],
            [11.542330000000002, 48.12209000000001],
            [11.54259, 48.12216],
            [11.543920000000002, 48.122220000000006],
            [11.54409, 48.122240000000005],
            [11.544360000000001, 48.12229000000001],
            [11.545050000000002, 48.122490000000006],
            [11.546190000000001, 48.123000000000005],
            [11.547030000000001, 48.12344],
            [11.547870000000001, 48.12391],
            [11.54856, 48.124190000000006],
            [11.54869, 48.12427],
            [11.54898, 48.124500000000005],
            [11.549050000000001, 48.12464000000001],
            [11.54964, 48.125080000000004],
            [11.550220000000001, 48.125490000000006],
            [11.550740000000001, 48.12576000000001],
            [11.552790000000002, 48.12670000000001],
            [11.553400000000002, 48.127010000000006],
            [11.554210000000001, 48.127480000000006],
            [11.55507, 48.12796],
            [11.555930000000002, 48.128370000000004]
          ]
        },
        {
          distance: 591.805,
          sign: 2,
          interval: [31, 44],
          text: 'Turn right onto Kapuzinerstraße',
          time: 96841,
          street_name: 'Kapuzinerstraße',
          points: [
            [11.555930000000002, 48.128370000000004],
            [11.55606, 48.12825],
            [11.55644, 48.12794],
            [11.558100000000001, 48.12639],
            [11.558240000000001, 48.126290000000004],
            [11.558470000000002, 48.126160000000006],
            [11.55877, 48.126020000000004],
            [11.55897, 48.12594000000001],
            [11.56066, 48.12547000000001],
            [11.56089, 48.12534],
            [11.56131, 48.12519],
            [11.56164, 48.1251],
            [11.56173, 48.12509000000001],
            [11.561860000000001, 48.12512]
          ]
        },
        {
          distance: 379.61,
          sign: 3,
          interval: [44, 50],
          text: 'Turn sharp right onto Thalkirchner Straße',
          time: 75922,
          street_name: 'Thalkirchner Straße',
          points: [
            [11.561860000000001, 48.12512],
            [11.561760000000001, 48.125020000000006],
            [11.56137, 48.124520000000004],
            [11.56099, 48.124080000000006],
            [11.559880000000001, 48.12304],
            [11.559550000000002, 48.12277],
            [11.558890000000002, 48.12236]
          ]
        },
        {
          distance: 0,
          sign: 4,
          last_heading: 225.61932056661558,
          interval: [50, 50],
          text: 'Arrive at destination',
          time: 0,
          street_name: '',
          points: [[11.558890000000002, 48.12236]]
        }
      ],
      legs: [],
      details: {
        surface: [[0, 50, 'asphalt']],
        road_class: [
          [0, 1, 'residential'],
          [1, 44, 'secondary'],
          [44, 50, 'residential']
        ]
      },
      ascend: 17.6810302734375,
      descend: 32.472503662109375,
      snapped_waypoints: {
        type: 'LineString',
        coordinates: [
          [11.539420000000002, 48.11835000000001],
          [11.558890000000002, 48.12236]
        ]
      }
    }
  ]
}

@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.scss']
})
export class RotaComponent implements OnInit {
  private map?: Map

  ngOnInit(): void {
    useGeographic()

    var featureLine = new Feature({
      geometry: new LineString(data.paths[0].points.coordinates)
    })

    var sourceLine = new VectorSource({
      features: [featureLine]
    })

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: sourceLine,
          style: new Style({
            fill: new Fill({
              color: '#FF5733'
            }),
            stroke: new Stroke({
              color: '#FF5733',
              width: 5
            })
          })
        })
      ],
      view: new View({
        center: data.paths[0].points.coordinates[0],
        zoom: 11
      })
    })
  }
}

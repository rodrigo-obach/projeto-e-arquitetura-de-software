import { Component, OnInit } from '@angular/core'
import { filter, map } from 'rxjs'
import { Feature, Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import VectorLayer from 'ol/layer/Vector'
import { LineString, Point } from 'ol/geom'
import { Circle, Fill, Text } from 'ol/style'
import { useGeographic } from 'ol/proj'
import { RemessasClient } from 'src/app/api/remessa/remessa.client'
import { ObterRotaResponse } from 'src/app/api/remessa/remessa.types'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.scss']
})
export class RotaComponent implements OnInit {
  private map?: Map

  constructor(private remessaClient: RemessasClient, private route: ActivatedRoute) {
    useGeographic()
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(({ id }) => parseInt(id, 10)),
        filter((id) => !isNaN(id))
      )
      .subscribe((id) => {
        this.remessaClient.obterRota(id).subscribe((rota) => {
          this.desenharMap(rota)
        })
      })
  }

  private desenharMap(rota: ObterRotaResponse[]) {
    const routeLayer = new VectorLayer({
      source: new VectorSource({
        features: rota.map(
          (r) =>
            new Feature({
              geometry: new LineString(r.points.coordinates)
            })
        )
      }),
      style: new Style({
        fill: new Fill({
          color: '#141414'
        }),
        stroke: new Stroke({
          color: '#141414',
          width: 5
        })
      })
    })

    const pointStyle = new Style({
      image: new Circle({
        radius: 8,
        stroke: new Stroke({
          color: '#cc4229',
          width: 3
        }),
        fill: new Fill({
          color: '#cc4229'
        })
      })
    })

    const labelStyle = new Style({
      text: new Text({
        font: 'bold 14px "Open Sans", "sans-serif"',
        placement: 'point',
        padding: [2, 2, 0, 2],
        backgroundFill: new Fill({
          color: '#fff'
        }),
        backgroundStroke: new Stroke({
          color: '#141414'
        }),
        fill: new Fill({
          color: '#141414'
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 3
        }),
        offsetY: -24
      })
    })

    const style = [pointStyle, labelStyle]

    const pointsLayer = new VectorLayer({
      source: new VectorSource({
        features: rota.flatMap((rota) =>
          rota.pacotes.map(
            (pacote) =>
              new Feature({
                text: `${pacote.identificador}: ${pacote.destinatario}`,
                geometry: new Point(pacote.coordinates)
              })
          )
        )
      }),
      style: function (feature) {
        labelStyle.getText().setText(feature.get('text'))
        return style
      }
    })

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        routeLayer,
        pointsLayer
      ],
      view: new View({
        center: rota[0].points.coordinates[0],
        zoom: 12
      })
    })
  }
}

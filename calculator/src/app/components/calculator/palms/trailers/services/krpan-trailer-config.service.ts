import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ConfigurationItem } from '../../../../../models/configuration-item';

@Injectable({
  providedIn: 'root'
})
export class KrpanTrailerConfigService {
  //private url = 'http://localhost:5140';
  private url = 'https://calculator-app-api.azurewebsites.net';
  
  constructor(private httpClient: HttpClient) { }

  getTyres(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanTrailerConfig/trailers/${id}/tyres`).pipe(
      map((stanchions: ConfigurationItem[]) => {
        for (const stanchion of stanchions){
          stanchion.namePrice = stanchion.name + " " + stanchion.price + "€"
        }
        return stanchions;
      })
    );
  }

  getBrakes(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanTrailerConfig/trailers/${id}/brakes`).pipe(
      map((brakes: ConfigurationItem[]) => {
        for (const brake of brakes){
          brake.namePrice = brake.name + " " + brake.price + "€"
        }    
        return brakes;
      })
    );
  }

  getHandBrake(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/handbrake`).pipe(
      map((handBrake: ConfigurationItem | null) => {
        if (handBrake) {
          handBrake.namePrice = handBrake.name + " " + handBrake.price + "€";
          return handBrake;
        } else {
          return null;
        }
      })
    );
  }

  getExtraStanchion(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/extrastanchion`).pipe(
      map((extraStanchion: ConfigurationItem | null) => {
        if (extraStanchion) {
          extraStanchion.namePrice = extraStanchion.name + " " + extraStanchion.price + "€";
          return extraStanchion;
        } else {
          return null;
        }
      })
    );
  }

  getExtraForwarderStanchion(id: number): Observable<ConfigurationItem | null>{
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/extraforwarderstanchion`).pipe(
      map((extraForwarderStanchion: ConfigurationItem | null) => {
        if (extraForwarderStanchion) {
          extraForwarderStanchion.namePrice = extraForwarderStanchion.name + " " + extraForwarderStanchion.price + "€";
          return extraForwarderStanchion;
        } else {
          return null;
        }
      })
    );
  }

  getTopConnection(id: number): Observable<ConfigurationItem | null>{
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/topconnection`).pipe(
      map((topConnection: ConfigurationItem | null) => {
        if (topConnection) {
          topConnection.namePrice = topConnection.name + " " + topConnection.price + "€";
          return topConnection;
        } else {
          return null;
        }
      })
    );
  }

  getClutches(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanTrailerConfig/trailers/${id}/clutches`).pipe(
      map((clutches: ConfigurationItem[]) => {
        for (const clutch of clutches){
          clutch.namePrice = clutch.name + " " + clutch.price + "€"
        }
        return clutches;
      })
    );
  }

  getDrawHead(id: number): Observable<ConfigurationItem | null>{
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/drawhead`).pipe(
      map((drawHead: ConfigurationItem | null) => {
        if (drawHead) {
          drawHead.namePrice = drawHead.name + " " + drawHead.price + "€";
          return drawHead;
        } else {
          return null;
        }
      })
    );
  }

  getDrawbars(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanTrailerConfig/trailers/${id}/drawbars`).pipe(
      map((drawBars: ConfigurationItem[]) => {
        for (const drawBar of drawBars){
          drawBar.namePrice = drawBar.name + " " + drawBar.price + "€"
        }
        return drawBars;
      })
    );
  }

  getCardanShaft(id: number): Observable<ConfigurationItem | null>{
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/cardanshaft`).pipe(
      map((cardanShaft: ConfigurationItem | null) => {
        if (cardanShaft) {
          cardanShaft.namePrice = cardanShaft.name + " " + cardanShaft.price + "€";
          return cardanShaft;
        } else {
          return null;
        }
      })
    );
  }

  getBBox(id: number): Observable<ConfigurationItem | null>{
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/bbox`).pipe(
      map((bBox: ConfigurationItem | null) => {
        if (bBox) {
          bBox.namePrice = bBox.name + " " + bBox.price + "€";
          return bBox;
        } else {
          return null;
        }
      })
    );
  }

  getBaleTransportPlatform(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/baletransportplatform`).pipe(
      map((baleTransformPlatform: ConfigurationItem | null) => {
        if (baleTransformPlatform) {
          baleTransformPlatform.namePrice = baleTransformPlatform.name + " " + baleTransformPlatform.price + "€";
          return baleTransformPlatform;
        } else {
          return null;
        }
      })
    );
  }

  getCargoSpaceExtension(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/cargospaceextension`).pipe(
      map((cargoSpaceExtension: ConfigurationItem | null) => {
        if (cargoSpaceExtension) {
          cargoSpaceExtension.namePrice = cargoSpaceExtension.name + " " + cargoSpaceExtension.price + "€";
          return cargoSpaceExtension;
        } else {
          return null;
        }
      })
    );
  }

  getAxeHolder(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/axeholder`).pipe(
      map((axeHolder: ConfigurationItem | null) => {
        if (axeHolder) {
          axeHolder.namePrice = axeHolder.name + " " + axeHolder.price + "€";
          return axeHolder;
        } else {
          return null;
        }
      })
    );
  }

  getChainsawHolder(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/chainsawholder`).pipe(
      map((chainsawHolder: ConfigurationItem | null) => {
        if (chainsawHolder) {
          chainsawHolder.namePrice = chainsawHolder.name + " " + chainsawHolder.price + "€";
          return chainsawHolder;
        } else {
          return null;
        }
      })
    );
  }

  getFuelTankHolder(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/fueltankholder`).pipe(
      map((fueltankHolder: ConfigurationItem | null) => {
        if (fueltankHolder) {
          fueltankHolder.namePrice = fueltankHolder.name + " " + fueltankHolder.price + "€";
          return fueltankHolder;
        } else {
          return null;
        }
      })
    );
  }

  getToolBox(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/toolbox`).pipe(
      map((toolBox: ConfigurationItem | null) => {
        if (toolBox) {
          toolBox.namePrice = toolBox.name + " " + toolBox.price + "€";
          return toolBox;
        } else {
          return null;
        }
      })
    );
  }

  getPlato(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/plato`).pipe(
      map((plato: ConfigurationItem | null) => {
        if (plato) {
          plato.namePrice = plato.name + " " + plato.price + "€";
          return plato;
        } else {
          return null;
        }
      })
    );
  }

  getExtension(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/extension`).pipe(
      map((extension: ConfigurationItem | null) => {
        if (extension) {
          extension.namePrice = extension.name + " " + extension.price + "€";
          return extension;
        } else {
          return null;
        }
      })
    );
  }

  getHydraulicSupportLeg(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/hydraulicsupportleg`).pipe(
      map((hydraulicSupportLeg: ConfigurationItem | null) => {
        if (hydraulicSupportLeg) {
          hydraulicSupportLeg.namePrice = hydraulicSupportLeg.name + " " + hydraulicSupportLeg.price + "€";
          return hydraulicSupportLeg;
        } else {
          return null;
        }
      })
    );
  }

  getGrappleLocation(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/grapplelocation`).pipe(
      map((grappleLocation: ConfigurationItem | null) => {
        if (grappleLocation) {
          grappleLocation.namePrice = grappleLocation.name + " " + grappleLocation.price + "€";
          return grappleLocation;
        } else {
          return null;
        }
      })
    );
  }
}

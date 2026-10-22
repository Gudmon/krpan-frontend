import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { ConfigurationItem } from '../../../../../models/configuration-item';
import { formatConfigurationPrice } from '../../../../../utils/price.utils';

@Injectable({
  providedIn: 'root'
})
export class KrpanTrailerConfigService {
  //private url = 'http://localhost:5140';
  private url = 'https://calculator-app-api.azurewebsites.net';
  
  constructor(private httpClient: HttpClient) { }

  getTrailerConfiguration(id: number) {
    return forkJoin({
      hydraulicAdjustableChassis: this.getHydraulicAdjustableChassis(id),
      lamp: this.getLamp(id),
      wheelChock: this.getWheelChock(id),
      mechanicalAdjustableFrame: this.getMechanicalAdjustableFrame(id),
      drawbarSteering: this.getDrawbarSteering(id),
      supportLegs: this.getSupportLeg(id),
      propulsions: this.getPropulsions(id),
      adjustableDrive: this.getAdjustableDrive(id),
      tyres: this.getTyres(id),
      brakes: this.getBrakes(id),
      handBrake: this.getHandBrake(id),
      stanchions: this.getStanchions(id),
      clutches: this.getClutches(id),
      drawBars: this.getDrawbars(id),
      couplingDevices: this.getCouplingDevices(id),
      cardanShaft: this.getCardanShaft(id),
      bBox: this.getBBox(id),
      baleTransportPlatform: this.getBaleTransportPlatform(id),
      cargoSpaceExtension: this.getCargoSpaceExtension(id),
      axeHolder: this.getAxeHolder(id),
      chainsawHolder: this.getChainsawHolder(id),
      fuelTankHolder: this.getFuelTankHolder(id),
      toolBox: this.getToolBox(id),
      plato: this.getPlato(id),
      extension: this.getExtension(id),
      grappleLocation: this.getGrappleLocation(id)
    });
  }

  getHydraulicAdjustableChassis(id: number): Observable<ConfigurationItem | null>{
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/hydraulicadjustablechassis`).pipe(
      map((hydraulicAdjustableChassis: ConfigurationItem | null) => {
        if (hydraulicAdjustableChassis) {
          hydraulicAdjustableChassis.namePrice = formatConfigurationPrice(hydraulicAdjustableChassis);
          return hydraulicAdjustableChassis;
        } else {
          return null;
        }
      })
    );
  }

  getLamp(id: number): Observable<ConfigurationItem | null>{
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/lamp`).pipe(
      map((lamp: ConfigurationItem | null) => {
        if (lamp) {
          lamp.namePrice = formatConfigurationPrice(lamp);
          return lamp;
        } else {
          return null;
        }
      })
    );
  }

  getWheelChock(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/wheelchock`).pipe(
      map((wheelChock: ConfigurationItem | null) => {
        if (wheelChock) {
          wheelChock.namePrice = formatConfigurationPrice(wheelChock);
          return wheelChock;
        } else {
          return null;
        }
      })
    );
  }

  getMechanicalAdjustableFrame(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(
      `${this.url}/KrpanTrailerConfig/trailers/${id}/mechanicaladjustableframe`
    ).pipe(
      map((mechanicalAdjustableFrame: ConfigurationItem | null) => {
        if (mechanicalAdjustableFrame) {
          mechanicalAdjustableFrame.namePrice = formatConfigurationPrice(mechanicalAdjustableFrame);
          return mechanicalAdjustableFrame;
        } else {
          return null;
        }
      })
    );
  }

  getDrawbarSteering(id: number): Observable<ConfigurationItem | null>{
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/drawbarsteering`).pipe(
      map((drawbarSteering: ConfigurationItem | null) => {
        if (drawbarSteering) {
          drawbarSteering.namePrice = formatConfigurationPrice(drawbarSteering);
          return drawbarSteering;
        } else {
          return null;
        }
      })
    );
  }

  getSupportLeg(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanTrailerConfig/trailers/${id}/supportleg`).pipe(
      map((supportLegs) => supportLegs.map((supportLeg) => {
        supportLeg.namePrice = formatConfigurationPrice(supportLeg);
        return supportLeg;
      }))
    );
  }

  getPropulsions(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanTrailerConfig/trailers/${id}/propulsions`).pipe(
      map((propulsions: ConfigurationItem[]) => {
        for (const propulsion of propulsions){
          propulsion.namePrice = formatConfigurationPrice(propulsion)
        }
        return propulsions;
      })
    );
  }

  getAdjustableDrive(id: number): Observable<ConfigurationItem | null>{
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/adjustabledrive`).pipe(
      map((adjustableDrive: ConfigurationItem | null) => {
        if (adjustableDrive) {
          adjustableDrive.namePrice = formatConfigurationPrice(adjustableDrive);
          return adjustableDrive;
        } else {
          return null;
        }
      })
    );
  }

  getTyres(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanTrailerConfig/trailers/${id}/tyres`).pipe(
      map((stanchions: ConfigurationItem[]) => {
        for (const stanchion of stanchions){
          stanchion.namePrice = formatConfigurationPrice(stanchion)
        }
        return stanchions;
      })
    );
  }

  getBrakes(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanTrailerConfig/trailers/${id}/brakes`).pipe(
      map((brakes: ConfigurationItem[]) => {
        for (const brake of brakes){
          brake.namePrice = formatConfigurationPrice(brake)
        }    
        return brakes;
      })
    );
  }

  getHandBrake(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/handbrake`).pipe(
      map((handBrake: ConfigurationItem | null) => {
        if (handBrake) {
          handBrake.namePrice = formatConfigurationPrice(handBrake);
          return handBrake;
        } else {
          return null;
        }
      })
    );
  }

  getStanchions(id: number): Observable<ConfigurationItem[]> {
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanTrailerConfig/trailers/${id}/stanchions`).pipe(
      map((stanchions) => stanchions.map((stanchion) => {
        stanchion.namePrice = formatConfigurationPrice(stanchion);
        return stanchion;
      }))
    );
  }

  getClutches(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanTrailerConfig/trailers/${id}/clutches`).pipe(
      map((clutches: ConfigurationItem[]) => {
        for (const clutch of clutches){
          clutch.namePrice = formatConfigurationPrice(clutch)
        }
        return clutches;
      })
    );
  }

  getDrawbars(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanTrailerConfig/trailers/${id}/drawbars`).pipe(
      map((drawBars: ConfigurationItem[]) => {
        for (const drawBar of drawBars){
          drawBar.namePrice = formatConfigurationPrice(drawBar)
        }
        return drawBars;
      })
    );
  }

  getCouplingDevices(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanTrailerConfig/trailers/${id}/couplingdevices`).pipe(
      map((couplingDevices: ConfigurationItem[]) => {
        for (const couplingDevice of couplingDevices){
          couplingDevice.namePrice = formatConfigurationPrice(couplingDevice)
        }
        return couplingDevices;
      })
    );
  }

  getCardanShaft(id: number): Observable<ConfigurationItem | null>{
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanTrailerConfig/trailers/${id}/cardanshaft`).pipe(
      map((cardanShaft: ConfigurationItem | null) => {
        if (cardanShaft) {
          cardanShaft.namePrice = formatConfigurationPrice(cardanShaft);
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
          bBox.namePrice = formatConfigurationPrice(bBox);
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
          baleTransformPlatform.namePrice = formatConfigurationPrice(baleTransformPlatform);
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
          cargoSpaceExtension.namePrice = formatConfigurationPrice(cargoSpaceExtension);
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
          axeHolder.namePrice = formatConfigurationPrice(axeHolder);
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
          chainsawHolder.namePrice = formatConfigurationPrice(chainsawHolder);
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
          fueltankHolder.namePrice = formatConfigurationPrice(fueltankHolder);
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
          toolBox.namePrice = formatConfigurationPrice(toolBox);
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
          plato.namePrice = formatConfigurationPrice(plato);
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
          extension.namePrice = formatConfigurationPrice(extension);
          return extension;
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
          grappleLocation.namePrice = formatConfigurationPrice(grappleLocation);
          return grappleLocation;
        } else {
          return null;
        }
      })
    );
  }
}

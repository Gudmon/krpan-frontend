import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ConfigurationItem } from '../../../../../models/configuration-item';
import { FrameType } from '../models/frame-type';

@Injectable({
  providedIn: 'root'
})
export class KrpanCraneConfigService {
  //private url = 'http://localhost:5140';
  private url = 'https://calculator-app-api.azurewebsites.net';

  constructor(private httpClient: HttpClient) { }

  getFrameTypesForTrailerCrane(trailerId: number, craneId: number): Observable<ConfigurationItem[]> {
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/${trailerId}/cranes/${craneId}/availableFrameTypes`);
  }

  getControlBlocks(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/controlblocks`).pipe(
      map((controlBlocks: ConfigurationItem[]) => {
        for (const controlBlock of controlBlocks){
          controlBlock.disabledOption = false;
          controlBlock.namePrice = controlBlock.name + " " + controlBlock.price + "€"
          controlBlock.imgUrl = `../../../../../../assets/KRPAN crane-controlblock-${controlBlock.id}.jpg`;
        }
        return controlBlocks;
      })
    );
  }

  getFrameTypes(id: number): Observable<FrameType[]>{
    return this.httpClient.get<FrameType[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/frametypes`).pipe(
      map((frameTypes: FrameType[]) => {
        for (const frameType of frameTypes){  
          frameType.disabledOption = false;
          frameType.namePrice = frameType.name + " " + frameType.price + "€"

          if (frameType.id === 6 || frameType.id === 9 || frameType.id === 11){       
            frameType.imgUrl = `../../../../../../assets/KRPAN crane-frametype-${frameType.id}.svg`
          } 
          else if (frameType.id === 8){
            frameType.imgUrls = [`../../../../../../assets/KRPAN crane-frametype-${frameType.id}.jpg`, `../../../../../../assets/KRPAN crane-frametype-${frameType.id}-1.jpg`] 
          }
          else {
            frameType.imgUrls = [`../../../../../../assets/KRPAN crane-frametype-${frameType.id}.svg`, `../../../../../../assets/KRPAN crane-frametype-${frameType.id}-1.jpg`] 
          }

        }
        return frameTypes;
      })
    );
  }

  getControlBlocksByCraneFrameType(craneId: number, frameTypeId: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${craneId}/${frameTypeId}/controlblocks`).pipe(
      map((controlBlocks: ConfigurationItem[]) => {
        for (const controlBlock of controlBlocks){
          controlBlock.namePrice = controlBlock.name + " " + controlBlock.price + "€"
          controlBlock.imgUrl = `../../../../../../assets/KRPAN crane-controlblock-${controlBlock.id}.svg`;
        }
        return controlBlocks;
      })
    );
  }

  getRotators(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/rotators`).pipe(
      map((rotators: ConfigurationItem[]) => {
        for (const rotator of rotators){
          rotator.disabledOption = false;
          rotator.namePrice = rotator.name + " " + rotator.price + "€"
          rotator.imgUrls = [`../../../../../../assets/KRPAN crane-rotator-${rotator.id}.svg`, `../../../../../../assets/KRPAN crane-rotator-${rotator.id}-1.jpg`]
        }
        return rotators;
      })
    );
  }

  getGrapples(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/grapples`).pipe(
      map((grapples: ConfigurationItem[]) => {
        for (const grapple of grapples){
          grapple.disabledOption = false;
          grapple.namePrice = grapple.name + " " + grapple.price + "€"
          grapple.imgUrl = `../../../../../../assets/KRPAN crane-grapple-${grapple.id}.jpg`;
        }
        return grapples;
      })
    );
  }

  getWinches(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/winches`).pipe(
      map((winches: ConfigurationItem[]) => {
        for (const winch of winches){
          winch.disabledOption = false;
          winch.namePrice = winch.name + " " + winch.price + "€"
          winch.imgUrl = `../../../../../../assets/KRPAN crane-grapple-${winch.id}.jpg`;
        }
        return winches;
      })
    );
  }

  getProtectionSleeves(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/protectionsleeves`).pipe(
      map((protectionSleeves: ConfigurationItem | null) => {
        if (protectionSleeves) {
          protectionSleeves.namePrice = protectionSleeves.name + " " + protectionSleeves.price + "€";
          return protectionSleeves;
        } else {
          return null;
        }
      })
    );
  }

  getElectricalFloating(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/electricalfloating`).pipe(
      map((electricalFloating: ConfigurationItem | null) => {
        if (electricalFloating) {
          electricalFloating.namePrice = electricalFloating.name + " " + electricalFloating.price + "€";
          return electricalFloating;
        } else {
          return null;
        }
      })
    );
  }

  getValveBlock(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/valveBlock`).pipe(
      map((valveBlock: ConfigurationItem | null) => {
        if (valveBlock) {
          valveBlock.namePrice = valveBlock.name + " " + valveBlock.price + "€";
          return valveBlock;
        } else {
          return null;
        }
      })
    );
  }

  getDampings(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/dampings`).pipe(
      map((dampings: ConfigurationItem[]) => {
        for (const damping of dampings){
          damping.disabledOption = false;
          damping.namePrice = damping.name + " " + damping.price + "€";
        }
        return dampings;
      })
    );
  }

  getLight(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/light`).pipe(
      map((light: ConfigurationItem | null) => {
        if (light) {
          light.namePrice = light.name + " " + light.price + "€";
          return light;
        } else {
          return null;
        }
      })
    );
  }

  getOperatorSeat(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/operatorseat`).pipe(
      map((operatorSeat: ConfigurationItem | null) => {
        if (operatorSeat) {
          operatorSeat.namePrice = operatorSeat.name + " " + operatorSeat.price + "€";
          return operatorSeat;
        } else {
          return null;
        }
      })
    );
  }

  getOilCooler(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/oilcooler`).pipe(
      map((oilcooler: ConfigurationItem | null) => {
        if (oilcooler) {
          oilcooler.namePrice = oilcooler.name + " " + oilcooler.price + "€";
          return oilcooler;
        } else {
          return null;
        }
      })
    );
  }

  getRotatorBrakes(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/rotatorbrakes`).pipe(
      map((rotatorBrakes: ConfigurationItem[]) => {
        for (const rotatorBrake of rotatorBrakes){
          rotatorBrake.disabledOption = false;
          rotatorBrake.namePrice = rotatorBrake.name + " " + rotatorBrake.price + "€";
          if (rotatorBrake.id === 2 || rotatorBrake.id === 3) rotatorBrake.imgUrl = `../../../../../../assets/KRPAN crane-rotatorbrake-2.jpg`;
          else if (rotatorBrake.id === 4 || rotatorBrake.id === 5) rotatorBrake.imgUrl = `../../../../../../assets/KRPAN crane-rotatorbrake-3.jpg`;
          
        }
        return rotatorBrakes;
      })
    );
  }

  getJoystickHolder(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/joystickholder`).pipe(
      map((joystickHolder: ConfigurationItem | null) => {
        if (joystickHolder) {
          joystickHolder.namePrice = joystickHolder.name + " " + joystickHolder.price + "€";
          return joystickHolder;
        } else {
          return null;
        }
      })
    );
  }

  getHoseGuards(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/hoseguards`).pipe(
      map((hoseGuards: ConfigurationItem[]) => {
        for (const hoseGuard of hoseGuards){
          hoseGuard.disabledOption = false;
          hoseGuard.namePrice = hoseGuard.name + " " + hoseGuard.price + "€";
        }
        return hoseGuards;
      })
    );
  }

  getTurningDeviceCounterPlate(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/turningdevicecounterplate`).pipe(
      map((turningDeviceCounterPlate: ConfigurationItem | null) => {
        if (turningDeviceCounterPlate) {
          turningDeviceCounterPlate.namePrice = turningDeviceCounterPlate.name + " " + turningDeviceCounterPlate.price + "€";
          return turningDeviceCounterPlate;
        } else {
          return null;
        }
      })
    );
  }

  getSupportLegCounterPlate(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/supportlegcounterplate`).pipe(
      map((supportLegCounterPlate: ConfigurationItem | null) => {
        if (supportLegCounterPlate) {
          supportLegCounterPlate.namePrice = supportLegCounterPlate.name + " " + supportLegCounterPlate.price + "€";
          return supportLegCounterPlate;
        } else {
          return null;
        }
      })
    );
  }

  getBoomGuard(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/boomguard`).pipe(
      map((boomGuard: ConfigurationItem | null) => {
        if (boomGuard) {
          boomGuard.namePrice = boomGuard.name + " " + boomGuard.price + "€";
          boomGuard.imgUrl = `../../../../../../assets/KRPAN crane-boomguard-${boomGuard.id}.jpg`;
          return boomGuard;
        } else {
          return null;
        }
      })
    );
  }

  getCover(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/cover`).pipe(
      map((cover: ConfigurationItem | null) => {
        if (cover) {
          cover.namePrice = cover.name + " " + cover.price + "€";
          return cover;
        } else {
          return null;
        }
      })
    );
  }

  getWoodControl(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/woodcontrol`).pipe(
      map((woodControl: ConfigurationItem | null) => {
        if (woodControl) {
          woodControl.namePrice = woodControl.name + " " + woodControl.price + "€";
          return woodControl;
        } else {
          return null;
        }
      })
    );
  }

  getLinkage(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/linkage`).pipe(
      map((linkage: ConfigurationItem | null) => {
        if (linkage) {
          linkage.namePrice = linkage.name + " " + linkage.price + "€";
          return linkage;
        } else {
          return null;
        }
      })
    );
  }

  getShipping(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/shipping`).pipe(
      map((shipping: ConfigurationItem | null) => {
        if (shipping) {
          shipping.namePrice = shipping.name + " " + shipping.price + "€";
          return shipping;
        } else {
          return null;
        }
      })
    );
  }
}

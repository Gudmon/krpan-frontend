import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { KrpanTrailer } from '../../trailers/models/krpan-trailer';
import { KrpanCraneOverview } from '../../cranes/models/krpan-crane-overview';
import { KrpanCrane } from '../../cranes/models/krpan-crane';
import { ConfigurationItem } from '../../../../../models/configuration-item';
import { KrpanTrailerOverview } from '../../trailers/models/krpan-trailer-overview';
@Injectable({
  providedIn: 'root'
})
export class KrpanService {
  //private url = 'http://localhost:5140';
  private url = 'https://calculator-app-api.azurewebsites.net';

  public _selectedMachineType = new BehaviorSubject<number | null>(null);
  public selectedMachineType$ = this._selectedMachineType.asObservable();

  public _selectedChassisType = new BehaviorSubject<number | null>(null);
  public selectedChassisType$ = this._selectedChassisType.asObservable();

  public _trailerPrice = signal<number>(0);
  public _cranePrice = signal<number>(0);

  public _selectedCrane = new BehaviorSubject<KrpanCraneOverview | undefined>(undefined);
  public selectedCrane$ = this._selectedCrane.asObservable();

  public _selectedTrailer = new BehaviorSubject<KrpanTrailerOverview | undefined>(undefined);
  public selectedTrailer$ = this._selectedTrailer.asObservable();

  public _selectedAccordion = signal(0);

  public _deleteCrane = new BehaviorSubject<boolean>(false);
  public deleteCrane$ = this._deleteCrane.asObservable();

  public _deleteTrailer = new BehaviorSubject<boolean>(false);
  public deleteTrailer$ = this._deleteTrailer.asObservable();

  public _craneSelected = new BehaviorSubject<boolean>(false);
  public craneSelected$ = this._craneSelected.asObservable();

  public _trailerSelected = new BehaviorSubject<boolean>(false);
  public trailerSelected$ = this._trailerSelected.asObservable();

  public _totalPrice = computed(() => this._trailerPrice() + this._cranePrice());

  videos = new Map<string, string[]>();

  // CRANES
  public selectedControlBlock = signal<ConfigurationItem | undefined>(undefined);
  public selectedFrameType = signal<ConfigurationItem | undefined>(undefined);
  public selectedRotator = signal<ConfigurationItem | undefined>(undefined);
  public selectedGrapple = signal<ConfigurationItem | undefined>(undefined);
  public selectedGrapples: (ConfigurationItem | undefined)[] = [];
  public selectedWinch = signal<ConfigurationItem | undefined>(undefined);
  public selectedProtectionSleeves = signal<ConfigurationItem | undefined>(undefined);
  public selectedElectricalFloating = signal<ConfigurationItem | undefined>(undefined);
  public selectedValveBlock = signal<ConfigurationItem | undefined>(undefined);
  public selectedDamping = signal<ConfigurationItem | undefined>(undefined);
  public selectedCraneLight = signal<ConfigurationItem | undefined>(undefined);
  public selectedOperatorSeat = signal<ConfigurationItem | undefined>(undefined);
  public selectedCraneOilCooler = signal<ConfigurationItem | undefined>(undefined);
  public selectedRotatorBrake = signal<ConfigurationItem | undefined>(undefined);
  public selectedJoystickHolder = signal<ConfigurationItem | undefined>(undefined);
  public selectedHoseGuard = signal<ConfigurationItem | undefined>(undefined);
  public selectedTurningDeviceCounterPlate = signal<ConfigurationItem | undefined>(undefined);
  public selectedSupportLegCounterPlate = signal<ConfigurationItem | undefined>(undefined);
  public selectedBoomGuard = signal<ConfigurationItem | undefined>(undefined);
  public selectedCover = signal<ConfigurationItem | undefined>(undefined);
  public selectedWoodControl = signal<ConfigurationItem | undefined>(undefined);
  public selectedLinkage = signal<ConfigurationItem | undefined>(undefined);
  public selectedCraneShipping = signal<ConfigurationItem | undefined>(undefined);

  // TRAILERS
  public selectedStanchion = signal<ConfigurationItem | undefined>(undefined);
  public selectedBrake = signal<ConfigurationItem | undefined>(undefined);
  public selectedPropulsion = signal<ConfigurationItem | undefined>(undefined);
  public selectedDrawbar = signal<ConfigurationItem | undefined>(undefined);
  public selectedPlatform = signal<ConfigurationItem | undefined>(undefined);
  public selectedOilPump = signal<ConfigurationItem | undefined>(undefined);
  public selectedOilTank = signal<ConfigurationItem | undefined>(undefined);
  public selectedTrailerOilCooler = signal<ConfigurationItem | undefined>(undefined);
  public selectedSupportLeg = signal<ConfigurationItem | undefined>(undefined);
  public selectedTrailerLight = signal<ConfigurationItem | undefined>(undefined);
  public selectedTyre = signal<ConfigurationItem | undefined>(undefined);
  public selectedBolsterLock = signal<ConfigurationItem | undefined>(undefined);
  public selectedBBox = signal<ConfigurationItem | undefined>(undefined);
  public selectedWoodSorter = signal<ConfigurationItem | undefined>(undefined);
  public selectedHandBrake = signal<ConfigurationItem | undefined>(undefined);
  public selectedChainsawHolder = signal<ConfigurationItem | undefined>(undefined);
  public selectedUnderrunProtection = signal<ConfigurationItem | undefined>(undefined);
  public selectedBunkAdapter = signal<ConfigurationItem | undefined>(undefined);
  public selectedBunkExtension = signal<ConfigurationItem | undefined>(undefined);
  public selectedFrameExtension = signal<ConfigurationItem | undefined>(undefined);
  public selectedTrailerShipping = signal<ConfigurationItem | undefined>(undefined);
  public selectedMOT = signal<ConfigurationItem | undefined>(undefined);
  public selectedStanchionExtension = signal<ConfigurationItem | undefined>(undefined);
  public selectedHydroPack = signal<ConfigurationItem | undefined>(undefined);

  constructor(private httpClient: HttpClient) { }
  
  getTrailers(): Observable<KrpanTrailerOverview[]> {
    return this.httpClient.get<KrpanTrailerOverview[]>(`${this.url}/Krpan/trailers`).pipe(
        map((trailerOvewViews: KrpanTrailerOverview[]) => {
            for (const trailerOvewView of trailerOvewViews) {
              
              if(trailerOvewView.id === 12 || trailerOvewView.id === 13) trailerOvewView.imgUrl = `../../../../../assets/Krpan 10U-1.svg`;
              else if(trailerOvewView.id === 14 || trailerOvewView.id === 15 || trailerOvewView.id === 16) trailerOvewView.imgUrl = `../../../../../assets/Krpan 12U-1.svg`;
              else if(trailerOvewView.id === 17 || trailerOvewView.id === 18 || trailerOvewView.id === 19) trailerOvewView.imgUrl = `../../../../../assets/Krpan 15U-1.svg`;
              else trailerOvewView.imgUrl = `../../../../../assets/${trailerOvewView.name}-1.svg`;
            }  
            return trailerOvewViews;
        })
    );
}

  getTrailer(id: number): Observable<KrpanTrailer>{
    this.setVideos(); 
    
    return this.httpClient.get<KrpanTrailer>(`${this.url}/Krpan/trailers/${id}`).pipe(
      map((trailer: KrpanTrailer) => {
        trailer.videoIds = this.getVideosByKey(trailer.name)
        if(trailer.id === 12 || trailer.id === 13) trailer.imgUrls = [`../../../../../assets/Krpan 10U-1.svg`, `../../../../../assets/Krpan 10U-2.jpg`];
        else if(trailer.id === 14 || trailer.id === 15 || trailer.id === 16) trailer.imgUrls = [`../../../../../assets/Krpan 12U-1.svg`, `../../../../../assets/Krpan 12U-2.jpg`];
        else if(trailer.id === 17 || trailer.id === 18 || trailer.id === 19) trailer.imgUrls = [`../../../../../assets/Krpan 15U-1.svg`, `../../../../../assets/Krpan 15U-2.jpg`];
        else {
          trailer.imgUrls = [`../../../../../assets/${trailer.name}-1.svg`, `../../../../../assets/${trailer.name}-2.jpg`]
        }
        for (const crane of trailer.crane){
          crane.imgUrl = `../../../../../assets/${crane.name}-1.svg`
        }
        //this._selectedTrailer.next(trailer);
        
        return trailer;
      })
  
    );
  }

  getCranes(): Observable<KrpanCraneOverview[]>{
    return this.httpClient.get<KrpanCraneOverview[]>(`${this.url}/Krpan/cranes`).pipe(
      map((craneOverViews: KrpanCraneOverview[]) => {
        for (const craneOverView of craneOverViews) {
          craneOverView.imgUrl = `../../../../../assets/${craneOverView.name}-1.svg`;
        }
        return craneOverViews;
      })
    );
  }

  getCrane(id: number): Observable<KrpanCrane>{
    this.setVideos();

    return this.httpClient.get<KrpanCrane>(`${this.url}/Krpan/cranes/${id}`).pipe(
      map((crane: KrpanCrane) => {
        crane.videoIds = this.getVideosByKey(crane.name)
        //this._selectedCrane.next(crane);
        crane.imgUrls = [`../../../../../assets/${crane.name}-1.svg`, `../../../../../assets/${crane.name}-2.jpg`]
        for (const trailer of crane.trailer){
          if(trailer.id === 12 || trailer.id === 13) trailer.imgUrl = `../../../../../assets/Krpan 10U-1.svg`;
          else if(trailer.id === 14 || trailer.id === 15 || trailer.id === 16) trailer.imgUrl = `../../../../../assets/Krpan 12U-1.svg`;
          else if(trailer.id === 17 || trailer.id === 18 || trailer.id === 19) trailer.imgUrl = `../../../../../assets/Krpan 15U-1.svg`;
          else {
            trailer.imgUrl = `../../../../../assets/${trailer.name}-1.svg`;
          }
        }
        return crane;
      })
    );
  }

  getVideosByKey(key: string): string[] | undefined {
    return this.videos.get(key);
  }

  setVideos(){
    // trailers
    this.videos.set("Krpan 6S", ["5-tqIrDOU0I", "OUXj3T4seD0"]);
    this.videos.set("Krpan 8SX", ["VEvGOG-aFyM"]);
    this.videos.set("Krpan 8D", ["cdz1OF0USqI"]);
    this.videos.set("Krpan 8DWD", ["cdz1OF0USqI"]);
    this.videos.set("Krpan 9SC", ["4ZeFp4Yofak"]);
    this.videos.set("Krpan 10D", ["0u8VqxRevL4"]);
    this.videos.set("Krpan 10DWD", ["0u8VqxRevL4"]);
    this.videos.set("Krpan 12U", ["akmzrXf3EnU"]);
    this.videos.set("Krpan 12UWD", ["akmzrXf3EnU"]);
    this.videos.set("Krpan 12UAWD", ["akmzrXf3EnU"]);
    this.videos.set("Krpan 15U", ["cH3t306elVs"]);
    this.videos.set("Krpan 15UWD", ["cH3t306elVs"]);
    this.videos.set("Krpan 15UAWD", ["cH3t306elVs"]);

    // cranes
    this.videos.set("Krpan 2.42", ["fEDDjo_K3E8"]);
    this.videos.set("Krpan 2.54", ["fEDDjo_K3E8", "OUXj3T4seD0"]);
    this.videos.set("Krpan 3.63", ["z9VS2BuQwvM"]);
    this.videos.set("Krpan 3.67", ["z9VS2BuQwvM"]);
    this.videos.set("Krpan 4.71", ["NYLCfmf-Nfc"]);
    this.videos.set("Krpan 5.72", ["-f0tPn8V78g"]);
    this.videos.set("Krpan 5.85", ["-f0tPn8V78g"]);
    this.videos.set("Krpan 5.87Z", ["pLvH1NAPEzI"]);
    this.videos.set("Krpan 7.75", ["z55HswaDwSA"]);
    this.videos.set("Krpan 7.86", ["z55HswaDwSA"]);
    this.videos.set("Krpan 7.94", ["z55HswaDwSA"]);
    this.videos.set("Krpan X100", ["x9GnpJnvNVU"]);
  }

  deleteTrailer(){
    this.selectedStanchion.set(undefined);
    this.selectedBrake.set(undefined);
    this.selectedPropulsion.set(undefined);
    this.selectedDrawbar.set(undefined);
    this.selectedPlatform.set(undefined);
    this.selectedOilPump.set(undefined);
    this.selectedOilTank.set(undefined);
    this.selectedTrailerOilCooler.set(undefined);
    this.selectedSupportLeg.set(undefined);
    this.selectedTrailerLight.set(undefined);
    this.selectedTyre.set(undefined);
    this.selectedBolsterLock.set(undefined);
    this.selectedBBox.set(undefined);
    this.selectedWoodControl.set(undefined);
    this.selectedHandBrake.set(undefined);
    this.selectedChainsawHolder.set(undefined);
    this.selectedUnderrunProtection.set(undefined);
    this.selectedBunkAdapter.set(undefined);
    this.selectedBunkExtension.set(undefined);
    this.selectedFrameExtension.set(undefined);
    this.selectedTrailerShipping.set(undefined);
    this.selectedMOT.set(undefined);
    this.selectedStanchionExtension.set(undefined);
    this.selectedHydroPack.set(undefined);
  }

  deleteCrane(){
    this.selectedControlBlock.set(undefined);
    this.selectedFrameType.set(undefined);
    this.selectedRotator.set(undefined);
    this.selectedGrapple.set(undefined);
    this.selectedGrapples = [];
    this.selectedWinch.set(undefined);
    this.selectedProtectionSleeves.set(undefined);
    this.selectedElectricalFloating.set(undefined);
    this.selectedValveBlock.set(undefined);
    this.selectedDamping.set(undefined);
    this.selectedCraneLight.set(undefined);
    this.selectedOperatorSeat.set(undefined);
    this.selectedCraneOilCooler.set(undefined);
    this.selectedRotatorBrake.set(undefined);
    this.selectedJoystickHolder.set(undefined);
    this.selectedHoseGuard.set(undefined);
    this.selectedTurningDeviceCounterPlate.set(undefined);
    this.selectedSupportLegCounterPlate.set(undefined);
    this.selectedBoomGuard.set(undefined);
    this.selectedCover.set(undefined);
    this.selectedWoodControl.set(undefined);
    this.selectedLinkage.set(undefined);
    this.selectedCraneShipping.set(undefined);
  }
}

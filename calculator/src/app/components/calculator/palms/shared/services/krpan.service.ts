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
  public selectedHydraulicAdjustableChassis = signal<ConfigurationItem | undefined>(undefined);
  public selectedLamp = signal<ConfigurationItem | undefined>(undefined);
  public selectedChock = signal<ConfigurationItem | undefined>(undefined);
  public selectedDrawbarSteering = signal<ConfigurationItem | undefined>(undefined);
  public selectedSupportLeg = signal<ConfigurationItem | undefined>(undefined);
  public selectedPropulsion = signal<ConfigurationItem | undefined>(undefined);
  public selectedAdjustableDrive = signal<ConfigurationItem | undefined>(undefined);
  public selectedTyre = signal<ConfigurationItem | undefined>(undefined);
  public selectedBrake = signal<ConfigurationItem | undefined>(undefined);
  public selectedHandBrake = signal<ConfigurationItem | undefined>(undefined);
  public selectedExtraStanchion = signal<ConfigurationItem | undefined>(undefined);
  public selectedExtraForwarderStanchion = signal<ConfigurationItem | undefined>(undefined);
  public selectedTopConnection = signal<ConfigurationItem | undefined>(undefined);
  public selectedClutch = signal<ConfigurationItem | undefined>(undefined);
  public selectedDrawHead = signal<ConfigurationItem | undefined>(undefined);
  public selectedDrawbar = signal<ConfigurationItem | undefined>(undefined);
  public selectedCardanShaft = signal<ConfigurationItem | undefined>(undefined);
  public selectedBBox = signal<ConfigurationItem | undefined>(undefined);
  public selectedBaleTransportPlatform = signal<ConfigurationItem | undefined>(undefined);
  public selectedCargoSpaceExtension = signal<ConfigurationItem | undefined>(undefined);
  public selectedAxeHolder = signal<ConfigurationItem | undefined>(undefined);
  public selectedChainsawHolder = signal<ConfigurationItem | undefined>(undefined);
  public selectedFuelTankHolder = signal<ConfigurationItem | undefined>(undefined);
  public selectedToolBox = signal<ConfigurationItem | undefined>(undefined);
  public selectedPlato = signal<ConfigurationItem | undefined>(undefined);
  public selectedExtension = signal<ConfigurationItem | undefined>(undefined);
  public selectedHydraulicSupportLeg = signal<ConfigurationItem | undefined>(undefined);
  public selectedGrappleLocation = signal<ConfigurationItem | undefined>(undefined);

  public selectedTrailerShipping = signal<ConfigurationItem | undefined>(undefined);
  public selectedMOT = signal<ConfigurationItem | undefined>(undefined);

  constructor(private httpClient: HttpClient) { }
  
  getTrailers(): Observable<KrpanTrailerOverview[]> {
    return this.httpClient.get<KrpanTrailerOverview[]>(`${this.url}/Krpan/trailers`).pipe(
        map((trailerOvewViews: KrpanTrailerOverview[]) => {
            for (const trailerOvewView of trailerOvewViews) {
               trailerOvewView.imgUrl = `../../../../../assets/${trailerOvewView.name}-1-card.jpg`;
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
        trailer.imgUrls = [`../../../../../assets/${trailer.name}-1.jpg`]
       
        for (const crane of trailer.krpanCrane){
          crane.imgUrl = `../../../../../assets/${crane.name}-1.jpg`
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
          craneOverView.imgUrl = `../../../../../assets/${craneOverView.name}-1.jpg`;
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
        crane.imgUrls = [`../../../../../assets/${crane.name}-1.jpg`]
        for (const trailer of crane.krpanTrailer){
            trailer.imgUrl = `../../../../../assets/${trailer.name}-1.jpg`;
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

    // cranes
    this.videos.set("Krpan 2.42", ["fEDDjo_K3E8"]);
  }

  deleteTrailer(){
    this.selectedHydraulicAdjustableChassis.set(undefined);
    this.selectedLamp.set(undefined);
    this.selectedDrawbarSteering.set(undefined);
    this.selectedLamp.set(undefined);
    this.selectedSupportLeg.set(undefined);
    this.selectedTyre.set(undefined);
    this.selectedBrake.set(undefined);
    this.selectedHandBrake.set(undefined);
    this.selectedPropulsion.set(undefined);
    this.selectedAdjustableDrive.set(undefined);
    this.selectedTopConnection.set(undefined);
    this.selectedClutch.set(undefined);
    this.selectedDrawHead.set(undefined);
    this.selectedDrawbar.set(undefined);
    this.selectedCardanShaft.set(undefined);
    this.selectedBBox.set(undefined);
    this.selectedBaleTransportPlatform.set(undefined);
    this.selectedAxeHolder.set(undefined);
    this.selectedChainsawHolder.set(undefined);
    this.selectedFuelTankHolder.set(undefined);
    this.selectedToolBox.set(undefined);
    this.selectedPlato.set(undefined);
    this.selectedExtension.set(undefined);
    this.selectedHydraulicSupportLeg.set(undefined);
    this.selectedGrappleLocation.set(undefined);
    
    this.selectedTrailerShipping.set(undefined);
    this.selectedMOT.set(undefined);
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

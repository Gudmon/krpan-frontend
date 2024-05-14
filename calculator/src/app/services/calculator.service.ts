import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  public _price = new BehaviorSubject<number>(0);
  public price$ = this._price.asObservable();

  public _selectedTab = new BehaviorSubject<number | null>(null);
  public selectedTab$ = this._selectedTab.asObservable();

  public _attachCalculation = new BehaviorSubject<boolean>(false);
  public attachCalculation$ = this._attachCalculation.asObservable();
}

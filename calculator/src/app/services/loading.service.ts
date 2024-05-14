import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly _status = new BehaviorSubject<boolean>(false);
  status$ = this._status.asObservable();
  private counter = 0;

  public enableLoader(): void {
    setTimeout(() => {
      this.counter++;
      this._status.next(true); 
    });
  }

  public disableLoader(): void {
    setTimeout(() => {
      this.counter--;
      if (this.counter === 0) this._status.next(false); 
    });
  }
}

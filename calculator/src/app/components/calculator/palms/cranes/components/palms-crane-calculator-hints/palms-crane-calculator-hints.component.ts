import { InputSwitchModule } from 'primeng/inputswitch';
import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { FormsModule } from '@angular/forms';
import { HintItem } from '../../../shared/models/hint-item';

@Component({
  selector: 'app-palms-crane-calculator-hints',
  standalone: true,
  imports: [TimelineModule, CardModule, CommonModule, InputSwitchModule, FormsModule],
  templateUrl: './palms-crane-calculator-hints.component.html',
  styleUrl: './palms-crane-calculator-hints.component.css'
})
export class PalmsCraneCalculatorHintsComponent {
  hints: HintItem[];

  constructor() {
      this.hints = [
          { title: 'Daru konfigurálása', description: 'Válassza ki a kívánt elemeket' },
          { title: 'Pótkocsi konfigurálása (opcionális)', description: 'Amennyiben szeretné, a daruhoz illeszthető pótkocsi konfigurálását is elvégezheti a "Kiválaszt" gombra kattintva' },
          { title: 'Információ az elemekről', description: 'Az adott elem(ek)ről további infomációt találhat, amennyiben rákattint az "i" gombra' },
          { title: 'PDF mentés', description: 'Kalkulációját elmentheti a "Mentés PDF-ben" gombra kattintva' },
          { title: 'Üzenet küldés', description: 'Sikeres PDF mentés után üzenhet nekünk' },
          { title: 'Új konfiguráció', description: '"Törlés" gombra kattintva törölheti a darut vagy pótkocsit' },
      ];
  }
}

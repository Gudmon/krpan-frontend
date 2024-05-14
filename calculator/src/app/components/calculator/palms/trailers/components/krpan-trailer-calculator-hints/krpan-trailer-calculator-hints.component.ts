import { InputSwitchModule } from 'primeng/inputswitch';
import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { FormsModule } from '@angular/forms';
import { HintItem } from '../../../shared/models/hint-item';

@Component({
  selector: 'app-krpan-trailer-calculator-hints',
  standalone: true,
  imports: [TimelineModule, CardModule, CommonModule, InputSwitchModule, FormsModule],
  templateUrl: './krpan-trailer-calculator-hints.component.html',
  styleUrl: './krpan-trailer-calculator-hints.component.css'
})
export class KrpanTrailerCalculatorHintsComponent {
  hints: HintItem[];

    constructor() {
        this.hints = [
            { title: 'Pótkocsi konfigurálása', description: 'Válassza ki a kívánt elemeket' },
            { title: 'Daru konfigurálása (opcionális)', description: 'Amennyiben szeretné, a pótkocsihoz illeszthető daru konfigurálását is elvégezheti a "Kiválaszt" gombra kattintva' },
            { title: 'Információ az elemekről', description: 'Az adott elem(ek)ről további infomációt találhat, amennyiben rákattint az "i" gombra' },
            { title: 'PDF mentés', description: 'Kalkulációját elmentheti a "Mentés PDF-ben" gombra kattintva' },
            { title: 'Üzenet küldés', description: 'Sikeres PDF mentés után üzenhet nekünk' },
            { title: 'Új konfiguráció', description: '"Törlés" gombra kattintva törölheti a pótkocsit vagy darut' },
        ];
    }
}



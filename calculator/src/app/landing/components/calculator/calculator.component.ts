import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [TimelineModule, CardModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  constructor(readonly router: Router){}

  navigateToPalmsCalculator(){
    this.router.navigate(['calculator/palms']);
  }
}

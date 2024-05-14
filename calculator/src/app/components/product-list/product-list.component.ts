import { Component, OnInit } from '@angular/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [SelectButtonModule, FormsModule, CarouselModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  vehicleTypes: any[] = [];
  value!: number;
  
  ngOnInit(): void {
    this.setVehicleTypes();
  }

  private setVehicleTypes(){
    this.vehicleTypes = [
      { name: 'Daruk', value: 1 },
      { name: 'Pótkocsik', value: 2 },
      { name: 'Közelítő pótkocsik', value: 3 }
    ];
  }
}

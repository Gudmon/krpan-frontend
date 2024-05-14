import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements OnInit {
  zoom = 15;
  center!: google.maps.LatLngLiteral | google.maps.LatLng;
  markerPositions: { position: google.maps.LatLngLiteral, title: string }[] = [];
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 17,
    minZoom: 8,
  };

  ngOnInit() {
    this.center = {
      lat: 47.31945245397667,
      lng: 19.17434739471034
    }

    this.markerPositions.push({ position: { lat: 47.31945245397667, lng: 19.17434739471034 }, title: 'Clear-globe Kft.' });
    //this.markerPositions.push({ position: { lat: 47.31949245397668, lng: 19.17439739471035 }, title: 'asd' });
  }
 
  zoomIn() {
    if (this.zoom < this.options.maxZoom!) this.zoom++;
  }
 
  zoomOut() {
    if (this.zoom > this.options.minZoom!) this.zoom--;
  }
}

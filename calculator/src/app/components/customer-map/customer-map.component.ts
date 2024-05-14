import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GoogleMap, MapAdvancedMarker, MapInfoWindow, MapMarker } from '@angular/google-maps'
import { NavigationComponent } from "../navigation/navigation.component";

@Component({
    selector: 'app-customer-map',
    standalone: true,
    templateUrl: './customer-map.component.html',
    styleUrl: './customer-map.component.css',
    imports: [GoogleMap, MapInfoWindow, MapMarker, NavigationComponent, MapAdvancedMarker]
})
export class CustomerMapComponent implements OnInit {
  zoom = 7;
  center!: google.maps.LatLngLiteral | google.maps.LatLng;
  height: number = 0;
  markerPositions: { position: google.maps.LatLngLiteral, title: string, address: string, icon: any }[] = [];
  //markerPositions2: { position: google.maps.LatLngLiteral, title: string, icon: any }[] = [];
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 17,
    minZoom: 7,
  };
  @ViewChildren(MapInfoWindow) infoWindowsViews!: QueryList<MapInfoWindow>;
  pinColor = "#FFFFFF";
  pinLabel = "A";

    // Pick your pin (hole or no hole)
  pinSVGHole = "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";
  pinSVGFilled = "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z";


  markerOptions1: google.maps.MarkerOptions = {draggable: false, icon: '../../../assets/clear_globe_icon_80x60.png'};
  //markerOptions2: google.maps.MarkerOptions = {draggable: false, icon: '../../../assets/palms_logo.png'};
  markerImage = {  // https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerLabel
    path: this.pinSVGFilled,
    fillOpacity: 1,
    fillColor: this.pinColor,
    strokeWeight: 2,
    strokeColor: "white",
    scale: 2,
};

  openInfoWindow(marker: MapMarker, windowIndex: number) {
    let curIdx = 0;
    this.infoWindowsViews.forEach((window: MapInfoWindow) => {
      if (windowIndex === curIdx) {
        window.open(marker);
        curIdx++;
      } else {
        curIdx++;
      }
    });
  }

  ngOnInit() {
    this.height = window.innerHeight - (window.innerHeight * 0.11)
    
    this.center = {
      lat: 47.1801191,
      lng: 19.5014212
    }
    
    this.addMarkerPositions();

    //this.markerPositions2.push({ position: { lat: 46.6282108, lng: 19.2892695 }, title: 'Palms 6S', icon: this.markerImage });
    //this.markerPositions2.push({ position: { lat: 46.6971933, lng: 19.0208102 }, title: 'Palms 10D + Palms 5.85', icon: this.markerImage });
  }
 
  zoomIn() {
    if (this.zoom < this.options.maxZoom!) this.zoom++;
  }
 
  zoomOut() {
    if (this.zoom > this.options.minZoom!) this.zoom--;
  }

  addMarkerPositions(){
    this.markerPositions.push({ position: { lat: 47.048407, lng: 16.801791 }, title: 'Palms 10D + 5.72', address: 'Vasvár', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 48.015810, lng: 21.374798 }, title: 'Palms 10DWD + 5.72', address: 'Tiszalök', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.334819, lng: 20.434727 }, title: 'Palms 15D + 7.72', address: 'Kőtelek', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 48.115190, lng: 22.313075 }, title: 'Palms 10D + 5.72', address: 'Vásárosnamény', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.109245, lng: 17.993927 }, title: 'Palms 13U + 7.86', address: 'Bükkösd', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 48.484515, lng: 21.355322 }, title: 'Palms 10D + 5.72', address: 'Telkibánya', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.252883, lng: 16.929368 }, title: 'Palms 10D + 5.72', address: 'Sárvár', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.680961, lng: 18.439413 }, title: 'Palms 15D + 7.86', address: 'Pincehely', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.882425, lng: 17.437064 }, title: 'Palms 10D + 5.72', address: 'Tapolca', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.734886, lng: 21.241796 }, title: 'Palms 10D + 5.72', address: 'Doboz', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.941870, lng: 19.039279 }, title: 'Palms 10D + 5.85', address: 'Diósjenő', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.950124, lng: 16.284903 }, title: 'Palms 670 daru', address: 'Szentgotthárd', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.894579, lng: 19.686831 }, title: 'Palms 10UWD + 5.72', address: 'Kecskemét', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.967698, lng: 20.740973 }, title: 'Palms 10D + 5.72', address: 'Harsány', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.966606, lng: 20.741714 }, title: 'Palms 5.72 daru', address: 'Harsány', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.079539, lng: 17.443808 }, title: 'Palms 10D + 4.70', address: 'Csokonyavisonta', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.221914, lng: 18.598415 }, title: 'Palms 15D + 7.86', address: 'Bátaapáti', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.212031, lng: 19.547845 }, title: 'Palms 4.70 daru', address: 'Dánszentmiklós', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 48.370885, lng: 20.916993 }, title: 'Palms 15D + 7.86', address: 'Felsővadász', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 48.087850, lng: 19.431313 }, title: 'Palms 15D + 7.86', address: 'Hugyag', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.783687, lng: 19.133172 }, title: 'Palms 8S + 4.70', address: 'Vác', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.783283, lng: 19.134889 }, title: 'Palms 3.67 daru', address: 'Vác', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.800645, lng: 19.359648 }, title: 'Palms 15D + 7.72', address: 'Izsák', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.749914, lng: 16.923754 }, title: 'Palms 15UWD + 7.86', address: 'Pölöske', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.470563, lng: 18.823014 }, title: 'Palms 15U + 7.75', address: 'Biatorbágy', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.646544, lng: 21.278372 }, title: 'Palms 10D + 7.72', address: 'Gyula', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 48.104817, lng: 22.532590 }, title: 'Palms 12D + 7.72', address: 'Tarpa', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.023279, lng: 19.121615 }, title: 'Palms 15D + 7.86', address: 'Kunszentmiklós', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.327947, lng: 17.044410 }, title: 'Palms 6S + 2.54', address: 'Ostffyasszonyfa', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.102542, lng: 17.908970 }, title: 'Palms 10D + 695', address: 'Veszprém', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.361744, lng: 19.852227 }, title: 'Palms 15D + 7.86', address: 'Farmos', icon: this.markerImage }); 
    this.markerPositions.push({ position: { lat: 46.297951, lng: 19.327341 }, title: 'Palms 640 daru', address: 'Jánoshalma', icon: this.markerImage }); 
    this.markerPositions.push({ position: { lat: 48.103528, lng: 20.778100 }, title: 'Palms 8SX + 670', address: 'Miskolc', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 48.103392, lng: 20.778711 }, title: 'Palms 10D + 7.72', address: 'Miskolc', icon: this.markerImage }); 
    this.markerPositions.push({ position: { lat: 46.622781, lng: 16.537593 }, title: 'Palms 10D + 5.72', address: 'Lenti', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.119255, lng: 16.908023 }, title: 'Palms 9SC + 5.72', address: 'Egervölgy', icon: this.markerImage }); 
    this.markerPositions.push({ position: { lat: 46.202591, lng: 17.451927 }, title: 'Palms 13D + 7.86', address: 'Lábod', icon: this.markerImage }); 
    this.markerPositions.push({ position: { lat: 46.689998, lng: 17.842032 }, title: 'Palms 13U + 7.86', address: 'Karád', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.474440, lng: 17.959726 }, title: 'Palms 10D + 5.72', address: 'Bakonyszombathely', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.473993, lng: 17.961105 }, title: 'Palms 7.75 daru', address: 'Bakonyszombathely', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.436315, lng: 19.484453 }, title: 'Palms 10D + 5.72', address: 'Kiskunhalas', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.631677, lng: 17.481437 }, title: 'Palms 15D + 7.86', address: 'Rábapatona', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.103598, lng: 17.436664 }, title: 'Palms 13D + 7.86', address: 'Devecser', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.836260, lng: 19.618726 }, title: 'Palms 9S', address: 'Helvécia', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.749123, lng: 17.834940 }, title: 'Palms 10D + 5.72', address: 'Nagycsepely', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 48.258584, lng: 22.298933 }, title: 'Palms 12D + 5.72', address: 'Tiszakerecseny', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 48.169603, lng: 19.946207 }, title: 'Palms 10D + 5.72', address: 'Nová Basta', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.497948, lng: 19.040658 }, title: 'Palms 840 daru', address: 'Budapest', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.543515, lng: 18.334696 }, title: 'Palms 2.54 daru', address: 'Környe', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.075439, lng: 17.443803 }, title: 'Palms 10D + 5.72', address: 'Csokonyavisonta', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.226017, lng: 17.365244 }, title: 'Palms 10D + 5.72', address: 'Nagyatád', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.680435, lng: 16.584273 }, title: 'Palms 4.70 daru', address: 'Sopron', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.390561, lng: 18.333437 }, title: 'Palms 10U + 7.86', address: 'Mekényes', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.579052, lng: 19.395603 }, title: 'Palms 13U + 7.86', address: 'Soltvadkert', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.883235, lng: 21.579597 }, title: 'Palms 9S + 4.70', address: 'Geszt', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.881206, lng: 21.992983 }, title: 'Palms 10D + 5.72', address: 'Pócspetri', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.054281, lng: 17.391283 }, title: 'Palms 12UWD + 7.86', address: 'Somogyaracs', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.146988, lng: 17.443173 }, title: 'Palms 10D + 5.72', address: 'Görgeteg', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.007244, lng: 17.787859 }, title: 'Palms 7.94 daru', address: 'Tótvázsony', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.941919, lng: 21.869286 }, title: 'Palms 15D + 7.86', address: 'Napkor', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.550550, lng: 17.636848 }, title: 'Palms 12UWD + 7.75', address: 'Pamuk', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.439316, lng: 17.243103 }, title: 'Palms 5.87Z daru', address: 'Rábasebes', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.228366, lng: 19.449588 }, title: 'Palms 15D + 7.72', address: 'Újlengyel', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.081189, lng: 16.854144 }, title: 'Palms 15D + 840', address: 'Alsóújlak', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.275672, lng: 17.301029 }, title: 'Palms 10D + 7.75', address: 'Nemesszalók', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.275122, lng: 17.300500 }, title: 'Palms 695 daru', address: 'Nemesszalók', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.642428, lng: 16.732421 }, title: 'Palms 10D + 5.72', address: 'Gutorfölde', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.855287, lng: 18.750237 }, title: 'Palms 8S + 3.67', address: 'Bajtava', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 47.671469, lng: 21.512963 }, title: 'Palms 10D + 5.72', address: 'Hajdúböszörmény', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.305715, lng: 17.492514 }, title: 'Palms 10D + 4.70', address: 'Kisbajom', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 48.545031, lng: 20.761689 }, title: 'Palms 10D + 7.72', address: 'Komjáti', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.704052, lng: 16.541721 }, title: 'Palms 10D + 4.70', address: 'Zalabaksa', icon: this.markerImage });
  }
}

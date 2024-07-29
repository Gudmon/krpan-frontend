import { Injectable, signal } from '@angular/core';
import { jsPDF } from 'jspdf';
import { FormatPricePipe } from '../components/pipes/format-price.pipe';
import { RemovePricePipe } from '../components/pipes/remove-price.pipe';
import { HttpClient } from '@angular/common/http';
import { KrpanService } from '../components/calculator/palms/shared/services/krpan.service';
import { Observable } from 'rxjs';
import { PdfModel } from '../components/calculator/shared/components/pdf/pdf.component';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  //private url = 'http://localhost:5140';
  private url = 'https://calculator-app-api.azurewebsites.net';

  constructor(
    private httpClient: HttpClient,
    private krpanService: KrpanService) { }

  pdfId = signal<string>("");

  sendPdf(body: PdfModel){
    return this.httpClient.post<any>(`${this.url}/Krpanpdf`, body).pipe()
  }

  getUserPdf(id: string): Observable<Blob> {
    return this.httpClient.get(`${this.url}/Krpanpdf/user/${id}`, { responseType: 'blob' });
  }

  getDealerPdf(id: string): Observable<Blob> {
    return this.httpClient.get(`${this.url}/Krpanpdf/dealer/${id}`, { responseType: 'blob' });
  }
  
  downloadPDF(formData: Record<string, any>) {
    const now = new Date().getTime();
    const report_generated_at = this.getFormattedDateAndTime(now);
    const randomId = Math.random().toString(36).substring(2, 10);
    const removePricePipe = new RemovePricePipe();
    const formatPricePipe = new FormatPricePipe();

    // create a new pdf
    const doc = new jsPDF();

    // doc title
    doc.setFontSize(28);
    doc.text(`Azonosító: ${randomId}`, 20, 25);

    // sub-title
    doc.setFontSize(14);

    // meta data
    doc.setTextColor(150);
    doc.setFontSize(10);

    doc.text('Dátum:', 140, 28);
    doc.text(`${report_generated_at}`, 155, 28);

    doc.line(10, 45, 200, 45); // horizontal line

    // check-in data
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);

    // list names
    doc.setFontSize(12);
    doc.setTextColor(150);

    
    // doc.text('Név', 20, 70);
    // doc.text(`${formData['name']}`, 70, 70);

    // doc.text('Email', 20, 80);
    // doc.text(`${formData['email']}`, 70, 80);
    
    doc.text('Gép neve', 20, 90);
    doc.text(`${formData['selectedVehicle'].name}`, 70, 90);
    doc.text(`${formatPricePipe.transform(formData['selectedVehicle'].price)}`, 175, 90);

    doc.text('Vezértömb', 20, 100);
    doc.text(`${removePricePipe.transform(formData['selectedControlBlock'].name)}`, 70, 100);
    doc.text(`${formatPricePipe.transform(formData['selectedControlBlock'].price)}`, 175, 100);

    doc.text('Rotátor + közbetét', 20, 110);
    doc.text(`${removePricePipe.transform(formData['selectedRotator'].name)}`, 70, 110);
    doc.text(`${formatPricePipe.transform(formData['selectedRotator'].price)}`, 175, 110);

    doc.text('Rotátorfék', 20, 120);
    doc.text(`${removePricePipe.transform(formData['selectedRotatorBrake'].name)}`, 70, 120);
    doc.text(`${formatPricePipe.transform(formData['selectedRotatorBrake'].price)}`, 175, 120);
    
    if(formData['backRestSelected']) {
      doc.text('Háttámla', 20, 130);
      doc.text(`${formData['backRestSelected'].name}`, 70, 130);
      doc.text(`${formatPricePipe.transform(formData['backRestSelected'].price)}`, 175, 130);
  
    }
    
    if(formData['oilCoolerSelected']){
      doc.text('Olajhütö', 20, 140);
      doc.text(`${formData['oilCoolerSelected'].name}`, 70, 140);
      doc.text(`${formatPricePipe.transform(formData['oilCoolerSelected'].price)}`, 175, 140);
    }

    if(formData['ledSelected']){
      doc.text('LED munkalámpák', 20, 150);
      doc.text(`${formData['ledSelected'].name}`, 70, 150);
      doc.text(`${formatPricePipe.transform(formData['ledSelected'].price)}`, 175, 150);
    }
    
    if(formData['workingHoursSelected']){
      doc.text('Üzemóra számláló', 20, 160);
      doc.text(`${formData['workingHoursSelected'].name}`, 70, 600);
      doc.text(`${formatPricePipe.transform(formData['workingHoursSelected'].price)}`, 175, 160);
    }

    

    // doc.text('Üzenet', 20, 170);
    // doc.text(`${formData['message']}`, 70, 170);

    doc.line(10, 190, 200, 190);

    doc.text('Összesen:', 140, 210);
    doc.text(`${formatPricePipe.transform(formData['finalPrice'])}`, 175, 210);

    // horizontal line
    

    // Save PDF
    doc.save(`clear-globe/${randomId}/${now}.pdf`);
}


  private generateRandomId() {
    return Math.random().toString(36).substring(2, 10);
  }

  private getFormattedDateAndTime(timestamp: number) {
    return `${this.tsToDate(timestamp)} ${this.tsToHHMM(timestamp)}`;
  }

  private tsToDate(timestamp: number) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(timestamp).toLocaleDateString('hu-HU', options);
  } 

  private tsToHHMM(timestamp: number) {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    return date.toLocaleTimeString('hu-HU', options);
  }
}

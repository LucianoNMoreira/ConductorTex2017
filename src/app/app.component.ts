import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Donation } from './donation';
import { DonationsComponent } from './components/donations/donations.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(DonationsComponent)
  private donationsComponent: DonationsComponent;
  
  title = 'ConductorTex 2017';

  handleMapClick(donation: Donation){
    this.donationsComponent.createDonation(donation);
  }

}

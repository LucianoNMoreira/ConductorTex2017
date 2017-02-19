import { Component, Input } from '@angular/core';
import { Donation } from '../../donation';

import {AngularFire, FirebaseListObservable} from 'angularfire2';



@Component({
  moduleId: module.id,
  selector: 'donations',
  templateUrl: './donations.component.html'
})
export class DonationsComponent {
  
  firebase: AngularFire;
  constructor(af: AngularFire) {
      this.firebase = af;
      this.list();
  }
  
  donations: FirebaseListObservable<Donation[]>;

  list(){
      this.donations = this.firebase.database.list('/donations');
  }

  createDonation(donation:Donation){
    donation.date = new Date().toString();
    var ref = this.firebase.database.list('/donations').push(donation);
    this.firebase.database.list('/donations-state/'+donation.state).push({donation_key: ref.key});
  }

}

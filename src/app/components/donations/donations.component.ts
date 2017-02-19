import { Component, Input } from '@angular/core';
import { Donation } from '../../donation';
import { StateDonation } from '../../state-donation';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent {
  
  firebase: AngularFire;
  constructor(af: AngularFire) {
      this.firebase = af;
      this.list();
  }
  
  donations: FirebaseListObservable<Donation[]>;
  statesDonation: StateDonation[] = [];

  list(){
      this.donations = this.firebase.database.list('/donations');

      var statesMap={};
      //Iterate over donations and get stats
      this.donations.forEach(row => {
        var state;
        for(let donation of row){
          state = statesMap[donation.state];
          if(!state){
            state = new StateDonation(donation.state, 0, 0);
          }
          state.amount += donation.value;
          ++state.donations;
          statesMap[donation.state] = state;
        }

        //Populate states array
        this.statesDonation = [];
        for (var property in statesMap) {
            if (statesMap.hasOwnProperty(property)) {
              this.statesDonation.push(statesMap[property]);
            }
        }
      });
  }

  createDonation(donation:Donation){
    donation.date = new Date().toString();
    var ref = this.firebase.database.list('/donations').push(donation);
    this.firebase.database.list('/state-donations/'+donation.state).push({donation_key: ref.key});
  }

}

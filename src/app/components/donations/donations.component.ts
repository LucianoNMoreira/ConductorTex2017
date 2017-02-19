import { Component } from '@angular/core';
import { Donation } from '../../donation';
import { StateDonation } from '../../state-donation';
import { Http } from '@angular/http';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent {
  
  private states;
  private firebase: AngularFire;
  private Math = Math;
  private statesMap: any = {};

  constructor(private http:Http, af: AngularFire) {
      this.firebase = af;
      this.list();
      this.http.get('assets/values-json.json').subscribe(res =>{
        this.states = res.json();
      });
  }
  
  donations: FirebaseListObservable<Donation[]>;
  statesDonation: StateDonation[] = [];

  list(){
      this.donations = this.firebase.database.list('/donations');

      //Iterate over donations and get stats
      this.donations.forEach(row => {
        this.statesMap={};
        var state;
        for(let donation of row){
          state = this.statesMap[donation.state];
          if(!state){
            state = new StateDonation(donation.state, 0, 0);
          }
          state.amount += donation.value;
          ++state.donations;
          this.statesMap[donation.state] = state;
        }

        //Populate states array
        this.statesDonation = [];
        for (var property in this.statesMap) {
            if (this.statesMap.hasOwnProperty(property)) {
              this.statesDonation.push(this.statesMap[property]);
            }
        }
      });
  }

  donate(state:StateDonation){
    for(let st of this.states){
      if(st.state == state.name){
        this.createDonation(new Donation(st.state, Math.round(st.value/6)));
        break;
      }
    }
  }

  createDonation(donation:Donation){
    donation.date = new Date().toString();
    var ref = this.firebase.database.list('/donations').push(donation);
    this.firebase.database.list('/state-donations/'+donation.state).push({donation_key: ref.key});
    this.list();
  }

}

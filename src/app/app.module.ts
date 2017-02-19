import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { DonationsComponent } from './components/donations/donations.component';
import { InviteComponent } from './components/invite/invite.component';

import { AngularFireModule } from 'angularfire2';
import { AlertModule } from 'ng2-bootstrap';


export const firebaseConfig = {
  apiKey: "AIzaSyCw2DNsz26dg3V-YGAjQHSJxm_psuBURXI",
  authDomain: "conductortex2017.firebaseapp.com",
  databaseURL: "https://conductortex2017.firebaseio.com",
  storageBucket: "conductortex2017.appspot.com",
  messagingSenderId: "167172973354"
};

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DonationsComponent,
    InviteComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    HttpModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Donation } from '../../donation';
import { Http } from '@angular/http';

import 'rxjs/add/operator/switchMap';

declare var google:any;

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @Output() makeDonation = new EventEmitter<Donation>();
  donation: Donation;

  private static googleLoaded:any;
  private options;
  private data;
  private chart;
  private states;

  constructor(private http:Http) {
    
    //Get states and each values from scrapy json
    this.http.get('assets/values-json.json').subscribe(res =>{

      this.states = res.json();
      if(!MapComponent.googleLoaded) {
        MapComponent.googleLoaded = true;
        google.charts.load('current',  {packages: ['geochart']});
      }
      google.charts.setOnLoadCallback(() => this.drawGraph());
    });
  }

  //Fires parent event to handle map click
  clickMap(){
    var selectedItem = this.chart.getSelection()[0];
    if (selectedItem) {
      var region = this.data.getValue(selectedItem.row, 0);
      var value = this.data.getValue(selectedItem.row, 1);

      this.donation = new Donation(region, value);
      this.makeDonation.emit(this.donation);
    }
  }

  drawGraph(){
    var states_data = [['State', 'Valor doação (R$)']];
    for (let state of this.states) {
        states_data.push([state.state, Math.round(state.value/8)]);
    }
    
    this.data = google.visualization.arrayToDataTable(states_data);
    this.options = {
      region : 'BR',
      displayMode : 'regions',
      resolution : 'provinces'
    };

    this.chart = new google.visualization.GeoChart(document.getElementById('map'));
    
    //map onSelect
    google.visualization.events.addListener(this.chart, 'select',() => this.clickMap());


    this.chart.draw(this.data, this.options);
  }
 
}

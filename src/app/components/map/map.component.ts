import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

declare var google:any;

@Component({
  selector: 'map',
  templateUrl: './map.component.html'
})
export class MapComponent {
  private static googleLoaded:any;
  private options;
  private data;
  private chart;
  private states;

  constructor(private http:Http) {
    this.http.get('assets/values-json.json').subscribe(res =>{

      this.states = res.json();

      if(!MapComponent.googleLoaded) {
        MapComponent.googleLoaded = true;
        google.charts.load('current',  {packages: ['geochart']});
      }

      google.charts.setOnLoadCallback(() => this.drawGraph());

    });
  }

  drawGraph(){

    var states_data = [['State', 'Popularity']];
    for (let state of this.states) {
        states_data.push([state.state, state.value]);
    }
    
    this.data = google.visualization.arrayToDataTable(states_data);

    this.options = {
      region : 'BR',
      displayMode : 'regions',
      resolution : 'provinces'
    };

    this.chart = new google.visualization.GeoChart(document.getElementById('map'));
    
    var self = this;
    //map onSelect
    google.visualization.events.addListener(this.chart, 'select',function() {
      var selectedItem = self.chart.getSelection()[0];
      if (selectedItem) {
        var region = self.data.getValue(selectedItem.row, 0);
        var value = self.data.getValue(selectedItem.row, 1);
        console.log(region + " = R$ " + value);
      }
		});

    this.chart.draw(this.data, this.options);
  }
 
}

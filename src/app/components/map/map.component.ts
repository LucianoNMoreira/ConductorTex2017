import { Component, Input } from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'map',
  templateUrl: './map.component.html'
})
export class MapComponent {
  states;

  constructor(private http:Http) {
    this.http.get('app/cestas-basicas-valores.json').subscribe(res =>this.states = res.json());
  }
 
}

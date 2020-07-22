import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-spiner',
  templateUrl: './spiner.component.html',
  styleUrls: ['./spiner.component.css']
})
export class SpinerComponent implements OnInit {

  public showLoaderIndicator:string = 'visible';
  constructor(private router: Router){
    this.router.events.subscribe((routerEvent: Event) => {
      if(routerEvent instanceof NavigationStart){
        console.log('NavigationStart');
        this.showLoaderIndicator = 'visible';
      }
      if(routerEvent instanceof NavigationEnd){
        console.log('NavigationEnd');
        this.showLoaderIndicator = 'hidden';
      }
    })
  }

  ngOnInit(): void {
  }

}

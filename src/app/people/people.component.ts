import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';
import { People } from './people.interface';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  public people: People[] = [];
  public imgPath = this.peopleService.smallImgPath;

  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.getPeoplePopular()
  }

  getPeoplePopular(){
    this.people = this.peopleService.getPeoplePopular();
  }
}

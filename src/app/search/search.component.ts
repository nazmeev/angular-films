import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FilmsService } from '../films/films.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {
  searchControl: FormControl;
  
  constructor(private filmsService: FilmsService){

  }

  @ViewChild("searchInput", {static: false})
    nameParagraph: ElementRef;
    name: string;
     
    change() { 
        console.log(this.nameParagraph.nativeElement.textContent); 
        this.nameParagraph.nativeElement.focus();
    }

  ngOnInit(): void {
    this.searchControl = new FormControl()
  }
  ngAfterViewInit(): void {
    this.nameParagraph.nativeElement.focus();
  }

  searchFilm(search){
    let films = this.filmsService.getSearch(search);
  }

}

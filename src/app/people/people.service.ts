import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { People } from './people.interface';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private apiUrl: string = "https://api.themoviedb.org/3";
  private peopleUrl: string = `${this.apiUrl}/person`;
  private page:number = 1;
  private peoplePopular: People[] = [];

  imgPath: string = 'https://image.tmdb.org/t/p'
  midImgPath: string = `${this.imgPath}/w500`
  smallImgPath: string = `${this.imgPath}/w185`
  bigBackPath: string = `${this.imgPath}/w1280`
  midBackPath: string = `${this.imgPath}/w780`
  smallBackPath: string = `${this.imgPath}/w300`

  constructor(private _http: HttpClient) { }

  loadPopularPeople(){
    return this._http.get(`${this.peopleUrl}/popular?page=${this.page}`);
  }
  preparePopularPeople(){
    this.loadPopularPeople().subscribe(
      (peopleList: any) => {
        peopleList.results.forEach(element => {
          this.peoplePopular.push(element);
        });
      }
    )
  }

  getPeoplePopular(){
    if(!this.peoplePopular.length){
      this.preparePopularPeople();
    }
    return this.peoplePopular;
  }

}

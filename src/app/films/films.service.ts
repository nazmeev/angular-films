import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from './film.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  public filmsPopular: Film[] = [];
  public filmsFiltered: Film[] = [];
  public visibility: string = 'visible';
  public page:number = 1;
  public search: string = '';

  apiUrl: string = "https://api.themoviedb.org/3"
  // apiKey: string = '0994e7679a856150aadcecf7de489bce'
  movieUrl: string = `${this.apiUrl}/movie`

  imgPath: string = 'https://image.tmdb.org/t/p'
  midImgPath: string = `${this.imgPath}/w500`
  smallImgPath: string = `${this.imgPath}/w185`
  bigBackPath: string = `${this.imgPath}/w1280`
  midBackPath: string = `${this.imgPath}/w780`
  smallBackPath: string = `${this.imgPath}/w300`

  constructor(private _http: HttpClient) { }

  private filmsFilteredSource = new Subject<Film[]>();
  private moreVisibledSource = new Subject<string>();
  filmsFiltered$ = this.filmsFilteredSource.asObservable();
  moreVisibled$ = this.moreVisibledSource.asObservable();
  
  loadPopularFilms(){
    return this._http.get(`${this.movieUrl}/popular?page=${this.page}`);
  }
  preparePopularFilms(){
    this.loadPopularFilms().subscribe(
      (filmList: any) => {
        filmList.results.forEach(element => {
          this.filmsPopular.push(element);
        });
      }
    )
  }

  getPopularFilms(){
    if(!this.filmsPopular.length){
      this.preparePopularFilms();
      return this.filmsPopular;
    }else{
      this.filteringSearch(this.search);
      return this.filmsFiltered;
    }
  }
  getMoreFilmsPopular(){
    this.preparePopularFilms();
    this.filmsFiltered = [];
    return this.filmsPopular;
  }

  filteringSearch(search: string){
    if(search == '') 
      this.filmsFiltered = this.filmsPopular; 
    else
      this.filmsFiltered = this.filmsPopular.filter(film => film.title.toLowerCase().indexOf(search.toLowerCase()) != -1);
  }

  getSearch(search: string){
    this.search = search;
    this.filteringSearch(search);

    if(search == '') this.visibility = 'visible'; else this.visibility = 'invisible';
    this.filmsFilteredSource.next(this.filmsFiltered);
    this.moreVisibledSource.next(this.visibility);
  }

}
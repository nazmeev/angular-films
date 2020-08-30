import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Subject } from 'rxjs';
import { Film } from '../interfaces/film.interface';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  public films: Film[] = [];
  public filmsPopular: Film[] = [];
  public filmsFiltered: Film[] = [];
  
  public visibility: string = 'visible';
  public page:number = 1;
  public pageMax:number = 4;

  apiUrl: string = "https://api.themoviedb.org/3"
  movieUrl: string = `${this.apiUrl}/movie`

  imgPath: string = 'https://image.tmdb.org/t/p'
  midImgPath: string = `${this.imgPath}/w500`
  smallImgPath: string = `${this.imgPath}/w185`
  bigBackPath: string = `${this.imgPath}/w1280`
  midBackPath: string = `${this.imgPath}/w780`
  smallBackPath: string = `${this.imgPath}/w300`

  constructor(private _http: HttpClient) { }
  
  loadFilms(type: string = 'popular'){
    return this._http.get(`${this.movieUrl}/${type}?page=${this.page}`);
  }
  
  loadFilm(filmId?: number){
    return this._http.get(`${this.movieUrl}/${filmId}`);
  }

  setFilms(films: Film[]){
    return this.films = films
  }
  getFilms(){
    return this.films
  }
  setPage(page: number){
    return this.page = page
  }
  getPage(){
    return this.page
  }

  addFilms(filmList: Film[]){
    filmList.map(film => {
      this.films.push(film)
    })
  }

  getFilmById(id: number){
    let film = this.films.filter(item => item.id == id)
    return film[0]
  }

}
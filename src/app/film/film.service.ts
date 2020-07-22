import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from '../films/film.interface';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  public film: Film;

  apiUrl: string = "https://api.themoviedb.org/3"
  movieUrl: string = `${this.apiUrl}/movie`

  imgPath: string = 'https://image.tmdb.org/t/p'
  bigBackPath: string = `${this.imgPath}/w1280`

  constructor(private _http: HttpClient) { }

  loadFilm(filmId?: number){
    return this._http.get(`${this.movieUrl}/${filmId}`);
  }

}

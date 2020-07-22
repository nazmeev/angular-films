import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from './film.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent {
  public filmId: number;
  public filmItem: any;
  public imgPath = this.filmService.bigBackPath;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService
  ){
    this.route.params.subscribe(params => {
      this.filmId = params.filmId;
      this.getFilm(this.filmId);
    });
  }

  getFilm(filmId){
    this.filmService.loadFilm(filmId).subscribe(
      (result: any) => this.filmItem = result
    )
  }
}
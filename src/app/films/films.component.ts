import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FilmsService } from '../shared/services/films.service';
import { FavoriteService } from '../shared/services/favorite.service';
import { Favorite } from '../shared/interfaces/favorite.interface';
import { responceFilms } from '../shared/interfaces/responceFilms.interface';
import { forkJoin } from 'rxjs';
import { Film } from '../shared/interfaces/film.interface';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})

export class FilmsComponent implements OnInit {
  public maxPages: number = 4
  public loaded: boolean = false
  public moreActive: boolean = true

  public films: Film[] = []
  public favorites: Favorite[] = []

  public imgPath = this.filmsService.smallImgPath

  constructor(
    public filmsService: FilmsService,
    public favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    this.films = this.filmsService.getFilms()
    if (this.films.length) {
      console.log('return data from service')
      this.favorites = this.favoriteService.getFavorites()
      this.loaded = true
    } else {
      this.getPopularFilms()
    }
  }

  getPopularFilms() {
    console.log('return load data')
    this.filmsService.setPage(1)
    forkJoin(
      this.filmsService.loadFilms(),
      this.favoriteService.load()
    )
      .subscribe(([films, favorites]) => {
        let filmList: any = films
        let favoriteList: any = favorites

        this.filmsService.setPage(filmList.page + 1)
        this.filmsService.setFilms(filmList.results)
        this.favoriteService.setFavorites(favoriteList)
        this.loaded = true

        this.films = this.filmsService.films
        this.favorites = this.favoriteService.favorites
      })
  }

  loadMore() {
    console.log('loadMore')

    if (this.moreActive)
      this.filmsService.loadFilms().subscribe(
        (filmList: responceFilms) => {
          this.filmsService.addFilms(filmList.results)
          this.filmsService.setPage(filmList.page + 1)
          this.films = this.filmsService.films
          if (this.filmsService.getPage() > this.maxPages) {
            this.moreActive = false
            this.filmsService.setPage(1)
          }
        }, err => console.error('err', err))
  }

  addFavorite(id: number) {
    console.log('addFavorite')
    let film = this.filmsService.getFilmById(id)

    let favorite: Favorite = this.favoriteService.implementNewFavorite(film)

    this.favoriteService.create(favorite).subscribe(fav => {
      this.favoriteService.addFavorites(fav)
      this.favorites = this.favoriteService.favorites
    }, err => console.error(err))
  }

  removeFavorite(id: string) {
    console.log('removeFavorite')
    this.favoriteService.remove(id).subscribe(() => {
      this.favoriteService.removeFavoriteById(id)
      this.favorites = this.favoriteService.favorites
    }, err => console.error(err))
  }

}
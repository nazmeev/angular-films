import { Component, OnInit, Input } from '@angular/core';
import { FilmsService } from './films.service';
import { Film } from './film.interface';
import { Subscription } from 'rxjs';
import { FavoriteService } from './favorite.service';
import { Favorite } from './favorite.interface';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})

export class FilmsComponent implements OnInit {
  public films: Film[] = [];
  public favorites: Favorite[] = [];
  public filmItem:Film;
  public imgPath = this.filmsService.smallImgPath;
  public moreActivePopular: boolean = true;
  public totalPopular: number;
  public visibility: string;

  subscription: Subscription;

  constructor(
    private filmsService: FilmsService,
    private FavoriteService: FavoriteService
  ) {
  }

  ngOnInit(): void {
    this.getPopularFilms()
    this.getVisibility()
    this.getFavoritedFilms()
    console.log('this.favorites1', this.favorites);
    this.subscription = this.filmsService.filmsFiltered$.subscribe(
      films => this.films = films
    )
    this.subscription = this.filmsService.moreVisibled$.subscribe(
      visibility => this.visibility = visibility
    )
  }

  getPopularFilms(){
    this.films = this.filmsService.getPopularFilms()
  }
  getFavoritedFilms(){
    this.FavoriteService.load().subscribe(favorites => {
      this.favorites = favorites
      console.log('this.favorites2', this.favorites);
    })
  }

  getVisibility(){  
    this.visibility = this.filmsService.visibility
  }

  loadMore(){
    this.filmsService.page = this.filmsService.page + 1;
    if(this.filmsService.page >= this.totalPopular){
      this.moreActivePopular = false;
    }else{
      console.log(this.films.length)
      let moreFilms = this.filmsService.getMoreFilmsPopular();
      moreFilms.map(film => this.films.push(film))
      console.log(this.films.length)
    }
  }

  addFavorite(id: number){
    let film = this.films.filter(item => item.id == id)
    
    let favId: number = film[0].id;
    let favTitle: string = film[0].title;

    const favorite: Favorite = {
      favId,
      favTitle
    }
    this.FavoriteService.create(favorite).subscribe(fav => {
      this.favorites.push(fav)
      this.changeFilms()
    }, err => console.error( err ))
  }
  removeFavorite(id:number){
    this.FavoriteService.remove(id).subscribe(() => {
      this.favorites = this.favorites.filter(item => item.favId != id)
      this.changeFilms()
    })
  }

  changeFilms(){
    this.films.map(item => {
      console.log('item', item.favorited)
      let f = this.favorites.filter(fav => fav.favId == item.id)
      f.length ? item.favorited = true : item.favorited = false
    })
  }
}

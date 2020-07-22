import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Favorite } from './favorite.interface';
import { FavoriteResponse } from './responce.interface';

@Injectable({
  providedIn: 'root'
})

export class FavoriteService {

  static url = 'https://films-boo.firebaseio.com/favorite'
  
  constructor(private http: HttpClient) { }

  create(favorite: Favorite): Observable<Favorite>{
    return this.http.post<FavoriteResponse>(`${FavoriteService.url}/${favorite.favId}.json`, favorite).pipe(
        map(res => {
          // console.log('resp', res)
          return {...favorite, id: res.name}
        } 
      ))
  }

  load(): Observable<Favorite[]>{
    return this.http.get<Favorite[]>(`${FavoriteService.url}.json`).pipe(
      map(res => {
        console.log('load result',)
        if(!res) return []
        return Object.keys(res).map(key => ({...res[key], id: key}))
      })
    )
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${FavoriteService.url}/${id}.json`)
  }

}

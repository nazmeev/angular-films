import { Pipe, PipeTransform } from '@angular/core';
// import { map } from 'rxjs/operators';

@Pipe({
  name: 'pipeFavorited', pure: false
})

export class PipeFavoritedPipe implements PipeTransform {

  transform(array: any, favorited: any): any {
    console.log('PipeFavoritedPipe')
    array.map(item => {
      let favorite = favorited.filter(fav => fav.filmId == item.id)
      if(favorite.length){
        item.favorited = true
        item.favId = favorite[0].id
      }else{
        item.favorited = false
        delete item.favId
      }
    })
    return array;
  }

}

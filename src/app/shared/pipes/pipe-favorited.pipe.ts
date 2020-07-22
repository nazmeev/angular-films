import { Pipe, PipeTransform } from '@angular/core';
// import { map } from 'rxjs/operators';

@Pipe({
  name: 'pipeFavorited'
})

export class PipeFavoritedPipe implements PipeTransform {

  transform(array: any, favorited: any): any {
    console.log('PipeFavoritedPipe')
    array.map(item => {
      let f = favorited.filter(fav => fav.favId == item.id)
      f.length ? item.favorited = true : item.favorited = false
    })
    return array;
  }

}

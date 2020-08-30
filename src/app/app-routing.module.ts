import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmsComponent } from './films/films.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { FilmComponent } from './film/film.component';
import { FavoritesComponent } from './favorites/favorites.component';

const appRoutes: Routes = [
  {path: '', 
    redirectTo: '/films',
    pathMatch: 'full'
  },
  {path: 'films', component: FilmsComponent},
  {path: 'films/:filmId', component: FilmComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: '**', component:  NotFoundComponent},
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

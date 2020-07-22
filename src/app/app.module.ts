import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './not-found/not-found.component';
import { FilmsComponent } from './films/films.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import { RouterModule } from '@angular/router';
import { FilmComponent } from './film/film.component';
import { FilmsItemComponent } from './films/films-item/films-item.component';
import { SearchComponent } from './search/search.component';
import { ApiinterceptorService } from './apiinterceptor.service';
import { PeopleComponent } from './people/people.component';
import { SpinerComponent } from './spiner/spiner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeFavoritedPipe } from './shared/pipes/pipe-favorited.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    FilmsComponent,
    MenuComponent,
    FilmComponent,
    FilmsItemComponent,
    SearchComponent,
    PeopleComponent,
    SpinerComponent,
    PipeFavoritedPipe,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiinterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

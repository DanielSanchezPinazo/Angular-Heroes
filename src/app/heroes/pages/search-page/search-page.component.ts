import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'heroes-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl( "" );

  public heroes: Hero[] = [];

  public selectedHero?: Hero;

  constructor( private heroesService: HeroesService ) {}

  public searchHero() {

    const value: string = this.searchInput.value || "";

    this.heroesService.getSuggestions( value )
      .subscribe( heroes => this.heroes = heroes );

    console.log(value);

  }

  public onSelectedOption( event: MatAutocompleteSelectedEvent ): void {

    // console.log(event.option.value);

    if ( !event.option.value ) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;

    this.searchInput.setValue( hero.superhero );

    this.selectedHero = hero;

  }

}

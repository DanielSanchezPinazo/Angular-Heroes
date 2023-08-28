import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { delay, switchMap } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {

    this.activatedRoute.params.pipe(
      // delay(3000),
      switchMap( ({ id }) => this.heroesService.getHeroById( id ) )
    ).subscribe( hero => {

      if ( !hero ) return this.router.navigate( ["/heroes/list"] );

      this.hero = hero;
      console.log(hero);
      return; });
  }

  public goBack(): void {

    this.router.navigate( [""] );
  }

}

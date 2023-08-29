import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { filter, switchMap, tap } from 'rxjs';

import { Publisher, Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public publishers = [
    { id: "DC Comics", value: "DC Comics" },
    { id: "Marvel Comics", value: "Marvel Comics" }
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    if ( !this.router.url.includes( "edit" )) return;

    this.activatedRoute.params.pipe(
      switchMap(
        ({ id }) => this.heroesService.getHeroById( id ))
    ).subscribe( hero => {

      if ( !hero ) return this.router.navigateByUrl("/");

      this.heroForm.reset( hero );
      return;
    });
  }

  public heroForm = new FormGroup({
    id: new FormControl<string>(""),
    superhero: new FormControl<string>("", { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(""),
    first_appearance: new FormControl<string>(""),
    characters: new FormControl<string>(""),
    alt_img: new FormControl<string>("")
  });

  get currentHero(): Hero {

    const hero = this.heroForm.value as Hero;

    return hero;
  }

  onSubmit(): void {

    if ( this.heroForm.invalid ) {

      this.showSnackbar("Faltan Datos");
      return;
    }

    if ( this.currentHero.id ) {

      this.heroesService.updateHero( this.currentHero )
      .subscribe( hero => {
        // TODO: mostrar snackbar
        this.showSnackbar( `${ hero.superhero } actualizado!` );
        this.router.navigate(["/heroes"]);

      });

      return;
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {

        // TODO: mostrar snackbar y navegar a /heroes/edit/hero.id
        this.showSnackbar( `${ hero.superhero } creado!` );
        this.router.navigate( ["/heroes"] );

      });
  }

  public onDeleteHero() {

    if ( !this.currentHero.id ) throw Error("Hero 'id' is required.");

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

// Intentamos optimizarlo para que no haya un "subscribe" dentro de otro.

    /*dialogRef.afterClosed().subscribe(result => {

      if ( !result ) return;

      console.log("Deleted");

      this.heroesService.deleteHeroById( this.currentHero.id ).subscribe( wasDeleted => {

        if ( wasDeleted ) {

          this.showSnackbar( `${ this.currentHero.superhero } borrado!` );
          this.router.navigate(["/heroes"]);
        }
      });
    });*/

    dialogRef.afterClosed()
    .pipe(
      filter( result => result ),
      switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id )),
      filter( wasDeleted => wasDeleted)
    ).subscribe(() => {

      this.showSnackbar( `${ this.currentHero.superhero } borrado!` );
      this.router.navigate(["/heroes"]);
    })

  }

  public showSnackbar( message: string ): void {

    this.snackbar.open( message, "Done", { duration: 2500 } )
  }

}

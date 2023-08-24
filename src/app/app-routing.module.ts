import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: "heroes",
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule )
  },
  {
    path: "404",
    component: Error404PageComponent
  },
  {
    path: "",
    redirectTo: "heroes",
    pathMatch: 'full' // si no se pone esto reconoce un string vacio delante de las rutas y las redirige todas al componente heroes
  },
  {
    path: "**",
    redirectTo: "404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

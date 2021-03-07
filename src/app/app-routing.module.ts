import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeRoutes } from './home/home.routes';
import { DragComponent } from './drag/drag.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'drag', component:DragComponent, pathMatch: 'full' },
    ...HomeRoutes,
];

@NgModule( {
    imports: [RouterModule.forRoot( routes )],
    exports: [RouterModule]
})
export class AppRoutingModule { }

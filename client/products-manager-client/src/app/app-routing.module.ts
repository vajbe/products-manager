import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { EditProductsComponent } from './components/edit-products/edit-products.component';

const routes: Routes = [
  { path: 'edit', component:  EditProductsComponent},
  { path: 'view', component: ViewProductsComponent },
  { path: '', redirectTo: '/view', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: ViewProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

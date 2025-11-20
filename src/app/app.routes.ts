

import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductsComponent } from './pages/products/products.component'; 
import { CartComponent } from './pages/cart/cart.component';
import { TenisListComponent } from './pages/admin/tenis-list/tenis-list.component';
import { TenisFormComponent } from './pages/admin/tenis-form/tenis-form.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent }, 
  { path: 'cart', component: CartComponent },


  { 
    path: 'admin/tenis', 
    component: TenisListComponent
    
  },
  { 
    path: 'admin/tenis/novo',
    component: TenisFormComponent
   
  },
  { 
    path: 'admin/tenis/editar/:id',
    component: TenisFormComponent
    
  }
];
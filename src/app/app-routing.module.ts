import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/home.component';
import {ItempageComponent} from './itempage/itempage.component';
import {OrderlistComponent} from './orderlist/orderlist.component';
import {UsermanagementComponent} from './usermanagement/usermanagement.component';
import {ProductssComponent} from './productss/productss.component';
import {CushomeComponent} from './cushome/cushome.component';
import {LoginComponent} from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'signup', component: SignupComponent},
  {path:'home', component: HomeComponent},
  {path:'itemPage/:id', component: ItempageComponent},
  {path:'orderlist', component: OrderlistComponent,  canActivate:[AuthGuard]},
  {path:'usermanagement', component: UsermanagementComponent,  canActivate:[AuthGuard]},
  {path:'products', component: ProductssComponent, canActivate:[AuthGuard]},
  {path:'cushome', component: CushomeComponent, canActivate:[AuthGuard] },
  {path:'login', component: LoginComponent},
 // {path:'login', component:LoginComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

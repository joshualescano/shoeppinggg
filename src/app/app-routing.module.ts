import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/home.component';
import {ItempageComponent} from './itempage/itempage.component';
import {AdminComponent} from './admin/admin.component';
import {ProductlistComponent} from './productlist/productlist.component';
import {OrderlistComponent} from './orderlist/orderlist.component';
import {UsermanagementComponent} from './usermanagement/usermanagement.component';
import {ProductssComponent} from './productss/productss.component';
import {CushomeComponent} from './cushome/cushome.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'signup', component: SignupComponent},
  {path:'home', component: HomeComponent},
  {path:'itemPage/:id', component: ItempageComponent},
  {path:'admin', component: AdminComponent},
  {path:'productlist', component: ProductlistComponent},
  {path:'orderlist', component: OrderlistComponent},
  {path:'usermanagement', component: UsermanagementComponent},
  {path:'products', component: ProductssComponent},
  {path:'cushome', component: CushomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

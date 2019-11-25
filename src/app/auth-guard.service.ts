import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private http:HttpClient, private router:Router) { }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token');
  }
  logoutUser(){
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    this.router.navigate(['/home'])
  }

  getUsername(){
    return localStorage.getItem('username');    
  }
}

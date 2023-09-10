import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ApiCallService } from './services/api-call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: SocialAuthService, 
    private apiCall: ApiCallService) {

  }
  ngOnInit(): void {
    this.authService.authState.subscribe({
      next: (user) => {
        alert("login success");
        console.log(user);
        this.apiCall.loginWithGoogle(user).subscribe({
          next: (data: any) => {
            console.log("data from backend");
            console.log(data);
            this.token = data['jwtToken'];
            console.log(this.token);
          },
          error: (error) => {
            console.log("error from backend");
            console.log(error);
          }
        });
      },
      error: (error) => {
        alert("login error");
        console.log(error);
      },
      complete: () => {
        console.log("request completed !!");
      }
    })
  }

  getUsers() {
    this.apiCall.getUsers(this.token).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.log(error);
        
      }
    })
  }

  getProducts() {
    this.apiCall.getProducts(this.token).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.log(error);
        
      }
    })
  }

  title = 'social-login';
  token = '';
}

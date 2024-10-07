import { Component, OnInit } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title = 'navbar';
  username: string = '';

  ngOnInit(): void {
    this.tomarUsuario();
  }

  tomarUsuario() {
    // Get the currentUser token from localStorage
    const token = localStorage.getItem('currentUser');
    
    if (token) {
      // Decode the token
      const tokenData: any = jwtDecode(token);
      
      // Assign the username from the token's payload
      this.username = tokenData.sub as string;
      
    } else {
      console.error("No token found in localStorage");
    }
  }
}

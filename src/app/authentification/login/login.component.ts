
import { Component, Input, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login="test login";
  courses;
  
  constructor(private service:LoginService){
    this.courses=service.getCourses()
  }
}


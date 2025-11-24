import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true, 
  imports: [
    IonicModule,      
    CommonModule,   
    RouterLink,       
    RouterLinkActive 
  ],
})
export class AppComponent {
  
  public appPages = [
    { 
      title: 'Hambúrgueres', 
      url: '/home/hamburgueres', 
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg' 
    },
    { 
      title: 'Bebidas', 
      url: '/home/bebidas', 
      image: 'https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg' 
    },
    { 
      title: 'Sobremesas', 
      url: '/home/sobremesas', 
      image: 'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg' 
    },
    { 
      title: 'Gerenciar', 
      url: '/admin/lista-produtos', 
      image: 'https://img.icons8.com/color/96/settings--v1.png'
    }
  ];

  constructor( ) {
    document.body.setAttribute('color-theme', 'light');
  }
}

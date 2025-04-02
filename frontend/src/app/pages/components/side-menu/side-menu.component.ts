import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Input() collapsed: boolean = false;
  
  menu: any []= [
    {
      title: 'Cadastro',
      icon: 'user-add',
      subItems: [
        { name: 'Pacientes', route: './registration/register-patient' }
      ]
    },
    {
      title: 'Administração',
      icon: 'audit',
      subItems: [
        { name: 'Avaliações', route: './administracao/avalia' },
        { name: 'Assinaturas', route: './administracao/assina' },
      ]
    }
  ];
  
  //menu: any = [];

  constructor() {}

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    const _menu = localStorage.getItem('CLINICS.user'); 
  
    if (_menu) {
      const menuData = JSON.parse(_menu); 
      //const menus = menuData.claims.menu;      
      //this.menu = menus;
    } else {
      console.log('No menu data found.');
    }
  }
  
}

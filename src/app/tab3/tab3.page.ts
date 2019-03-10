import { Component, OnInit } from '@angular/core';
import { Produto, FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class Tab3Page implements OnInit {

  produtos: Produto[];

  constructor(private produtoService: FirebaseService) { }

  ngOnInit() {
    this.produtoService.getTodos().subscribe(res => {
      this.produtos = res;
    });
  }

  remove(item) {
    this.produtoService.remove(item.id);
  }
}

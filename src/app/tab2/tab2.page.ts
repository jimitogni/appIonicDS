import { Component, OnInit } from '@angular/core';
import { ViewController } from '@ionic/angular';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from '@ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firebase } from '../services/firebase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  produto: Produto = {
    nome: string,
    modelo: string,
    quantidade: number,
    preco: number,
  }

  produtoId = null;

  constructor(private route: ActivatedRoute, private nav: NavController,
    private firebaseServer: Firebase, private loadingController: LoadingController) { }

    ngOnInit() {
      this.produtoId = this.route.snapshot.params['id'];
      if (this.produtoId)  {
        this.getTodos();
      }
    }


    async carregaProduto() {
      const loading = await this.loadingController.create({
        message: 'Carregando produto..'
      });
      await loading.present();

      this.firebaseServer.getUm(this.produtoId).subscribe(res => {
        loading.dismiss();
        this.produto = res;
      });
    }


    async salvaProduto() {
      const loading = await this.loadingController.create({
        message: 'Salvando produto..'
      });
      await loading.present();

      if (this.produtoId) {
        this.firebaseServer.update(this.produto, this.produtoId).then(() => {
          loading.dismiss();
          this.nav.navigateForward('/tab1');
        });
      } else {
        this.firebaseServer.add(this.produto).then(() => {
          loading.dismiss();
          this.nav.navigateForward('/tab1');
        });
      }
    }

  }

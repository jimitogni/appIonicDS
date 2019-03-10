import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Produto {
  id?: string;
  nome: string;
  modelo: string;
  preco: number;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private produtosColecao: AngularFirestoreCollection<Produto>;

    private produtos: Observable<Produto[]>;

    constructor(db: AngularFirestore) {
      this.produtosColecao = db.collection<Produto>('produtos');

      this.produtos = this.produtosColecao.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }

    getTodos() {
      return this.produtos;
    }

    getUm(id) {
      return this.produtosColecao.doc<Produto>(id).valueChanges();
    }

    update(produto: Produto, id: string) {
      return this.produtosColecao.doc(id).update(produto);
    }

    add(produto: Produto) {
      return this.produtosColecao.add(produto);
    }

    remove(id) {
      return this.produtosColecao.doc(id).delete();
    }
  }

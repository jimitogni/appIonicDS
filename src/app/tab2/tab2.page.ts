import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  ola = "Deu certo";
  var1 = "";
  var2 = "";

  cliqueAqui(){
    alert(this.ola);
    this.var1 = "Dados enviados com sucesso";
  }

}

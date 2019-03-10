import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'home', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'tab3/:id', loadChildren: './tab3/tab3.module#TodoDetailsPageModule' },
  { path: 'tab3', loadChildren: './tab3/tab3.module#TodoDetailsPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportComponent } from './tools-wizard/import/import.component';
import { SelectComponent } from './tools-wizard/select/select.component';
import { ShareComponent } from './tools-wizard/share/share.component';

const routes: Routes = [
  {
    path: 'import',
    component: ImportComponent,
    data: {
      title: 'Import'
    }
  },
  {
    path: 'select',
    component: SelectComponent,
    data: {
      title: 'Select'
    }
  },
  {
    path: 'share',
    component: ShareComponent,
    data: {
      title: 'Share'
    }
  },
  { path: '**',
    redirectTo: '/import',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

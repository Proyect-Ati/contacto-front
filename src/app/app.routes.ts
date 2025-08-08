import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactList } from './modules/contact/page/contact-list/contact-list';
import { ContactCreate } from './modules/contact/page/contact-create/contact-create';
import { ContactEdit } from './modules/contact/page/contact-edit/contact-edit';

export const routes: Routes = [
  { 
    path: 'contacts', 
    children: [
      { path: '', component: ContactList },
      { path: 'create', component: ContactCreate },
      { path: 'edit/:id', component: ContactEdit }
    ]
  },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: '**', redirectTo: '/contacts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
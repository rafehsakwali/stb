import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignComponent } from './sign/sign.component';
import { SignmasterComponent } from './signmaster/signmaster.component';
import { AdminComponent } from './admin/admin.component';
import { FormComponent } from './form/form.component';
import { FicheComponent } from './fiche/fiche.component';
import { MasterComponent } from './master/master.component'; // ⚡ Ajout

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SignComponent },
  { path: 'signinn', component: SignmasterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'form/:id', component: FormComponent },
  { path: 'fiche/:id', component: FicheComponent },
  { path: 'master', component: MasterComponent } // ⚡ Route pour le MasterComponent
];

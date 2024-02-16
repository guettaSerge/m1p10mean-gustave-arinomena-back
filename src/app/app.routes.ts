import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CoursesComponent } from './courses.component';
import { LoginComponent } from './authentification/login/login.component';
import { InscriptionComponent } from './authentification/inscription/inscription.component';
import { HomeComponent } from './home/home.component';
export const routes: Routes = [
    {path: '', component: HomeComponent},
    { path: 'users', component: UsersComponent },
    { path:'courses', component: CoursesComponent},
    { path:'auth/login', component: LoginComponent},
    { path:'auth/inscription', component: InscriptionComponent}
];

import { AuthGuard } from './auth/auth.guard';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {path: "", component: PostListComponent},
  {path: "create", component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: "edit/:postId", component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},

  // {path: "auth",  loadChildren: "./auth/auth.module#AuthModule"}
//   {
//     path: 'auth',
//     loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)
//  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

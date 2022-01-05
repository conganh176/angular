import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { ErrorPageComopent } from './error-page/error-page.component';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerResolver } from './servers/server/server-resolver.service';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  // nested route
  {
    path: 'users',
    component: UsersComponent,
    children: [
      // route parameter
      { path: ':id/:name', component: UserComponent },
    ],
  },
  // run canActivate first before route
  {
    path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      // resolve dynamic data
      {
        path: ':id',
        component: ServerComponent,
        resolve: { server: ServerResolver },
      },
      // use can deactivate for unsaved pages
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  //   { path: 'not-found', component: PageNotFoundComponent },
  // pass object to route
  {
    path: 'not-found',
    component: ErrorPageComopent,
    data: {
      message: 'Page not found',
    },
  },
  // ** catch all, redirect route
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

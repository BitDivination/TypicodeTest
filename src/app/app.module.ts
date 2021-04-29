import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { API_BASE_PROVIDER } from "./services";
import { NgxsModule, Store } from "@ngxs/store";
import { AppStateService } from "./state";
import { GetComments, GetPosts, GetUsers } from "./state/app-state.actions";
import { FeedContainerComponent, UserContainerComponent, PostContainerComponent } from './containers';
import { FeedPostComponent } from './components/feed-post/feed-post.component';

// Material
import { MatCardModule } from "@angular/material";
import { MatToolbarModule } from '@angular/material/toolbar';
import { PostComponent } from './components/post/post.component';

export const MATERIAL_IMPORTS: (any[] | Type<any> | ModuleWithProviders<{}>)[] = [
    MatCardModule,
    MatToolbarModule
  ];

@NgModule({
  declarations: [
    AppComponent,
    FeedContainerComponent,
    UserContainerComponent,
    PostContainerComponent,
    FeedPostComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([AppStateService], { developmentMode: true }),

    //Material Imports
    ...MATERIAL_IMPORTS
  ],
  providers: [
    API_BASE_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  // Load all of the API Based data
  constructor(private readonly store: Store) {
    this.store.dispatch([
        new GetUsers(),
        new GetPosts(),
        new GetComments()
      ]);
  }
}

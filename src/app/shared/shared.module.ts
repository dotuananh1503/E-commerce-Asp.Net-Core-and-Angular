import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderBackComponent } from './header-back/header-back.component';
import { FooterBackComponent } from './footer-back/footer-back.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../material/material.module';
import { AuthorizeViewComponent } from '../security/authorize-view/authorize-view.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { OrderTotalsComponent } from './order-totals/order-totals.component';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        HeaderBackComponent,
        FooterBackComponent,
        NotFoundComponent,
        OrderTotalsComponent,
        AuthorizeViewComponent
    ],
    imports: [
        RouterModule,
        MatBadgeModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        FileUploadModule,
        ReactiveFormsModule
    ],
    exports: [
        HeaderComponent,
        HeaderBackComponent,
        NotFoundComponent,
        FooterBackComponent,
        OrderTotalsComponent,
        FooterComponent
    ],
    providers: [{
        provide: 'SocialAuthServiceConfig',
        useValue: {
            autoLogin: true,
            providers: [
                {
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider(
                        '386796005768-hegs7u1kjisu3t2hc4ds6d47e05hid4n.apps.googleusercontent.com'
                    )
                },
                {
                    id: FacebookLoginProvider.PROVIDER_ID,
                    provider: new FacebookLoginProvider('817705618853561')
                }
            ]
        } as SocialAuthServiceConfig,
    }],
    bootstrap: []
})

export class SharedModule { }

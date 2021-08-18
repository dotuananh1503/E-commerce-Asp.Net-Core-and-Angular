import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductService } from './product/product.service';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { NewsComponent } from './news/news.component';
import { NewsModule } from './news/news.module';
import { NewsService } from './news/news.service';
import { AboutComponent } from './about/about.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartService } from './cart/cart.service';
import { SucccessComponent } from './succcess/succcess.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './security/profile/profile.component';
import { SocialLoginModule } from 'angularx-social-login';
import { CheckoutService } from './checkout/checkout.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { BackLayoutComponent } from './_layout/back-layout/back-layout.component';
import { FrontLayoutComponent } from './_layout/front-layout/front-layout.component';
import { PermissionComponent } from './permission/permission.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryServicce } from './category/category.service';
import { MaterialModule } from './material/material.module';
import { PublisherFormComponent } from './publisher/publisher-form/publisher-form.component';
import { PublisherCreateComponent } from './publisher/publisher-create/publisher-create.component';
import { InputImgComponent } from './utilities/input-img/input-img.component';
import { PublisherIndexComponent } from './publisher/publisher-index/publisher-index.component';
import { PublisherEditComponent } from './publisher/publisher-edit/publisher-edit.component';
import { BookCreateComponent } from './book/book-create/book-create.component';
import { GenreCreateComponent } from './genre/genre-create/genre-create.component';
import { GenreIndexComponent } from './genre/genre-index/genre-index.component';
import { GenreFormComponent } from './genre/genre-form/genre-form.component';
import { GenreEditComponent } from './genre/genre-edit/genre-edit.component';
import { MultipleSelectorComponent } from './utilities/multiple-selector/multiple-selector.component';
import { BookFormComponent } from './book/book-form/book-form.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookEditComponent } from './book/book-edit/book-edit.component';
import { BookFilterComponent } from './book/book-filter/book-filter.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { CategoryIndexComponent } from './category/category-index/category-index.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { CategoryUpdateComponent } from './category/category-update/category-update.component';
import { LoginAdminComponent } from './security/login-admin/login-admin.component';
import { RegisterAdminComponent } from './security/register-admin/register-admin.component';
import { NonLayoutComponent } from './_layout/non-layout/non-layout.component';
import { ChangePasswordComponent } from './security/change-password/change-password.component';
import { JwtInterceptorService } from './security/jwt-interceptor.service';
import { PhotoUploadComponent } from './utilities/photo-upload/photo-upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductCollectorComponent } from './product/product-collector/product-collector.component';
import { ProductItemComponent } from './product/product-item/product-item.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductSlideComponent } from './product/product-slide/product-slide.component';
import { SwiperModule } from 'swiper/angular';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';
import { ProductSlideItemComponent } from './product/product-slide-item/product-slide-item.component';
import { RatingComponent } from './utilities/rating/rating.component';
import { NgxInputStarRatingModule } from 'ngx-input-star-rating';
import { RatingModule } from 'ng-starrating';
import { AddressFormComponent } from './security/address-form/address-form.component';
import { ProfileDashboardComponent } from './_layout/profile-dashboard/profile-dashboard.component';
import { AddressUpdateComponent } from './security/address-manage/address-update/address-update.component';
import { AddressCreateComponent } from './security/address-manage/address-create/address-create.component';
import { AddressIndexComponent } from './security/address-manage/address-index/address-index.component';
import { AddressFormManageComponent } from './security/address-manage/address-form-manage/address-form-manage.component';
import { OrderListComponent } from './security/order-manage/order-list/order-list.component';
import { OrderDetailComponent } from './security/order-manage/order-detail/order-detail.component';
import { PipesModule } from './pipes/pipes.module';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

@NgModule({
  declarations: [
    AppComponent,
    BackLayoutComponent,
    FrontLayoutComponent,
    NonLayoutComponent,
    ProfileDashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    CartComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductCollectorComponent,
    ProductEditComponent,
    ProductSlideComponent,
    ProductSlideItemComponent,
    ProductDetailComponent,
    NewsComponent,
    AboutComponent,
    CheckoutComponent,
    SucccessComponent,
    AdminComponent,
    ProfileComponent,
    PermissionComponent,
    CategoryEditComponent,
    CategoryIndexComponent,
    CategoryFormComponent,
    CategoryUpdateComponent,
    PublisherFormComponent,
    PublisherCreateComponent,
    PublisherIndexComponent,
    PublisherEditComponent,
    InputImgComponent,
    BookCreateComponent,
    BookFormComponent,
    BookDetailComponent,
    BookListComponent,
    BookEditComponent,
    BookFilterComponent,
    GenreCreateComponent,
    GenreIndexComponent,
    GenreFormComponent,
    GenreEditComponent,
    MultipleSelectorComponent,
    LoginAdminComponent,
    RegisterAdminComponent,
    ChangePasswordComponent,
    PhotoUploadComponent,
    GenericListComponent,
    AddressFormComponent,
    AddressUpdateComponent,
    AddressCreateComponent,
    AddressIndexComponent,
    AddressFormManageComponent,
    OrderListComponent,
    OrderDetailComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CKEditorModule,
    AppRoutingModule,
    NewsModule,
    NgxInputStarRatingModule,
    RatingModule,
    FormsModule,
    NgxGalleryModule,
    PipesModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatStepperModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FileUploadModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule,
    SwiperModule
  ],
  providers: [ProductService, NewsService, CartService, CheckoutService, CategoryServicce, {
    provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true,
  }],
  bootstrap: [AppComponent],
  entryComponents: [AddressFormComponent, CategoryEditComponent, CategoryUpdateComponent,
    PublisherCreateComponent, PublisherEditComponent, GenreCreateComponent, GenreEditComponent]
})
export class AppModule { }

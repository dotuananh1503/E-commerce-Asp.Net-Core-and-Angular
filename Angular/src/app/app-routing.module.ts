import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { AdminGuardGuard } from "./admin-guard.guard";
import { AdminComponent } from "./admin/admin.component";
import { BookCreateComponent } from "./book/book-create/book-create.component";
import { BookDetailComponent } from "./book/book-detail/book-detail.component";
import { BookEditComponent } from "./book/book-edit/book-edit.component";
import { BookFilterComponent } from "./book/book-filter/book-filter.component";
import { BookListComponent } from "./book/book-list/book-list.component";
import { CartComponent } from "./cart/cart.component";
import { CategoryIndexComponent } from "./category/category-index/category-index.component";
import { CheckoutComponent } from "./_checkout/checkout/checkout.component";
import { ContactComponent } from "./contact/contact.component";
import { SucccessComponent } from "./succcess/succcess.component";
import { GenreIndexComponent } from "./genre/genre-index/genre-index.component";
import { HomeComponent } from "./home/home.component";
import { LoginAdminComponent } from "./security/login-admin/login-admin.component";
import { LoginComponent } from "./security/login/login.component";
import { NewsDetailComponent } from "./news/news-detail/news-detail.component";
import { NewsComponent } from "./news/news.component";
import { PermissionComponent } from "./permission/permission.component";
import { ProductCollectorComponent } from "./product/product-collector/product-collector.component";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";
import { ProfileComponent } from "./security/profile/profile.component";
import { PublisherIndexComponent } from "./publisher/publisher-index/publisher-index.component";
import { RegisterAdminComponent } from "./security/register-admin/register-admin.component";
import { RegisterComponent } from "./security/register/register.component";
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { BackLayoutComponent } from "./_layout/back-layout/back-layout.component";
import { FrontLayoutComponent } from "./_layout/front-layout/front-layout.component";
import { NonLayoutComponent } from "./_layout/non-layout/non-layout.component";
import { ChangePasswordComponent } from "./security/change-password/change-password.component";
import { PhotoUploadComponent } from "./utilities/photo-upload/photo-upload.component";
import { ProfileDashboardComponent } from "./_layout/profile-dashboard/profile-dashboard.component";
import { AddressIndexComponent } from "./security/address-manage/address-index/address-index.component";
import { AddressCreateComponent } from "./security/address-manage/address-create/address-create.component";
import { AddressUpdateComponent } from "./security/address-manage/address-update/address-update.component";
import { OrderListComponent } from "./security/order-manage/order-list/order-list.component";
import { OrderDetailComponent } from "./security/order-manage/order-detail/order-detail.component";


const appRoutes: Routes = [
    {
        path: '',
        component: FrontLayoutComponent,
        children: [
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'cart', component: CartComponent },
            { path: 'news', component: NewsComponent },
            { path: 'about-us', component: AboutComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'success', component: SucccessComponent },
            { path: 'access-denied', component: PermissionComponent },
            { path: 'product-collector', component: ProductCollectorComponent },
            { path: 'news-detail/:id', component: NewsDetailComponent },
            { path: 'product-detail/:id', component: ProductDetailComponent },
        ]
    },
    {
        path: '',
        component: BackLayoutComponent,
        children: [
            { path: 'admin', component: AdminComponent },
            { path: 'categories', component: CategoryIndexComponent, canActivate: [AdminGuardGuard] },
            { path: 'publishers', component: PublisherIndexComponent, canActivate: [AdminGuardGuard] },
            { path: 'genres', component: GenreIndexComponent, canActivate: [AdminGuardGuard] },
            { path: 'books/create', component: BookCreateComponent, canActivate: [AdminGuardGuard] },
            { path: 'books/detail/:id', component: BookDetailComponent },
            { path: 'books', component: BookListComponent },
            { path: 'books/update/:id', component: BookEditComponent },
            { path: 'books/filter', component: BookFilterComponent },
            { path: 'books/list', component: BookListComponent},
            { path: 'books/:id/Photos', component: PhotoUploadComponent }
        ]
    },
    {
        path: '',
        component: NonLayoutComponent,
        children: [
            { path: 'admin/login', component: LoginAdminComponent },
            { path: 'admin/register', component: RegisterAdminComponent },
            { path: 'admin/changepassword', component: ChangePasswordComponent }
        ]
    },
    {
        path: '',
        component: ProfileDashboardComponent,
        children: [
            { path: 'user/account', component: ProfileComponent},
            { path: 'user/account/address', component: AddressIndexComponent },
            { path: 'user/account/address/create', component: AddressCreateComponent },
            { path: 'user/account/address/update/:id', component: AddressUpdateComponent },
            { path: 'user/account/orders', component: OrderListComponent  },
            { path: 'user/account/orders/detail/:id', component: OrderDetailComponent}
        ]
    },
    { path: '**', component: NotFoundComponent }



];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { anchorScrolling: 'enabled' })],
    exports: [RouterModule]
})

export class AppRoutingModule { }
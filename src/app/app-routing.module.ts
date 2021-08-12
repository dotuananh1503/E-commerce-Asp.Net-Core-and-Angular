import { identifierModuleUrl } from "@angular/compiler";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { AdminGuardGuard } from "./admin-guard.guard";
import { AdminComponent } from "./admin/admin.component";
import { AppComponent } from "./app.component";
import { BookCreateComponent } from "./book/book-create/book-create.component";
import { BookDetailComponent } from "./book/book-detail/book-detail.component";
import { BookEditComponent } from "./book/book-edit/book-edit.component";
import { BookFilterComponent } from "./book/book-filter/book-filter.component";
import { BookListComponent } from "./book/book-list/book-list.component";
import { CartComponent } from "./cart/cart.component";
import { CategoryEditComponent } from "./category/category-edit/category-edit.component";
import { CategoryIndexComponent } from "./category/category-index/category-index.component";
import { CategoryUpdateComponent } from "./category/category-update/category-update.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ContactComponent } from "./contact/contact.component";
import { SucccessComponent } from "./contact/succcess/succcess.component";
import { GenreCreateComponent } from "./genre/genre-create/genre-create.component";
import { GenreEditComponent } from "./genre/genre-edit/genre-edit.component";
import { GenreIndexComponent } from "./genre/genre-index/genre-index.component";
import { HomeComponent } from "./home/home.component";
import { LoginAdminComponent } from "./security/login-admin/login-admin.component";
import { LoginComponent } from "./security/login/login.component";
import { NewsDetailComponent } from "./news/news-detail/news-detail.component";
import { NewsEditComponent } from "./news/news-edit/news-edit.component";
import { NewsComponent } from "./news/news.component";
import { PermissionComponent } from "./permission/permission.component";
import { ProductCollectorComponent } from "./product/product-collector/product-collector.component";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";
import { ProductListComponent } from "./product/product-list/product-list.component";
import { ProfileComponent } from "./security/profile/profile.component";
import { PublisherCreateComponent } from "./publisher/publisher-create/publisher-create.component";
import { PublisherEditComponent } from "./publisher/publisher-edit/publisher-edit.component";
import { PublisherIndexComponent } from "./publisher/publisher-index/publisher-index.component";
import { RegisterAdminComponent } from "./security/register-admin/register-admin.component";
import { RegisterComponent } from "./security/register/register.component";
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { BackLayoutComponent } from "./_layout/back-layout/back-layout.component";
import { FrontLayoutComponent } from "./_layout/front-layout/front-layout.component";
import { NonLayoutComponent } from "./_layout/non-layout/non-layout.component";
import { ChangePasswordComponent } from "./security/change-password/change-password.component";
import { PhotoUploadComponent } from "./utilities/photo-upload/photo-upload.component";
import { AddressComponent } from "./security/address/address.component";


const appRoutes: Routes = [
    {
        path: '',
        component: FrontLayoutComponent,
        children: [
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'profile', component: ProfileComponent },
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
            { path: 'user/address', component: AddressComponent }
        ]
    },
    {
        path: '',
        component: BackLayoutComponent,
        children: [
            { path: 'admin', component: AdminComponent },
            { path: 'categories', component: CategoryIndexComponent, canActivate: [AdminGuardGuard] },
            { path: 'categories/create', component: CategoryEditComponent },
            { path: 'categories/update/:id', component: CategoryUpdateComponent },
            { path: 'publishers/create', component: PublisherCreateComponent },
            { path: 'publishers', component: PublisherIndexComponent },
            { path: 'publishers/update/:id', component: PublisherEditComponent },
            { path: 'genres/create', component: GenreCreateComponent },
            { path: 'genres', component: GenreIndexComponent },
            { path: 'genres/update/:id', component: GenreEditComponent },
            { path: 'books/create', component: BookCreateComponent },
            { path: 'books/detail/:id', component: BookDetailComponent },
            { path: 'books', component: BookListComponent },
            { path: 'books/update/:id', component: BookEditComponent },
            { path: 'books/filter', component: BookFilterComponent },
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
    { path: '**', component: NotFoundComponent }



];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FilterPipe } from "./filter.pipe";
import { MoneyPipe } from "./money.pipe";

@NgModule({
    declarations: [
        MoneyPipe,
        FilterPipe
    ],
    imports: [
        CommonModule
    ],
    entryComponents: [
        MoneyPipe,
        FilterPipe
    ],
    exports: [
        MoneyPipe,
        FilterPipe
    ]
})

export class PipesModule{}
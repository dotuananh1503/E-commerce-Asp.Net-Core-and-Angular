import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "../product/product.model";


@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform{
    transform(value: Product[], searchTerm: string): Product[]{
        if (!value || !searchTerm) {
            return value;
        }
        return value.filter(result => result.productname.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));      
    }
}

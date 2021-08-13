import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { bookDTO } from 'src/app/book/book.model';
import { GenresService } from 'src/app/genre/genre.service';
import { CategoryServicce } from 'src/app/category/category.service';
import { BookService } from 'src/app/book/book.service';
import { PublisherService } from 'src/app/publisher/publisher.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { genreDTO } from 'src/app/genre/genre.model';
import { categoryDTO } from 'src/app/category/category.model';
import { publisherDTO } from 'src/app/publisher/publisher.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';


@Component({
  selector: 'app-product-collector',
  templateUrl: './product-collector.component.html',
  styleUrls: ['./product-collector.component.css']
})
export class ProductCollectorComponent implements OnInit {


  constructor(private genreService: GenresService, private categoryService: CategoryServicce,
    private publisherService: PublisherService, private bookService: BookService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location) { }


  form: FormGroup;
  formSort: FormGroup;

  genres: genreDTO[];
  categories: categoryDTO[];
  publishers: publisherDTO[];

  books: bookDTO[];
  currentPage = 1;
  recordsPerPage = 10;
  initialFormValues: any;
  page = 1;
  pageSize = 5;

  sortSelection: multipleSelectorModel[] = [
    { key: 1, value: "nameatoz" },
    { key: 2, value: "nameztoa" },
    { key: 3, value: "priceatoz" },
    { key: 4, value: "priceztoa" },
    { key: 5, value: "dateatoz" },
    { key: 6, value: "dateztoa" }
  ]

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      genreId: 0,
      categoryId: 0,
      publisherId: 0,
      sortBy: '',
      priceFilter1: false,
      priceFilter2: false,
      priceFilter3: false,
      priceFilter4: false
    });

    this.formSort = this.formBuilder.group({
      sortValue: 'nameatoz'
    })

    this.initialFormValues = this.form.value;
    this.readParametersFromURL();

    this.genreService.getAll().subscribe(genres => {
      this.genres = genres;

      this.filterBooks(this.form.value);

      this.form.valueChanges.subscribe(values => {
        this.filterBooks(values);
        this.writeParametersInURL();
      })
    });

    this.categoryService.getCat().subscribe(categories => {
      this.categories = categories;

      this.filterBooks(this.form.value);

      this.form.valueChanges.subscribe(values => {
        this.filterBooks(values);
        this.writeParametersInURL();
      })
    });

    this.publisherService.get(this.page, this.pageSize).subscribe((response: HttpResponse<publisherDTO[]>) => {
      this.publishers = response.body;

      this.filterBooks(this.form.value);

      this.form.valueChanges.subscribe(values => {
        this.filterBooks(values);
        this.writeParametersInURL();
      })


    });



  }

  filterBooks(values: any) {
    values.page = this.currentPage;
    values.recordsPerPage = this.recordsPerPage;
    this.bookService.filter(values).subscribe((response: HttpResponse<bookDTO[]>) => {
      this.books = response.body;

    })
  }

  onChangeValue(event) {
    console.log(event.target.value);
    this.sortBook(event.target.value);
  }


  sortBook(direction: string) {
    this.bookService.sort(direction).subscribe((response) => {
      this.books = response;
    })
  }

  private readParametersFromURL() {
    this.activatedRoute.queryParams.subscribe(params => {
      var obj: any = {};

      if (params.name) {
        obj.name = params.name;
      }

      if (params.genreId) {
        obj.genreId = Number(params.genreId);
      }

      if (params.categoryId) {
        obj.categoryId = Number(params.categoryId);
      }

      if (params.publisherId) {
        obj.publisherId = Number(params.publisherId);
      }


      /*       if (params.page){
              this.currentPage = params.page;
            }
      
            if (params.recordsPerPage){
              this.recordsPerPage = params.recordsPerPage;
            } */

      this.form.patchValue(obj);
    });
  }

  private writeParametersInURL() {
    const queryStrings = [];

    const formValues = this.form.value;

    if (formValues.name) {
      queryStrings.push(`name=${formValues.name}`);
    }

    if (formValues.genreId != '0') {
      queryStrings.push(`genreId=${formValues.genreId}`);
    }

    if (formValues.categoryId != '0') {
      queryStrings.push(`categoryId=${formValues.categoryId}`);
    }

    if (formValues.publisherId != '0') {
      queryStrings.push(`publisherId=${formValues.publisherId}`);
    }

    if (formValues.filterPrice1) {
      queryStrings.push(`priceFilter1=${formValues.priceFilter1}`);
    }

    if (formValues.filterPrice2) {
      queryStrings.push(`priceFilter2=150000,300000`);
    }

    if (formValues.filterPrice3) {
      queryStrings.push(`priceFilter3=300000,500000`);
    }

    if (formValues.filterPrice4) {
      queryStrings.push(`priceFilter4=500000,700000`);
    }

    this.location.replaceState('product-collector', queryStrings.join('&'));

    /*     queryStrings.push(`page=${this.currentPage}`);
        queryStrings.push(`recordsPerPage=${this.recordsPerPage}`); */

  }



  clearForm() {
    this.form.patchValue(this.initialFormValues);
  }



}

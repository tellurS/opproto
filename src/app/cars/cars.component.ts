import { Component } from '@angular/core';
import { CarService } from './car.service';
import { Car } from './car';
import {InputText,DataTable,Button,Dialog,Column,Header,Footer} from 'primeng/primeng';

@Component({
  selector: 'cars',
  styles: [`
  `],
  directives: [InputText,DataTable,Button,Dialog,Column,Header,Footer],
  providers: [
    CarService
  ],
  template: `
    <h1>Cars</h1>\n\

    <h3 class="first">Basic</h3>
    <p-dataTable [value]="cars">
        <p-column field="vin" header="Vin"></p-column>
        <p-column field="year" header="Year"></p-column>
        <p-column field="brand" header="Brand"></p-column>
        <p-column field="color" header="Color"></p-column>
    </p-dataTable>

    <h3>Dynamic Columns</h3>
    <p-dataTable [value]="cars">
        <p-column *ngFor="let col of cols" [field]="col.field" [header]="col.header"></p-column>
    </p-dataTable>
`
})
export class Cars {
 

    cars: Car[];
    
    cols: any[];
    
    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().subscribe(cars => this.cars = cars);
        
        this.cols = [
            {field: 'vin', header: 'Vin'},
            {field: 'year', header: 'Year'},
            {field: 'brand', header: 'Brand'},
            {field: 'color', header: 'Color'}
        ];
    }

}



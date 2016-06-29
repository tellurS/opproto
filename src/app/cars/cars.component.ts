import { Component } from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';

import { CarService } from './car.service';
import { Car } from './car';
import {InputText, DataTable, Button, Dialog, Column, Header, Footer, MenuItem,Growl,Message,ContextMenu,SelectItem,MultiSelect} from 'primeng/primeng';

@Component({
    selector: 'cars',
    directives: [InputText, DataTable, Button, Dialog, Column, Header, Footer,Growl,ContextMenu,MultiSelect],
    providers: [
        CarService
    ],
    template: require('./cars.html')
})
export class Cars {


    cars: Car[];

    cols: any[];
    columnOptions: SelectItem[];    
    contextMenu: MenuItem[];
    carsCount: Number;
    selectedCars: Car[];
    msgs: Message[];
    
    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().subscribe(cars => {
            this.cars = cars;
            this.carsCount = this.cars.length;
        }
        );

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
        
        this.contextMenu = [
            {label: 'View', icon: 'fa-search', command: (event) => this.viewCar(this.selectedCars)},
            {label: 'Delete', icon: 'fa-close', command: (event) => this.deleteCar(this.selectedCars)}
        ];

        this.columnOptions = [];
        for(let i = 0; i < this.cols.length; i++) {
                    this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
        }        
    }

    viewCar(cars: Car[]) {
        if (cars.length){
            this.msgs = [];        
            this.msgs.push({ severity: 'info', summary: 'Car Selected', detail: cars[0].vin + ' - ' + cars[0].brand });
        }
    }

    deleteCar(cars: Car[]) {//0
        let index = -1;
        for (let i = 0; i < this.cars.length; i++) {
            if (this.cars[i].vin == cars[0].vin) {
                index = i;
                break;
            }
        }
        this.cars.splice(index, 1);

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Car Deleted', detail: cars[0].vin + ' - ' + cars[0].brand });
    }

}



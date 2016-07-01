import { Component,Input } from '@angular/core';

import { CarService } from './car.service';
import { CarFull } from './car';
import {InputText, DataTable, Button, Dialog, Column, Header, Footer, MenuItem,Growl,Message,ContextMenu,SelectItem,MultiSelect,LazyLoadEvent} from 'primeng/primeng';

@Component({
    selector: 'carsDetail',
    directives: [InputText, DataTable, Button, Dialog, Column, Header, Footer,Growl,ContextMenu,MultiSelect],
    providers: [
        CarService
    ],
    template: require('./carDetail.html')
})
export class CarDetail{
    @Input() id:Number;
    carFull:CarFull;  
    constructor(private carService: CarService) { }

    ngOnInit() {
        this.load();
    }
    load() {

        this.carService.getCar(this.id).subscribe(car => this.carFull=car);      
    }
    
        
 
}

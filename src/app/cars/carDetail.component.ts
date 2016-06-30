import { Component,Input } from '@angular/core';

import { CarService } from './car.service';
import { Car } from './car';
import {InputText, DataTable, Button, Dialog, Column, Header, Footer, MenuItem,Growl,Message,ContextMenu,SelectItem,MultiSelect,LazyLoadEvent} from 'primeng/primeng';

@Component({
    selector: 'carsDetail',
    directives: [InputText, DataTable, Button, Dialog, Column, Header, Footer,Growl,ContextMenu,MultiSelect],
    providers: [
        CarService
    ],
    template: require('./carsDetail.html')
})
export class CarDetail{
    @Input() id:Number;
    car:Car;  
    constructor(private carService: CarService) { }

    ngOnInit() {
    }
    load() {
        console.log("log",this.id);
        this.carService.getCar(this.id).subscribe(car => this.car=car);
       
    }
    
        
 
}

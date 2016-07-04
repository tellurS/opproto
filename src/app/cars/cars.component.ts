import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"

import { CarService } from './car.service';
import { Car } from './car';
import { CarDetail } from './carDetail.component';
import {InputText, DataTable, Button, Dialog, Column, Header, Footer, MenuItem,Growl,Message,ContextMenu,SelectItem,MultiSelect,LazyLoadEvent} from 'primeng/primeng';

@Component({
    selector: 'cars',
    directives: [InputText, DataTable, Button, Dialog, Column, Header, Footer,Growl,ContextMenu,MultiSelect,CarDetail],
    providers: [
        CarService
    ],
    template: require('./cars.html')
})
export class Cars{


    cars: Car[];

    cols: any[];
    columnOptions: SelectItem[];    
    contextMenu: MenuItem[];
    carsCount: Number;
    selectedCars: Car[];
    msgs: Message[];
    sortField:string;
    sortOrder:string;
    multiSortMeta:any;
    
    constructor(private carService: CarService,private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        /*
        this.carService.getCarsSmall().subscribe(cars => {
            this.cars = cars;
            this.calulateLenght();
        });*/
  
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
        console.log(this.route.snapshot);
        if(this.route.snapshot.params["field"]&&this.route.snapshot.params["order"]){
            this.sortField=this.route.snapshot.params["field"];
            this.sortOrder=this.route.snapshot.params["order"];
        }
        if(this.route.snapshot.params["multiSortMeta"]){
            this.multiSortMeta=JSON.parse(this.route.snapshot.params["multiSortMeta"]);
        }
    }
    calulateLenght(){
        this.carService.getCarsSmallCount().subscribe(count => this.carsCount=count);
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
        this.calulateLenght();
        
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Car Deleted', detail: cars[0].vin + ' - ' + cars[0].brand });
    };
    loadServer(event: LazyLoadEvent) {
        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

        this.carService.getCarsSmallFilter(event.first, event.rows, event.sortField, event.sortOrder, event.filters).subscribe(cars => {
            this.cars = cars;
            this.calulateLenght();
        });
    };   
 
    param={};
    open=[];
    navigate(update:any) {
        Object.assign(this.param, update||{});
        this.router.navigate(["/cars", this.param]);        
    }
    onPage(event:any) {
        console.log("onPage");         
        this.navigate(event);
    }    
    onSort(event:any){
        console.log("onSort"); 
        this.navigate(event);
    }
    onFilter(event:any){
        console.log("onFilter"); 
        this.navigate({filters:JSON.stringify(event.filters)});
    }   
    
    detail(row:any,mode:boolean=true){        
        console.log("detail",row,mode)
        
        if(this.open.indexOf(row.id)==-1&&mode)
            this.open.push(row.id);
        if(this.open.indexOf(row.id)>-1&&!mode)
            this.open.splice(this.open.indexOf(row.id), 1);        
            
        this.navigate({open:this.open});
    }     
    /*todo
     * clear
     * expand,page,filter in pull request
     * filter mode,filter templae in pull request
    */
}

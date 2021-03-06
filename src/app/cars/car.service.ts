import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import {URLSearchParams} from '@angular/http';

import { Car,CarColor,CarFull } from './car';
 import 'rxjs/Rx';
   
@Injectable()
export class CarService {
    private carsData={"data":[        
            {"brand": "VW", "year": 2012, "colorId": 1, "vin": "dsad231ff",id:1},
            {"brand": "Audi", "year": 2011, "colorId": 2, "vin": "gwregre345",id:2},
            {"brand": "Renault", "year": 2005, "colorId": 3, "vin": "h354htr",id:3},
            {"brand": "BMW", "year": 2003, "colorId": 2, "vin": "j6w54qgh",id:4},
            {"brand": "Mercedes", "year": 1995, "colorId": 2, "vin": "hrtwy34",id:5},
            {"brand": "Volvo", "year": 2005, "colorId": 1, "vin": "jejtyj",id:6},
            {"brand": "Honda", "year": 2012, "colorId": 1, "vin": "g43gr",id:7},
            {"brand": "Jaguar", "year": 2013, "colorId": 3, "vin": "greg34",id:8},
            {"brand": "Ford", "year": 2000, "colorId": 3, "vin": "h54hw5",id:9},
            {"brand": "Fiat", "year": 2013, "colorId": 1, "vin": "245t2s",id:10}
           ]};
    private carsColor={"data":[        
            {"colorId": 1, "color": "Red"},
            {"colorId": 2, "color": "Blue"},
            {"colorId": 3, "color": "Black"},
           ]};           
           
    constructor(/*private http: Http*/) {}
    
    
    getCarsSmall():Observable <Car[]> {
        /*this.http.get('/showcase/resources/data/cars-small.json')
                 .retry(5)
                 .map(res => res.json())
                */
                
        this.getCarsColor().subscribe(r=> Car.colors=r);
        
        return Observable.of(this.carsData)
               .map(res => res.data.map(el => new Car(el))).delay(400); 
    }    
    getCar(id):Observable <CarFull> {    
         console.log("getCar:"+id);          
         return Observable.of(this.carsData)
               .map(
                      res => (res.data.filter(el => el.id===id).map(el => new CarFull(el)))[0]
               //res=>new CarFull(this.carsData.data[0])
               ).delay(800); 
    }        
    getCarsSmallFilter(first:number,row:number, sortField:string, sortOrder:number, filters:any):Observable <Car[]> {
        let params = new URLSearchParams();
        params.set('first', ''+first);
        params.set('row', ''+row);
        params.set('sortField', sortField);
        params.set('sortOrder', ''+sortOrder);
        params.set('filters', ''+JSON.stringify(filters));
        console.log("getCarsSmallFilter",params.toString());
        //this.http.get('/showcase/resources/data/cars-small.json',{ search: params });
        
        this.getCarsColor().subscribe(r=> Car.colors=r);
        
        return Observable.of(this.carsData)
               .map(res => res.data.slice(first,first+row).map(el => new Car(el))).delay(400); 
    }            
    getCarsSmallCount():Observable <Number> {
        return Observable.of(this.carsData)
               .map(res => res.data.length).delay(200); 
    }                    
        
        
    getCarsColor():Observable <CarColor[]> {
        return Observable.of(this.carsColor)
               .map(res => res.data.map(e => new CarColor(e))).delay(1000); 
    }        
    
}

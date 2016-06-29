import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Car } from './car';
 import 'rxjs/Rx';
   
@Injectable()
export class CarService {
    data={"data":[        
            {"brand": "VW", "year": 2012, "color": "White", "vin": "dsad231ff"},
            {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
            {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
            {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
            {"brand": "Mercedes", "year": 1995, "color": "White", "vin": "hrtwy34"},
            {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
            {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
            {"brand": "Jaguar", "year": 2013, "color": "White", "vin": "greg34"},
            {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
            {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s"}
           ]};
    constructor(/*private http: Http*/) {}

    getCarsSmall():Observable <Car[]> {
        /*this.http.get('/showcase/resources/data/cars-small.json')
                 .retry(5)
                 .map(res => res.json())
                */
        return Observable.of(this.data)
            .map(res => <Car[]> res.data);
        }
}
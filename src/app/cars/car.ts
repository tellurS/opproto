export class CarData{
    vin:string;
    year:number;
    brand:string;
    colorId:number
}

export class Car extends CarData{    
    private static id2color:any={};        
    public static set colors(colors:CarColor[]){
        colors.map(e => Car.id2color[e.colorId] = e.color);
    }
    
    public get color():String{
        return Car.id2color[this.colorId]||"not setting";
    }
    constructor(data:any) { 
        super();
        Object.assign(this, data);
    }
}

export class CarColorData{
    colorId:number;
    color:string;
}

export class CarColor extends CarColorData{    
    constructor(data:any) { 
        super();
        Object.assign(this, data);
    }
}

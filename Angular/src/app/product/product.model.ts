export class Product {
    public id?: string;
    public productname: string;
    public desc: string;
    public price: number;
    public brand: string;
    public country: string;
    public concentration: string;
    public capacity: string;
    public bottled: string;
    public imagePath: string;
    constructor(id: string, productname: string, desc: string, price: number, brand: string, country: string, concentration: string, capacity: string, bottled: string,  imagePath: string) {
        this.id = id;
        this.productname = productname;
        this.desc = desc;
        this.price = price;
        this.brand = brand;
        this.country = country;
        this.concentration = concentration;
        this.capacity = capacity;
        this.bottled = bottled;
        this.imagePath = imagePath;
    }
}
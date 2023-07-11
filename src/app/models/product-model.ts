import { ImageModel } from "./images-model";
import { ProductCategoryModel } from "./product-category";

export class ProductModel {
    id: number;
    description: string;
    name: string;
    images: ImageModel[];
    price: number;
    categories: ProductCategoryModel[];

    constructor(id: number,
        description: string,
        name: string,
        images: ImageModel[],
        price: number,
        categories: ProductCategoryModel[]){
            this.id = id;
            this.description = description;
            this.name = name;
            this.images = images;
            this.price = price;
            this.categories = categories;
        }
}
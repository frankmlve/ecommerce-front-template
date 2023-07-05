import { CarouselItem } from "./carousel-item";

export class BannerModel {
    id: number;
    attributes: CarouselItem[]
    constructor(
        id: number,
        attributes: CarouselItem[]
    ){
        this.id = id
        this.attributes = attributes
    }
     toEntity(object: any) {
        return new BannerModel(object.id,
            object.attributes)
     } 
}
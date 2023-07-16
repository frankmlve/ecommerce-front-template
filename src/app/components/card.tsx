import { ImageError } from "next/dist/server/image-optimizer";
import Image from "next/image";
import { ProductModel } from "../models/product-model";
import { ImageModel } from "../models/images-model";
import { ProductCategoryModel } from "../models/product-category";
import CarouselV2 from "./carouselV2";

export default function Card(props: any) {
    const product = props.product as ProductModel
    return (
        <>
            
            <div className="card" key={`card-${product.id}`} >
                <CarouselV2 images={product} isThumbnail={props.isThumbnail} indicators={props.indicators}/>
                <div className="card-body" onClick={() => props.handleClick(props.id)}>
                    <h5 className="card-title">{product.name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{`$${product.price}`}</h6>
                    <p className="card-text">{product.description}</p>
                    {product.categories.map((category: ProductCategoryModel) => <span className="badge bg-secondary" key={`category-${category.id}`}>{category.name}</span>)}
                </div>
            </div>
            
        </>
    )
}
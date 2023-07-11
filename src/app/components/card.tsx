import { ImageError } from "next/dist/server/image-optimizer";
import Image from "next/image";
import { ProductModel } from "../models/product-model";
import { ImageModel } from "../models/images-model";
import { ProductCategoryModel } from "../models/product-category";

export default function Card(props: any) {
    const product = props.product as ProductModel
    return (
        <>
            {product.images.map((image: ImageModel) => 
            <div className="card" key={`card-${product.id}`} onClick={() => props.handleClick(props.id)}>
                {props.isThumbnail ? <Image src={image.thumbnail.url} alt={image.altText} width={image.thumbnail.width} height={image.thumbnail.height} className="card-img-top"/> :
                <Image src={image.url} alt={image.altText} width={image.width} height={image.height} className="card-img-top img-thumbnail"/>}
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{`$${product.price}`}</h6>
                    <p className="card-text">{product.description}</p>
                    {product.categories.map((category: ProductCategoryModel) => <span className="badge bg-secondary" key={`category-${category.id}`}>{category.name}</span>)}
                </div>
            </div>
            )}
        </>
    )
}
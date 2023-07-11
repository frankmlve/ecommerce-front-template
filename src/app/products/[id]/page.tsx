'use client'

import { ImageModel } from "@/app/models/images-model";
import { ProductCategoryModel } from "@/app/models/product-category";
import { ProductModel } from "@/app/models/product-model"
import { Thumbnail } from "@/app/models/thumbnail";
import { getProductById } from "@/app/services/products-service";
import Image from "next/image";
import React, { useEffect } from "react"

export default function Product({params}: {params: {id: number}}) {
    const [product, setProduct] = React.useState<ProductModel>();
    const baseApiUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL
    useEffect(() => {
        getProductById(params.id).then(({data}) => {
            generateProduct(data.data)
            console.log(product)
        })

    }, [])
    function generateProduct(data: any) {
        let productCategoryList: ProductCategoryModel[] = []
            let imgList: ImageModel[] = []
            data.attributes.Imagenes.data.forEach((img: any) => {
                let thumbnail: Thumbnail = new Thumbnail(createImgUrl(img.attributes.formats.thumbnail.url),
                    img.attributes.formats.thumbnail.height,
                    img.attributes.formats.thumbnail.width)
                imgList.push(new ImageModel(img.id,
                    createImgUrl(img.attributes.url),
                    img.attributes.alternativeText,
                    img.attributes.caption,
                    thumbnail,
                    img.attributes.width,
                    img.attributes.height)
                )
            })
            data.attributes.categories.data.forEach((category: any) => {
                productCategoryList.push(new ProductCategoryModel(category.id, category.attributes.name))
            })
            setProduct(new ProductModel(data.id,
                data.attributes.Descripcion,
                data.attributes.Nombre,
                imgList,
                data.attributes.Precio,
                productCategoryList)
            )
        }
    const createImgUrl = ((imgPath: string) => {
        return baseApiUrl + imgPath
    })
    return (
        <div className="container">
            {product ? 
            <div className="row">
                <div className="col">
                    {product.images.map((image, index) => 
                        <Image src={image.url} 
                            alt={image.altText} 
                            height={300} 
                            width={500}
                            key={`product-image-${image.id}`}
                            className={index == 0 ? 'mainImage' : 'miniImage'}/>
                    )}
                </div>
                <div className="col">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <span>{`$${product.price}`}</span>
                </div>
            </div>
            : null}
        </div>
    )
}
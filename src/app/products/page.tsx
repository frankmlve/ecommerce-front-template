"use client"
import { useEffect } from "react";
import { ProductModel } from "../models/product-model";
import React from "react";
import { getAllProducts } from "../services/banners-service";
import { ImageModel } from "../models/images-model";
import { ProductCategoryModel } from "../models/product-category";
import { Thumbnail } from "../models/thumbnail";
import Card from "../components/card";
import Link from "next/link"
import { redirect, useRouter } from "next/navigation";

export default function ProductsPage() {
    const baseApiUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL
    const [products, setProducts] = React.useState<ProductModel[]>([])
    const router = useRouter()
    useEffect(() => {
            getAllProducts({'pagination[page]': 1, 'pagination[pageSize]': 5}).then(({data}) => {
                generateProductList(data)
            })
    }, [])
    function generateProductList(data: any) {
        let productList: ProductModel[] = []
        let productCategoryList: ProductCategoryModel[] = []
        data.data.forEach((product: any) => {
            let imgList: ImageModel[] = []
            product.attributes.Imagenes.data.forEach((img: any) => {
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
            product.attributes.categories.data.forEach((category: any) => {
                productCategoryList.push(new ProductCategoryModel(category.id, category.attributes.name))
            })
            productList.push(new ProductModel(product.id,
                product.attributes.Descripcion,
                product.attributes.Nombre,
                imgList,
                product.attributes.Precio,
                productCategoryList)
            )
        })
        setProducts(productList)
    }
    const createImgUrl = ((imgPath: string) => {
        return baseApiUrl + imgPath
    })
    const goToProduct = (id: number) => {
        router.push(`/products/${id}`)
    }
    return (
        <div className="container d-flex justify-content-evenly w-75">
            {products.map((prod, index) => <Card product={prod} 
                handleClick={() => goToProduct(prod.id)}
                id={prod.id}
                isThumbnail={false}
                key={prod.id}/>
             )}
        </div>
    )
}
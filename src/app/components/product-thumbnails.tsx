import React, { useEffect } from "react"
import { getAllProducts } from "../services/banners-service"
import Card from "./card"
import { ProductModel } from "../models/product-model"
import { ImageModel } from "../models/images-model"
import { Thumbnail } from "../models/thumbnail"
import { ProductCategoryModel } from "../models/product-category"
import { getAllCategories } from "../services/categories-service"
import Link from "next/link"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProductThumbnails() {
    const [products, setProducts] = React.useState<ProductModel[]>([]);
    const [categories, setCategories] = React.useState<ProductCategoryModel[]>([]);
    const baseApiUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL

    const createImgUrl = ((imgPath: string) => {
        return baseApiUrl + imgPath
    })

    useEffect(() => {
        getAllProducts({'pagination[page]': 1, 'pagination[pageSize]': 5}).then(({data}) => {
            generateProductList(data)
        }, error => {
            console.error(error)
        })

        getAllCategories().then(({data}) => {
            let categoryList: ProductCategoryModel[] = [];
            data.data.forEach((category: any) => categoryList.push(new ProductCategoryModel(category.id, category.attributes.name)))
            setCategories(categoryList)
            
        }, error => {
            console.error(error)
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
    return (
        <>
            {categories.map((category: ProductCategoryModel) => 
            <div key={`cat-row-${category}`} className="mt-5 d-flex flex-column mb-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                <h3>{category.name}</h3>
                <div className="row mt-5 d-flex justify-content-center align-items-center">
                    {products.filter(prod => prod.categories.flatMap(({id}) => id).includes(category.id)).map((product) => 
                        <div className="col-sm-3 mb-3 mb-sm-0" key={product.id}>
                            <Card product={product}
                            handleClick={() => {}}/>
                        </div>
                    )}
                    <Link href={'/products'} className="w-auto"><span>More</span></Link>
                </div>
            </div>
            )}
        </>
    )


}
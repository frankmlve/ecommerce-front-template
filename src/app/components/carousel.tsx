'use client'
import React, { useEffect } from "react"
import { allBanners } from "../services/banners-service"
import Image from "next/image"
import { CarouselItem } from "../models/carousel-item"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Carousel() {
    const baseApiUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL
    const [banners, setBanners] = React.useState<CarouselItem[]>([])
    const bannerImages: CarouselItem[] = []

    useEffect(() => {
        let ignore = false;
        allBanners().then(({data}) => {
            data.data.forEach((carousel: any) => {
                carousel.attributes.carousel.data.forEach((image: any) => {
                    bannerImages.push(new CarouselItem(image.id, 
                        image.attributes.name, 
                        image.attributes.alternativeText, 
                        image.attributes.url,
                        image.attributes.mime,
                        carousel.attributes.descripcion,
                        carousel.attributes.titulo,
                        image.attributes.caption))
                })            
             setBanners(bannerImages)
            })
            return () => {
                ignore = true;
              };
        }, error => {
            console.error(error)
        })
    }, []);

    const createImgUrl = ((imgPath: string) => {
        return baseApiUrl + imgPath
    });
 return (
    <div id="carouselExampleCaptions" className="carousel slide carousel-dark">
        <div className="carousel-inner">
            {banners.map( (banner: CarouselItem) => 
                <div className={"carousel-item " + (banner.id === 1 ? 'active' : '')} key={banner.id}>
                        <Image src={createImgUrl(banner.url)} 
                        alt={banner.alternativeText} 
                        className="d-block w-100" 
                        width={500}
                        height={500}
                        />
                        <div className="carousel-caption d-none d-md-block">
                            <p>{banner.caption}</p>
                        </div>
                </div>
            )}
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>
 )   
}
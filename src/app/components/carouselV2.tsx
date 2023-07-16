'use client'
import Image from "next/image";
import { ImageModel } from "../models/images-model";

export default function CarouselV2(props: any) {
    const images = props.images.images.sort((a: any, b: any) => a.id - b.id)
    return (
        <div id="carouselContainer" className="carousel slide" data-ride="carousel">
            {props.indicators ?
                <ol className="carousel-indicators">
                 {images.length > 0 ? images.map((image: ImageModel, index: number) => 
                    <li data-target="#carouselContainer" data-slide-to={index} className={index === 0 ? 'active' : ''} key={`indicator-${index}`}>
                        <Image src={image.thumbnail.url} alt={image.altText} width={100} height={100} key={`indicator-${index}`}/>
                    </li> 
                ) : null}
                </ol>: 
                null 
            }
            
            <div className="carousel-inner">
                {images.length > 0 ? images.map((image: ImageModel, index: number) =>
                    <div className={"carousel-item" + (index === 0 ? ' active' : '')} key={image.id}>
                        {props.isThumbnail ? 
                        <Image src={image.thumbnail.url} alt={image.altText} width={200} height={200} className="d-block w-100"/> :
                            <Image src={image.url} alt={image.altText} width={500} height={500} className="d-block w-100"/>}
                    </div>
                ) : null}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselContainer" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselContainer" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}
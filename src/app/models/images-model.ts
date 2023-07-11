import { Thumbnail } from "./thumbnail";

export class ImageModel {
    id: number;
    url: string;
    altText: string;
    caption: string;
    thumbnail: Thumbnail;
    width: number;
    height: number;

    constructor(id: number,
        url: string,
        altText: string,
        caption: string,
        thumbnail: Thumbnail,
        width: number,
        height: number){
            this.id = id;
            this.url = url;
            this.altText = altText;
            this.caption = caption;
            this.thumbnail = thumbnail;
            this.width = width;
            this.height = height;
        }
}
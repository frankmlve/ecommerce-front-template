export class CarouselItem {
    id: number;
    name: string;
    alternativeText: string;
    url: string;
    mime: string;
    description: string;
    title: string;
    caption: string;

    constructor(
        id: number,
        name: string,
        alternativeText: string,
        url: string,
        mime: string,
        description: string,
        title: string,
        caption: string
    ){
        this.id = id;
        this.name = name;
        this.alternativeText = alternativeText;
        this.url = url;
        this.mime = mime;
        this.description = description;
        this.title = title;
        this.caption = caption
    }
}
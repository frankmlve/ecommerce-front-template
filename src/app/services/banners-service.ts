import axios from "axios";

export const allBanners = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const token = process.env.NEXT_PUBLIC_API_KEY;
    return axios.get(`${apiUrl}/banners?populate=*`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getLogoData = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
    const apiKey = process.env.NEXT_PUBLIC_API_KEY
    return axios.get(`${apiUrl}/logo?populate=*`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
     
}

export const getAllProducts = async (params: any) => {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
    const apiKey = process.env.NEXT_PUBLIC_API_KEY
    params.populate = '*'
    return axios.get(`${apiUrl}/products`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }, 
        params: params
    })
}
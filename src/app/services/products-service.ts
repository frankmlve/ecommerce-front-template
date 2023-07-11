import axios from "axios"

export const getProductById = async (id: number) => {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
    const apiKey = process.env.NEXT_PUBLIC_API_KEY
    return axios.get(`${apiUrl}/products/${id}?populate=*`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })

}
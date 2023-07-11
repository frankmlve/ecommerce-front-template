import axios from "axios"

export const getAllCategories = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
    const apiKey = process.env.NEXT_PUBLIC_API_KEY
    return axios.get(`${apiUrl}/categories`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
}
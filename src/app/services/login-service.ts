import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
export const login = async (user: string, password: string) => {
    return await axios.post(`${apiUrl}/auth/local`,
        {
            identifier: user,
            password: password
        })
}

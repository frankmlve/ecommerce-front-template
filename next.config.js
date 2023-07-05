/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    env: {
        apiUrl: 'http://localhost:1337/api'
    },
    images: {
        domains: [
            'localhost'
        ]
    }
}

module.exports = nextConfig

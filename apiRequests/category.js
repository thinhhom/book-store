import http from '@/lib/http'

const catalogApiRequest = {
    getAllCatalog: () => http.get(`/api/getAllCategories`)
}

const catalogApiRequestAdmin = {
    getAllCatalog: () => http.get(`/api/getAllCategories`),
    addCatalog: (body) =>
        http.post(`/api/admin/storeCatalog`, body, {
            type: 'admin',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
}

export { catalogApiRequest, catalogApiRequestAdmin }

import http from '@/lib/http'

const productApiRequest = {
    bookDetail: (id) => http.get(`/api/getBookDetail/${id}`),
    getAllBooks: () => http.get(`/api/getAllBooks`),
    getNewBook: () => http.get(`/api/getNewBook`),
    getBookByCatalog: (id) => http.get(`/api/getBookByCategory/${id}`),
    getBooksBestSeller: () => http.get(`/api/best-sellers`),
    searchBook: (q) => http.get(`/api/books/search?query=${q}`),
    getBooksOrderPriceDesc: () => http.get(`/api/getBooksOrderPriceDesc`),
    getBooksOrderPriceAsc: () => http.get(`/api/getBooksOrderPriceAsc`),
    filterByPrice: (minPrice, maxPrice) =>
        http.get(`/api/filterByPrice?min_price=${minPrice}&max_price=${maxPrice}`)
}

const productApiRequestAdmin = {
    getAllBooks: () => http.get(`/api/getAllBooks`),
    searchProduct: (q) => http.get(`/api/books/search?query=${q}`),
    addBook: (body) => http.post(`/api/admin/storeBook`, body, { type: 'admin' }),
    destroyBook: (id) => http.delete(`/api/admin/deleteBook/${id}`, { type: 'admin' }),
    updateBook: (id, body) => http.post(`/api/admin/updateBook/${id}`, body, { type: 'admin' })
}

export { productApiRequest, productApiRequestAdmin }

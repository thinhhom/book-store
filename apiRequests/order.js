import http from '@/lib/http'

const orderApiRequest = {
    getAll: () => http.get(`/api/getAllOrder`, { type: 'admin' }),
    getOrderDetail: (order_id) => http.get(`/api/getOrderDetail/${order_id}`, { type: 'admin' }),
    searchOrder: (q) => http.get(`/api/search-orders?query=${q}`, { type: 'admin' }),
    updateStatus: (id, body) =>
        http.put(`/api/admin/updateOrderStatus/${id}`, body, { type: 'admin' })
}

export default orderApiRequest

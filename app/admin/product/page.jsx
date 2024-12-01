'use client'

import { productApiRequest, productApiRequestAdmin } from '@/apiRequests/product'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import SearchAdmin from '../components/search-admin'
import { ToastError } from '@/components/ui/ToastError'

export default function Product() {
    const [product, setProduct] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('')
    const [searchedQuery, setSearchedQuery] = useState('')

    const fetchProduct = async () => {
        const result = await productApiRequestAdmin.getAllBooks()
        setProduct(result.payload.data)
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        setError('')

        if (!query.trim()) {
            Swal.fire({
                title: 'Lỗi',
                text: 'Vui lòng nhập từ khóa tìm kiếm!',
                icon: 'warning',
                confirmButtonColor: '#3085d6'
            })
            return
        }

        if (loading) return
        setLoading(true)

        try {
            const result = await productApiRequest.searchBook(query)
            setProduct(result.payload.data)
            setSearchedQuery(query)
        } catch (error) {
            setError(`Không có sản phẩm nào cho từ khóa ${query}`)
            setSearchedQuery('')
        } finally {
            setLoading(false)
        }
    }

    const messageDelete = (id) => {
        Swal.fire({
            title: 'Bạn chắc muốn xóa sản phẩm này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, tôi muốn xóa'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await productApiRequestAdmin.destroyBook(id)

                if (response.status === 200) {
                    Swal.fire({
                        title: 'Xóa thành công',
                        text: 'Sản phẩm của bạn đã được xóa.',
                        confirmButtonColor: '#3085d6',
                        icon: 'success'
                    })
                    fetchProduct()
                } else {
                    Swal.fire({
                        title: 'Lỗi',
                        text: 'Có lỗi xảy ra khi xóa sản phẩm.',
                        confirmButtonColor: '#3085d6',
                        icon: 'error'
                    })
                }
            }
        })
    }

    // Hàm xóa sản phẩm
    const deleteProduct = (id) => {
        messageDelete(id)
    }

    const handleSearch = async (e) => {
        if (loading) return
        setLoading(true)
        setError('')
        e.preventDefault()

        if (!query.trim()) {
            // Nếu query trống, lấy toàn bộ sản phẩm
            await fetchProduct()
            setLoading(false)
            return
        }

        try {
            const result = await productApiRequestAdmin.searchProduct(query)
            setData(result.payload.data)
        } catch (error) {
            setError('Không tìm thấy sản phẩm!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <ToastError errorMessage={error} />
            <div id="content-page" className="content-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="iq-card">
                                <div className="iq-card-header d-flex justify-content-between">
                                    <div className="iq-header-title" style={{ display: 'flex' }}>
                                        <h4 className="card-title">Danh sách sách</h4>
                                        <SearchAdmin
                                            query={query}
                                            setQuery={setQuery}
                                            onSearch={handleSearch}
                                        />
                                    </div>
                                    <SearchProduct
                                        query={query}
                                        setQuery={setQuery}
                                        onSearch={handleSearch}
                                    />
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <a href="/admin/product/create" className="btn btn-primary">
                                            Thêm sách
                                        </a>
                                    </div>
                                </div>
                                <div className="iq-card-body">
                                    {searchedQuery && (
                                        <p>
                                            Kết quả tìm kiếm cho từ khóa "
                                            <strong>{searchedQuery}</strong>"
                                        </p>
                                    )}
                                    <div className="table-responsive">
                                        <table
                                            className="data-tables table table-striped table-bordered"
                                            style={{ width: '100%' }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th width="3%">STT</th>
                                                    <th width="12%">Hình ảnh</th>
                                                    <th width="15%">Tên sách</th>
                                                    <th width="15%">Thể loại sách</th>
                                                    <th width="15%">Tác giả sách</th>
                                                    <th width="18%">Mô tả sách</th>
                                                    <th width="5%">Số lượng</th>
                                                    <th width="10%">Giá</th>
                                                    <th width="15%">Hoạt động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {product.map((product, index) => (
                                                    <tr key={product.id}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <img
                                                                className="img-fluid rounded"
                                                                src={product.images[0]?.url}
                                                                alt={product.name}
                                                            />
                                                        </td>
                                                        <td>{product.name}</td>
                                                        <td>{product.category?.name}</td>
                                                        <td>{product.author.name}</td>
                                                        <td>
                                                            <p className="mb-0">
                                                                {product.short_summary}
                                                            </p>
                                                        </td>
                                                        <td>{product.stock}</td>
                                                        <td>
                                                            {parseFloat(
                                                                product.price
                                                            ).toLocaleString('vi-VN')}
                                                            đ
                                                        </td>
                                                        <td>
                                                            <div className="flex align-items-center list-user-action">
                                                                <Link
                                                                    className="bg-primary"
                                                                    data-toggle="tooltip"
                                                                    data-placement="top"
                                                                    title=""
                                                                    data-original-title="Edit"
                                                                    href={`/admin/product/update/${product.id}`}
                                                                >
                                                                    <i className="ri-pencil-line"></i>
                                                                </Link>
                                                                <Link
                                                                    className="bg-primary"
                                                                    data-toggle="tooltip"
                                                                    data-placement="top"
                                                                    title=""
                                                                    data-original-title="Xoá"
                                                                    href="#"
                                                                    onClick={() =>
                                                                        deleteProduct(product.id)
                                                                    }
                                                                >
                                                                    <i className="ri-delete-bin-line"></i>
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

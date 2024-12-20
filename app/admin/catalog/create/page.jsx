'use client'

import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { handleHttpError } from '@/lib/utils'
import { catalogApiRequestAdmin } from '@/apiRequests/category'

const getFileFromUrl = async (url) => {
    const res = await fetch(url)
    const blob = await res.blob()
    return new File([blob], 'image', { type: blob.type })
}

const categoryForm1Schema = z.object({
    name: z.string().min(1, { message: 'Nhập tên danh mục là bắt buộc' }),
    image: z
        .custom((v) => v instanceof File, {
            message: 'Image must be a valid file'
        })
        .refine((v) => v, { message: 'Nhập ảnh danh mục là bắt buộc' })
})

const CreateCatalog = ({ categories }) => {
    const [error, setError] = useState('')
    const router = useRouter()
    const [imagePreview, setImagePreview] = useState(null)

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting, isDirty }
    } = useForm({
        resolver: zodResolver(categoryForm1Schema),
        defaultValues: categories
            ? {
                name: categories.name,
                image: undefined
            }
            : {
                name: '',
                image: undefined
            }
    })

    useEffect(() => {
        if (categories?.image) {
            getFileFromUrl(categories.image).then((file) => {
                reset({ name: categories.name, image: file })
                setImagePreview(URL.createObjectURL(file))
            })
        }
    }, [categories, reset])

    const onSubmit = async (data) => {
        try {
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('image', data.image)

            const result = await catalogApiRequestAdmin.addCatalog(formData)

            if (result.status === 200) {
                router.push('/admin/catalog')
            }
        } catch (error) {
            handleHttpError(error, setError)
        }
    }

    return (
        <div id="content-page" className="content-page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between">
                                <div className="iq-header-title">
                                    <h4 className="card-title">Thêm danh mục</h4>
                                </div>
                            </div>
                            <div className="iq-card-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group">
                                        <label>Ảnh danh mục:</label>
                                        <div className="custom-file">
                                            <Controller
                                                style={{ width: 70, height: 100 }}
                                                name="image"
                                                control={control}
                                                render={({
                                                    field: { ref, name, onBlur, onChange }
                                                }) => (
                                                    <input
                                                        type="file"
                                                        className="custom-file-input"
                                                        ref={ref}
                                                        name={name}
                                                        onBlur={onBlur}
                                                        onChange={(e) => {
                                                            onChange(e.target.files?.[0])
                                                            if (e.target.files?.[0]) {
                                                                setImagePreview(
                                                                    URL.createObjectURL(
                                                                        e.target.files[0]
                                                                    )
                                                                )
                                                            }
                                                        }}
                                                    />
                                                )}
                                            />
                                            <label className="custom-file-label">Choose file</label>
                                            {errors.image && (
                                                <span className="error" style={{ marginTop: 16 }}>
                                                    {errors.image.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className="bg-secondary-subtle mb-3 mt-4 p-2">
                                            {imagePreview && (
                                                <img
                                                    src={imagePreview}
                                                    className="img-fluid"
                                                    style={{ maxWidth: '300px', height: 'auto' }}
                                                    alt="Product Image"
                                                />
                                            )}
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <label>Tên danh mục:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register('name', {
                                                required: 'Tên danh mục là bắt buộc'
                                            })}
                                        />
                                        {errors.name && (
                                            <span className="error">{errors.name.message}</span>
                                        )}
                                    </div>
                                    <div className="d-flex">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            style={{ marginRight: '10px' }}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Đang xử lý...' : 'Thêm'}
                                        </button>
                                        <button
                                            type="reset"
                                            className="btn btn-danger"
                                            onClick={() => reset({ name: '', image: undefined })}
                                        >
                                            Trở lại
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCatalog

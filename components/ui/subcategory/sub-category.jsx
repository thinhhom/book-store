import classNames from 'classnames/bind'
import Image from 'next/image'
import Link from 'next/link'
import styles from './sub-category.module.scss'
const cx = classNames.bind(styles)

export const Subcategory = (props) => {
    return (
        <>
            <div className={cx('list-category')}>
                {props.data.map((category) => {
                    return (
                        <Link
                            className={cx('category-link')}
                            key={category.id}
                            href={`/shop/${category.id}`}
                        >
                            <img
                                width={96}
                                height={90}
                                quality={100}
                                src={category.image}
                                className={cx('category-image')}
                                alt={category.name}
                            />
                            <p>{category.name}</p>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

import Link from 'next/link'

export const Header = () => {
    return (
        <>
            <header className="header">
                <div className="top-header">
                    <img src="/img/banner-sale.jpg" alt="banner-sale" />
                </div>
                <div className="mid-header">
                    <nav className="navbar">
                        <div className="row">
                            <Link href="/">
                                <img src="/img/logo.svg" alt="Book Shop" />
                            </Link>
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    className="search-input"
                                />
                                <button type="submit" className="search-button">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>

                            <div className="list">
                                <div className="item">
                                    <Link href="#!" className="link">
                                        <i className="fa-solid fa-phone-volume"></i>
                                        <div className="text text-phone">
                                            <span>Gọi điện đặt hàng</span>
                                            <br />
                                            <span>0986 836 563</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <Link href="/login" className="link">
                                        <i className="fa-regular fa-user"></i>
                                        <div className="text">
                                            <span>Đăng nhập</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <Link href="/cart" className="link">
                                        <i className="fa-solid fa-cart-shopping"></i>
                                        <div className="text">
                                            <span className="bage">0</span>
                                            <span>Giỏ hàng</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="bot-header">
                    <div className="content">
                        <nav className="navbar">
                            <div className="cate">
                                <i className="fa-solid fa-bars"></i>
                                <span>TẤT CẢ DANH MỤC</span>
                            </div>

                            <ul>
                                <li>
                                    <Link href="#!">Trang chủ</Link>
                                </li>
                                <li>
                                    <Link href="/category/1">Danh mục sản phẩm</Link>
                                </li>
                                <li>
                                    <Link href="#!">Sản phẩm</Link>
                                </li>
                                <li>
                                    <Link href="#!">Bài viết</Link>
                                </li>
                                <li>
                                    <Link href="#!">Tuyển cộng tác viên</Link>
                                </li>
                                <li>
                                    <Link href="#!">Liên hệ</Link>
                                </li>
                                <li>
                                    <Link href="/review-book">Review Sách</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

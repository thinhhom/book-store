import Link from 'next/link'
import Buttonlogout from './ui/button-logout/button-logout'

export const Header = () => {
    return (
        <>
            <header className="header">
                <div className="top-header">
                    <img src="../img/banner-sale.jpg" alt="banner-sale" />
                </div>
                <div className="mid-header">
                    <nav className="navbar">
                        <div className="row">
                            <Link href="/">
                                <img src="/img/logo.svg" alt="Book Shop" />
                            </Link>
                            <form className="search-container" action="/search">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    className="search-input"
                                    name="query"
                                />
                                <button type="submit" className="search-button">
                                    <i className="fas fa-search"></i>
                                </button>
                            </form>

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
                                    <Link href="/auth/login" className="link">
                                        <i className="fa-regular fa-user"></i>
                                        <div className="text text-user">
                                            <span>Đăng nhập</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <Link href="/cart" className="link">
                                        <i className="fa-solid fa-cart-shopping"></i>
                                        <div className="text text-cart">
                                            <p className="bage">0</p>
                                            <span>Giỏ hàng</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <Buttonlogout />
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
                                    <Link href="/">Trang chủ</Link>
                                </li>
                                <li>
                                    <Link href="/shop">Danh mục sản phẩm</Link>
                                </li>
                                <li>
                                    <Link href="/shop">Sản phẩm</Link>
                                </li>
                                <li>
                                    <Link href="/review-book">Bài viết</Link>
                                </li>
                                <li>
                                    <Link href="/contact">Liên hệ</Link>
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

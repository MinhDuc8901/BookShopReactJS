import React from "react";

function Header2() {
    return ( <>
        <div className="top-header">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-6"> <span><i className="fa fa-phone"></i> (04) 6674 2332</span> <span><i className="fa fa-envelope-o"></i> <a href="mailto:support@mail.com">support@mail.com</a></span> </div>
                    <div className="col-xs-12 col-sm-6 col-md-6 customer">

                        <span>Xin chào minhduc8901@gmail.com</span>
                        &nbsp; &nbsp;
                        <a href="/Account/Orders">Đơn hàng</a>
                        &nbsp; &nbsp;
                        <a href="/Account/Logout">Đăng xuất</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="mid-header">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-3 logo "> <a href="index.html"> <img src="/Frontend/100/047/633/themes/517833/assets/logo221b.png?1481775169361" alt="DKT Store" title="DKT Store" className="img-responsive"/> </a> </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 header-search">
                            <div style="margin-top:25px;" id="smart-search">
                                <input type="text" value="" autocomplete="off" placeholder="Nhập từ khóa tìm kiếm..." id="key" className="input-control"/>
                                    <button style="margin-top:5px; position:absolute; top:8px;" type="submit"> <i className="fa fa-search" onclick="return search();"></i> </button>
                                    <div className="smart-search-list">
                                        <ul>
                                        </ul>
                                    </div>
                            </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-3 mini-cart">
                        <div className="wrapper-mini-cart">
                            <span className="icon"><i className="fa fa-shopping-cart"></i></span> <a href="cart"> <span className="mini-cart-count"> 0 </span> sản phẩm <i className="fa fa-caret-down"></i></a>
                            <div className="content-mini-cart">
                                <div className="has-items" style="display: none;">
                                    <ul className="list-unstyled">

                                    </ul>
                                    <a href="/Cart/Checkout" className="button">Thanh toán</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-header">
                <div className="container">
                    <div className="clearfix">
                        <ul className="main-nav hidden-xs hidden-sm list-unstyled">
                            <li className="active"><a href="/">Trang chủ</a></li>
                            <li className="has-submenu">
                                <a href="#"> <span>Sản phẩm</span><i className="fa fa-caret-down" style="margin-left: 5px;"></i> </a>
                                <ul className="list-unstyled level1">
                                    <li><a href="/Products/Category/4">Nokia</a></li>
                                    <li><a href="/Products/Category/3">HTC</a></li>
                                    <li><a href="/Products/Category/2">Samsung</a></li>
                                    <li style="padding-left:20px;"><a href="/Products/Category/9">Samsung Galaxy</a></li>
                                    <li><a href="/Products/Category/1">IPhone</a></li>
                                    <li style="padding-left:20px;"><a href="/Products/Category/8">IPhone 8</a></li>
                                    <li style="padding-left:20px;"><a href="/Products/Category/7">IPhone XS Max</a></li>
                                    <li style="padding-left:20px;"><a href="/Products/Category/6">IPhone X</a></li>
                                </ul>
                            </li>
                            <li><a href="/Cart">Giỏ hàng</a></li>
                            <li><a href="/WishList">Sản phẩm yêu thích</a></li>
                            <li><a href="/News">Tin tức</a></li>
                            <li><a href="/Contact">Liên hệ</a></li>
                        </ul>
                        <a href="javascript:void(0);" className="toggle-main-menu hidden-md hidden-lg"> <i className="fa fa-bars"></i> </a>
                        <ul className="list-unstyled mobile-main-menu hidden-md hidden-lg" style="display:none">
                            <li className="active"><a href="/">Trang chủ</a></li>
                            <li><a href="#">Sản phẩm</a></li>
                            <li><a href="/Cart">Giỏ hàng</a></li>
                            <li><a href="/News">Tin tức</a></li>
                            <li><a href="/Contact">Liên hệ</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </> );
}

export default Header2;
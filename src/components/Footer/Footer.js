import React from "react";
import clsx from "clsx";
import Styles from "./Footer.module.css";
import footer from "../../asset/image/footer.png";


function Footer() {
    return (<>
        <div className={clsx(Styles.footer)}>
            <div className={clsx(Styles.top_footer)}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-3">
                            <h3>Về chúng tôi</h3>
                            <ul className={clsx(Styles.list_unstyle)}>
                                <li><a href="index.html">Trang chủ</a></li>
                                <li><a href="gioi-thieu">Giới thiệu</a></li>
                                <li><a href="tin-tuc">Tin tức</a></li>
                                <li><a href="gioi-thieu">Liên hệ</a></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-3">
                            <h3>Hướng dẫn</h3>
                            <ul className={clsx(Styles.list_unstyle)}>
                                <li><a href="huo-ng-da-n-mua-ha-ng">Hướng dẫn mua hàng</a></li>
                                <li><a href="huong-dan">Giao nhận và thanh toán</a></li>
                                <li><a href="do-i-tra-va-ba-o-ha-nh">Đổi trả và bảo hành</a></li>
                                <li><a href="account/register">Đăng ký thành viên</a></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-3">
                            <h3>Chính sách</h3>
                            <ul className={clsx(Styles.list_unstyle)}>
                                <li><a href="chinh-sach">Chính sách thanh toán</a></li>
                                <li><a href="chi-nh-sa-ch-va-n-chuye-n">Chính sách vận chuyển</a></li>
                                <li><a href="chi-nh-sa-ch-do-i-tra">Chính sách đổi trả</a></li>
                                <li><a href="chi-nh-sa-ch-ba-o-ha-nh">Chính sách bảo hành</a></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-3">
                            <h3>Điều khoản</h3>
                            <ul className={clsx(Styles.list_unstyle)}>
                                <li><a href="dieu-khoan">Điều khoản sử dụng</a></li>
                                <li><a href="die-u-khoa-n-giao-di-ch">Điều khoản giao dịch</a></li>
                                <li><a href="di-ch-vu-tie-n-i-ch">Dịch vụ tiện ích</a></li>
                                <li><a href="quye-n-so-hu-u-tri-tue">Quyền sở hữu trí tuệ</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={Styles.payment}> <img src={footer} alt="Phương thức thanh toán" title="Phương thức thanh toán" /> </div>
                </div>
            </div>
            <div className={clsx(Styles.Bottom_Footer)}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-5"> © Bản quyền Ngô Thị Thơm</div>
                        <div className="col-xs-12 col-sm-7">
                            <ul className={clsx(Styles.List_style)}>
                                <li><a href="#">Trang chủ</a></li>
                                <li><a href="#">Giới thiệu</a></li>
                                <li><a href="#">Tin tức</a></li>
                                <li><a href="#">Liên hệ</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Footer;
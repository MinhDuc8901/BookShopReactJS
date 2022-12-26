import React from "react";
import clsx from "clsx";
import Styles from "./Order.module.css";
import Header from "../Header/Header";
import SlideProduct from "../Slider/SlideProduct";
import Footer from "../Footer/Footer";
import Image1 from "../../asset/image/sanpham.jpg";
import { useState } from "react";
import { useEffect } from "react";


function Order() {
    const [data, setData] = useState([])
    useEffect(() => {
        getOrders();
    }, [])

    async function getOrders() {
        var reqData = {};
        reqData.sessionId = localStorage.getItem('sessionid');
        await fetch(`http://localhost:8080/api/v1/order/all`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.code == 200) {
                    setData(data.results);
                    console.log(data.results)
                } else {
                    alert(data.description);
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    async function removeOrder(id) {
        var reqData = {};
        reqData.sessionId = localStorage.getItem('sessionid');
        reqData.orderId = id;
        await fetch(`http://localhost:8080/api/v1/order/remove`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.code == 200) {
                    setData(data.results);
                    alert(data.description);
                } else {
                    alert(data.description);
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (<>
        <>
            <Header />
            <div className={clsx("container", Styles.Margin_Top_30)}>
                <div className={clsx(Styles.Order_Header)}>
                    <a href="#" className={clsx(Styles.Order_Header_Item, Styles.Order_Header_Item_active)}>
                        <span>Tất cả</span>
                    </a>
                    <a href="#" className={clsx(Styles.Order_Header_Item)}>
                        <span>Chờ thanh toán</span>
                    </a>
                    <a href="#" className={clsx(Styles.Order_Header_Item)}>
                        <span>Hoàn thành</span>
                    </a>
                    <a href="#" className={clsx(Styles.Order_Header_Item)}>
                        <span>Đã hủy</span>
                    </a>
                </div>
            </div>
            <div className={clsx("container", Styles.Margin_Top_30)}>
                <div className={clsx(Styles.Background_White)}>
                    <div className={clsx(Styles.OrderProduct)}>
                        {
                            data.map(item => {
                                return (
                                    <div key={item} className={clsx(Styles.OrderProduct_Item)}>
                                        <div className={clsx(Styles.OrderProduct_Item_Header)}>
                                            <h3 style={{ fontSize: 18 }}>{item.create}</h3>
                                        </div>
                                        {
                                            item.product.map(pro => {
                                                return (
                                                    <div key={pro} className={clsx(Styles.Cart_Item)} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                                                        <div className={clsx(Styles.Cart_header_Product)} style={{ display: "flex", width: "54.8%", marginLeft: "30px" }}>
                                                            <div className={clsx(Styles.Cart_header_Product_Img)}>
                                                                <img src={pro.photo} />
                                                            </div>
                                                            <div className={clsx(Styles.Cart_Item_Title)}>
                                                                {pro.name}
                                                            </div>
                                                        </div>
                                                        <div className={clsx(Styles.Cart_header_Price)}>
                                                            <div className={clsx(Styles.Cart_Item_Price)}>
                                                                <span>đ{pro.price}</span>
                                                                <span>đ{pro.price - pro.price / pro.discount}</span>
                                                            </div>
                                                        </div>
                                                        <div className={clsx(Styles.Cart_header_Quantity)} style={{ paddingLeft: 40 }}>
                                                            1
                                                        </div>
                                                        <div className={clsx(Styles.Cart_header_price)}>
                                                            <span>đ{(pro.price - pro.price / pro.discount) * pro.quantity}</span>
                                                        </div>
                                                    </div>
                                                )

                                            })
                                        }
                                        <div className={clsx(Styles.OrderProduct_Item_Footer)} >
                                            <button className={clsx("btn", "btn-danger")} onClick={() => { removeOrder(item.id) }}>Hủy đơn</button>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        {/* <div className={clsx(Styles.OrderProduct_Item)}>
                            <div className={clsx(Styles.OrderProduct_Item_Header)}>
                                <h3 style={{ fontSize: 18 }}>24/12/2022 19:30:21</h3>
                            </div>
                            <div className={clsx(Styles.Cart_Item)} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                                <div className={clsx(Styles.Cart_header_Product)} style={{ display: "flex", width: "54.8%", marginLeft: "30px" }}>
                                    <div className={clsx(Styles.Cart_header_Product_Img)}>
                                        <img src={Image1} />
                                    </div>
                                    <div className={clsx(Styles.Cart_Item_Title)}>
                                        máy chơi game cầm tay S8 máy chơi game 520 trò chơi cổ điển máy chơi game cầm tay giá rẻ Quà sinh nhật cho
                                    </div>
                                </div>
                                <div className={clsx(Styles.Cart_header_Price)}>
                                    <div className={clsx(Styles.Cart_Item_Price)}>
                                        <span>đ230.000</span>
                                        <span>đ177.000</span>
                                    </div>
                                </div>
                                <div className={clsx(Styles.Cart_header_Quantity)} style={{ paddingLeft: 40 }}>
                                    1
                                </div>
                                <div className={clsx(Styles.Cart_header_price)}>
                                    <span>đ177.000</span>
                                </div>
                            </div>
                            <div className={clsx(Styles.Cart_Item)}>
                                <div className={clsx(Styles.Cart_header_Product)} style={{ display: "flex", width: "54.8%", marginLeft: "30px" }}>
                                    <div className={clsx(Styles.Cart_header_Product_Img)}>
                                        <img src={Image1} />
                                    </div>
                                    <div className={clsx(Styles.Cart_Item_Title)}>
                                        máy chơi game cầm tay S8 máy chơi game 520 trò chơi cổ điển máy chơi game cầm tay giá rẻ Quà sinh nhật cho
                                    </div>
                                </div>
                                <div className={clsx(Styles.Cart_header_Price)}>
                                    <div className={clsx(Styles.Cart_Item_Price)}>
                                        <span>đ230.000</span>
                                        <span>đ177.000</span>
                                    </div>
                                </div>
                                <div className={clsx(Styles.Cart_header_Quantity)} style={{ paddingLeft: 40 }}>
                                    1
                                </div>
                                <div className={clsx(Styles.Cart_header_price)}>
                                    <span>đ177.000</span>
                                </div>
                            </div>
                            <div className={clsx(Styles.OrderProduct_Item_Footer)} >
                                <button className={clsx("btn", "btn-danger")}>Hủy đơn</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <SlideProduct />
            <Footer />
        </>
    </>);
}

export default Order;
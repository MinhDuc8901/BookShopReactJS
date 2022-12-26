import React from "react";
import clsx from "clsx";
import Styles from "./Cart.module.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SlideProduct from "../Slider/SlideProduct";
import Image1 from "../../asset/image/sanpham.jpg";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
    const navigator = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        getCart();
    },[])

    async function getCart() {
        var reqData = {};
        reqData.sessionId = localStorage.getItem('sessionid');
        await fetch(`http://localhost:8080/api/v1/cart/all`, {
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
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    async function removeCart(id) {
        var reqData = {};
        reqData.sessionId = localStorage.getItem('sessionid');
        reqData.idorderdetail = id;
        await fetch(`http://localhost:8080/api/v1/cart/remove`, {
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
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    
    async function handleOrder() {

        var reqData = {};
        reqData.sessionId = localStorage.getItem('sessionid');
        reqData.listOrderId = [];
        reqData.totalprice = 0;
        var cart = document.querySelectorAll("#checkCart");
        for(var i = 0 ; i < cart.length; i++) {
            if(cart[i].checked == true){
                reqData.listOrderId.push(cart[i].value);
            }
        }
        if(reqData.listOrderId.length == 0){
            alert("Không có mặt hàng nào được chọn");
        }else{
            await fetch(`http://localhost:8080/api/v1/order/add`, {
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
                        alert(data.description);
                        navigator("/order");
                    }
    
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        }
    }

    function Currency(price, discount) {
        if (discount == 0) {
            return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
        } else {
            return (price - price / discount).toLocaleString('vi', { style: 'currency', currency: 'VND' });
        }
    }

    function Currency1(price, discount,quantity) {
        if (discount == 0) {
            return (price * quantity).toLocaleString('vi', { style: 'currency', currency: 'VND' });
        } else {
            return ((price - price / discount) * quantity).toLocaleString('vi', { style: 'currency', currency: 'VND' });
        }
    }

    function handleClickAll(e){
        var cart = document.querySelectorAll("#checkCart");
        if(e.target.checked === true){
            for (var i = 0; i < cart.length; i++) {
                cart[i].checked = true;
            }
        }else{
            for (var i = 0; i < cart.length; i++) {
                cart[i].checked = false;
            }
        }        
    }

    return (<>
        <Header />
        <div className={clsx("container")} style={{ marginTop: 30 }}>
            <div className={clsx(Styles.Cart_header)}>
                <div className={clsx(Styles.Cart_header_Checkbox)}>
                    <span>
                        <input type="checkbox" onClick={(e)=>{handleClickAll(e)}} />
                    </span>
                </div>
                <div className={clsx(Styles.Cart_header_Product)}>Sản Phẩm</div>
                <div className={clsx(Styles.Cart_header_Price)}>Đơn Giá</div>
                <div className={clsx(Styles.Cart_header_Quantity)}>Số Lượng</div>
                <div >Số Tiền</div>
                <div className={clsx(Styles.Cart_header_handle)}>Thao Tác</div>
            </div>
        </div>
        <div className={clsx("container")} style={{ marginTop: 10 }}>
            <div className={clsx(Styles.Background_White)}>
                {
                    data.map(item => {
                        return (
                            <div className={clsx(Styles.Cart_Item)}>
                                <div className={clsx(Styles.Cart_header_Checkbox)}>
                                    <span>
                                        <input id="checkCart" type="checkbox" value={item.idorderdetail} />
                                    </span>
                                </div>
                                <div className={clsx(Styles.Cart_header_Product)} style={{ display: "flex", width: "54.8%" }}>
                                    <div className={clsx(Styles.Cart_header_Product_Img)}>
                                        <img src={item.photo} />
                                    </div>
                                    <div className={clsx(Styles.Cart_Item_Title)}>
                                        {item.name}
                                    </div>
                                </div>
                                <div className={clsx(Styles.Cart_header_Price)}>
                                    <div className={clsx(Styles.Cart_Item_Price)}>
                                        <span>{item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                        <span>{ Currency(item.price, item.discount)}</span>
                                    </div>
                                </div>
                                <div className={clsx(Styles.Cart_header_Quantity)} style={{ paddingLeft: 40 }}>
                                    <div className={clsx(Styles.Cart_Item_Quantity)}>
                                        <button>-</button>
                                        <input type="number" value={item.quantity} />
                                        <button>+</button>
                                    </div>
                                </div>
                                <div className={clsx(Styles.Cart_header_price)}>
                                    <span>{Currency1(item.price,item.discount,item.quantity)}</span>
                                </div>
                                <div className={clsx(Styles.Cart_header_handle)} style={{ textAlign: "start", paddingLeft: 30 }}>
                                    <button onClick={() => { removeCart(item.idorderdetail)}}><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            <div style={{marginTop:10,display:"flex",justifyContent:"end"}}>
                <button onClick={handleOrder} className={clsx("btn btn-warning")}>Đặt hàng</button>
            </div>
        </div>
        <SlideProduct />
        <Footer />
    </>);
}

export default Cart;
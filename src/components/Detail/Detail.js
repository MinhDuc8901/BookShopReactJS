import React, { useEffect, useLayoutEffect, useState } from "react";
import clsx from 'clsx';
import Styles from './Detail.module.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Image1 from "../../asset/image/sanpham.jpg";
import SlideProduct from "../Slider/SlideProduct";
import { useParams } from "react-router-dom";

function Detail() {
    let { id } = useParams();
    const [data, setData] = useState({});
    const [comments, setComments] = useState([]);
    const [star, setStar] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [textComment, setTextComment] = useState("");
    var totalStar = 0;
    useEffect(() => {
        getProduct();
        getComments();
        console.log(comments, star);
    }, [id])

    async function getProduct() {
        await fetch(`http://localhost:8080/api/v1/product/${id}`, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(login),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.code == 200) {
                    setData(data.results);
                }
                else if (data.code == 400) {
                    alert(data.description);
                } else {
                    alert(data.description);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    async function getComments() {
        await fetch(`http://localhost:8080/api/v1/product/comments/${id}`, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(login),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.code == 200) {
                    setComments(data.results);
                    setStar(data.dataStar);
                    totalStar = Math.round((star.star_5 * 5 + star.star_4 * 4 + star.star_3 * 3 + star.star_2 * 2 + star.star_1 * 1) / (star.star_5 + star.star_4 + star.star_3 + star.star_2 + star.star_1) * 10) / 10;
                    // if (totalStar == NaN) {
                    //     totalStar = 0;
                    // }
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    async function handleSendCart() {
        var reqData = {};
        var session = localStorage.getItem("sessionid");
        if (session == null) {
            alert("Vui lòng đăng nhập để có thể sử dụng dịch vụ");
        } else {
            reqData.sessionId = session;
            reqData.quantity = quantity;
            reqData.productId = data.id;
            reqData.price = data.price - data.price / data.discount;
            await fetch(`http://localhost:8080/api/v1/cart/add`, {
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
                        alert(data.description)
                    } else {
                        alert(data.description)
                    }

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    function handleincreat() {
        setQuantity(item => item + 1);
    }
    function handleGiam() {
        if (quantity > 1) {
            setQuantity(item => item - 1);
        }
    }

    function Currency(price, discount) {
        if (discount == 0) {
            return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
        } else {
            return (price - price / discount).toLocaleString('vi', { style: 'currency', currency: 'VND' });
        }
    }

    function Currency1(price, discount) {
        if (discount == 0) {
            return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
        } else {
            return (price - price / discount).toLocaleString('vi', { style: 'currency', currency: 'VND' });
        }
    }

    function changeInput(e) {
        setTextComment(e.target.value);
    }

    async function handleSendComment() {
        let reqData = {};
        reqData.sessionId = localStorage.getItem('sessionid');
        reqData.comment = textComment;
        reqData.productId = data.id;
        reqData.star = 5;
        await fetch(`http://localhost:8080/api/v1/product/comment`, {
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
                    setStar(data.dataStar);
                    setComments(data.results);
                    setTextComment('');
                    totalStar = Math.round((star.star_5 * 5 + star.star_4 * 4 + star.star_3 * 3 + star.star_2 * 2 + star.star_1 * 1) / (star.star_5 + star.star_4 + star.star_3 + star.star_2 + star.star_1) * 10) / 10;
                    // if (totalStar == NaN) {
                    //     totalStar = 0;
                    // }
                } else {
                    alert(data.description)
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (<>
        <Header />
        <div className={clsx("container", Styles.Distance)}>
            <div className={clsx("row")}>
                <div className={clsx("col-md-4", Styles.line_right, Styles.padding_top_20, Styles.padding_bottom_20)}>
                    <div>
                        <img className={clsx(Styles.Image, "img-fluid")} src={data.photo} alt="image1" style={{ width: "100%", height: "355px" }} />
                    </div>
                </div>
                <div className={clsx("col-md-8", Styles.Product)}>
                    <div className={clsx(Styles.Product_title)}>
                        <h1>{data.name}</h1>
                        <div className={clsx(Styles.Product_title_star)}>
                            <span>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </span>
                            <span>
                                <span>(Xem 3000 đánh giá)</span> | <span>Đã bán 5000+</span>
                            </span>
                        </div>
                    </div>
                    <div className={clsx(Styles.Product_price)}>
                        <div>
                            <div>{Currency(data.price, data.discount)}</div>
                            <div>{Currency1(data.price, data.discount)}</div>
                            <div>-{data.discount}%</div>
                        </div>
                    </div>
                    <div >
                        <div className={clsx(Styles.Product_quantity)}>
                            <p>Số lượng</p>
                            <div>
                                <button onClick={handleGiam}>-</button>
                                <input type="number" value={quantity} />
                                <button onClick={handleincreat}>+</button>
                            </div>
                        </div>
                        <div className={clsx(Styles.Product_add_cart)}>
                            <button onClick={handleSendCart}>Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={clsx("container", Styles.Distance)}>
            <h1 className={clsx(Styles.Title)}>Thông Tin Chi Tiết</h1>
            <div className={clsx(Styles.Info_Table)}>
                <table>
                    <tr>
                        <td>Tác giả</td>
                        <td>{data.author}</td>
                    </tr>
                    <tr>
                        <td>Ngày xuất bản</td>
                        <td>{data.create}</td>
                    </tr>
                    <tr>
                        <td>Số trang</td>
                        <td>{data.pagenumber}</td>
                    </tr>

                </table>
            </div>
        </div>
        <div className={clsx("container", Styles.Distance)}>
            <h1 className={clsx(Styles.Title)}>Mô Tả Sản Phẩm</h1>
            <div className={clsx(Styles.Content)}>
                {data.description}
            </div>
        </div>
        <div className={clsx("container", Styles.Distance)}>
            <h1 className={clsx(Styles.Title)}>ĐÁNH GIÁ SẢN PHẨM</h1>
            <div className={clsx(Styles.Content)}>
                <div className={clsx(Styles.Rate_Star)}>
                    <div className={clsx(Styles.Rate_over)}>
                        <div>
                            <span>{totalStar}</span>
                            <span> trên 5</span>
                        </div>
                        <div>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                    </div>
                    <div className={clsx(Styles.Rate_over_btn)}>
                        <div className={clsx(Styles.Rate_over_btn_active)}>Tất cả</div>
                        <div>5 Sao ({star.star_5})</div>
                        <div>4 Sao ({star.star_4})</div>
                        <div>3 Sao ({star.star_3})</div>
                        <div>2 Sao ({star.star_2})</div>
                        <div>1 Sao ({star.star_1})</div>
                    </div>
                </div>
                {
                    comments.map(item => {
                        return (
                            <div className={clsx(Styles.Product_Comments)}>
                                <div style={{ display: "flex" }}>
                                    <div className={clsx(Styles.Product_Comments_Img)}>
                                        <img src={item.photo} alt="" />
                                    </div>
                                    <div style={{ marginLeft: "10px" }}>
                                        <span style={{ fontSize: 14 }}>{item.name}</span>
                                        <div style={{ color: "#fdd836" }}>
                                            {Array.from(Array(item.star), (e, i) => {
                                                return <i key={i} class="fa-solid fa-star"></i>
                                            })}
                                            {Array.from(Array(5 - item.star), (e, i) => {
                                                return <i key={i} class="fa-regular fa-star"></i>
                                            })}
                                        </div>
                                        <span>{item.create}</span>
                                        <p>{item.content}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                {
                    localStorage.getItem("sessionid") &&
                    <div className={clsx(Styles.Product_Comments)}>
                        <div style={{ display: "flex" }}>
                            <div className={clsx(Styles.Product_Comments_Img)}>
                                <img src={Image1} alt="" />
                            </div>
                            <div style={{ marginLeft: "10px" }}>
                                <span style={{ fontSize: 14 }}>{localStorage.getItem("customerobj")}</span>
                                <div style={{ color: "#fdd836" }}>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>
                                <div className="form-group" style={{ marginTop: 10 }}>
                                    <textarea className="form-control" id="w3review" name="comment" onChange={(e) => { changeInput(e) }} rows="3" cols="150" />
                                </div>
                                <div style={{ display: "flex", justifyContent: "end", marginTop: 10 }} >
                                    <button onClick={handleSendComment} className="btn btn-success">Đăng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
        <SlideProduct />
        <Footer />
    </>);
}

export default Detail;
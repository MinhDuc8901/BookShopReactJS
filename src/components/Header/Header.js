import clsx from "clsx";
import styles from "./Header.module.css";
import LogoTiki from "../../asset/image/logo.png";
import Avatar from "../../asset/image/avatar.png";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Header() {
    const navigator = useNavigate();
    const [show, setShow] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [login, setLogin] = useState({});
    const [register, setRegister] = useState({});
    const [name, setName] = useState("");
    const [nameSearch, setNameSearch] = useState(" ");
    const [productSearch, setProductSearch] = useState([]);
    useEffect(() => {
        getSearchAPI();
    }, [nameSearch])

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setShowLogin(true);
    }

    const handleChangeLogin = function () {
        setShowLogin((login) => !login);
    }

    function changeInputLogin(e) {
        console.log(e.target.value)
        setLogin({ ...login, [e.target.name]: e.target.value });
    }
    function changeInputRegister(e) {
        console.log(e.target.value)
        setRegister({ ...register, [e.target.name]: e.target.value });
    }

    async function LoginAPI() {
        await fetch('http://localhost:8080/api/v1/account/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.code == 200) {
                    alert(data.description);
                    localStorage.setItem("sessionid", data.session_id);
                    localStorage.setItem("customerobj", data.results.name);
                    localStorage.setItem("photo", data.results.photo);
                    setName(data.results.name)
                    setShow(false);
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

    async function RegisterAPI() {
        await fetch('http://localhost:8080/api/v1/account/register', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(register),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.code == 200) {
                    alert(data.description);
                    setShowLogin(true);
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

    function clickRediction(url) {
        let session = localStorage.getItem('sessionid');
        if (session == null) {
            alert("Vui lòng đăng nhâp.");
            setShow(true);
        } else {
            navigator(url);
        }
    }

    function handleLogout() {
        localStorage.removeItem('sessionid');
        localStorage.removeItem('customerobj');
        setName("");
    }
    async function getSearchAPI() {
        let reqData = {};
        reqData.name = nameSearch;
        await fetch('http://localhost:8080/api/v1/product/search', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: nameSearch }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.code == 200) {
                    setProductSearch(data.results);
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function changeInput(e) {
        setNameSearch(e.target.value)
    }

    return (<>
        <div className={clsx(styles.header)}>
            <div className={clsx('container-fluid')}>
                <div className={clsx('container')}>
                    <div className={clsx('row', styles.header_top)}>
                        <div className={clsx('col-md-1 ')}>
                            <img className={clsx(styles.header_img_size)} src={LogoTiki} alt="LogoTiki" />
                        </div>
                        <div className={clsx('col-md-7', 'd-flex', styles.search)}>
                            <input className={clsx(styles.header_input_style)} type="text" onChange={(e) => { changeInput(e) }} placeholder="Tìm kiểm sản phẩm..." />
                            <button className={clsx(styles.header_btn_style)} type="button"><i className="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
                            <nav id="search" style={{ width: "77.5%", maxHeight: 350, backgroundColor: "#fff", position: "absolute", top: 40, zIndex: 10, overflow: "scroll" ,display:"none"}}>
                                {
                                    productSearch.map(item => {
                                        return (
                                            <a key={item.name} onClick={() => { navigator(`/detail/${item.id}`) }}  style={{ display: "flex", alignItems: "center", overflow: "hidden", borderBottom: "0.5px solid rgba(0,0,0,0.1)", padding: "5px 0", height: "60px",cursor:"pointer" }}>
                                                <div className={clsx(styles.header_img_product)}>
                                                    <img src={item.photo} />
                                                </div>
                                                <p style={{ marginBottom: 0, marginLeft: "10px", fontSize: 16 }}>{item.name}</p>
                                            </a>
                                        )
                                    })
                                }

                            </nav>
                        </div>
                        <div className={clsx('col-md-2', 'd-flex')} style={{ alignItems: "center" }}>
                            {
                                localStorage.getItem("sessionid") &&
                                <div className={clsx("d-flex", styles.header_account)} style={{ position: 'relative' }}>
                                    <div className={styles.header_img_avatar}>
                                        <img src={Avatar} alt="Avatar" />
                                    </div>

                                    <div className={clsx(styles.header_account_info)}>
                                        <p>Tài khoản</p>
                                        <p>{name} <span><i className="fa-solid fa-sort-down"></i></span></p>
                                    </div>
                                    {
                                        localStorage.getItem("customerobj") &&
                                        <div className={clsx(styles.Header_Logout)} style={{ width: "150px", height: "50px", borderRadius: 2, background: "#fff", position: "absolute", bottom: -60, textAlign: "center" }}>
                                            <button className="btn btn-primary" onClick={handleLogout} style={{ marginTop: 6 }}>Đăng xuất</button>
                                        </div>

                                    }

                                </div>
                            }{
                                !localStorage.getItem("sessionid") &&
                                <a variant="primary" style={{ cursor: "pointer", color: "#fff" }} onClick={handleShow}>
                                    Đăng nhập/Đăng ký
                                </a>

                            }
                        </div>
                        <div className={clsx('col-md-2',)}>
                            <div className={styles.header_cart}>
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span>Giỏ Hàng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={clsx(styles.header_bottom)}>
            <div className={clsx('container')}>
                <div className={clsx(styles.header_button)}>
                    <ul >
                        {/* className={clsx(styles.active)} */}
                        <li ><p onClick={() => { navigator("/") }}>TRANG CHỦ</p></li>
                        <li><p onClick={() => { alert("Tính năng đang phát triển.") }}>SẢN PHẨM</p></li>
                        <li><p onClick={() => { clickRediction("/cart") }}>GIỎ HÀNG</p></li>
                        <li><p onClick={() => { clickRediction("/order") }}>ĐẶT HÀNG</p></li>
                        <li><p onClick={() => { navigator("/fun") }}>TREND</p></li>
                        <li><p onClick={() => { alert("Tính năng đang phát triển.") }}>TIN TỨC</p></li>
                        <li><p onClick={() => { alert("Tính năng đang phát triển.") }}>LIÊN HỆ</p></li>
                    </ul>
                </div>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                {
                    showLogin &&
                    <Modal.Title>Đăng nhập</Modal.Title>
                }
                {
                    showLogin == false &&
                    <Modal.Title>Đăng ký</Modal.Title>
                }
            </Modal.Header>
            <Modal.Body>
                {
                    showLogin &&
                    <div>
                        <div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email</label>
                                <input type="email" name="email" onChange={(e) => { changeInputLogin(e) }} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Mật khẩu</label>
                                <input type="password" name="password" onChange={(e) => { changeInputLogin(e) }} class="form-control" id="exampleInputPassword1" />
                            </div>
                            <a href="#" onClick={handleChangeLogin}>Đăng ký tài khoản</a>
                        </div>
                    </div>
                }
                {
                    showLogin == false &&
                    <div>
                        <div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Họ và tên</label>
                                <input type="text" name="name" onChange={(e) => { changeInputRegister(e) }} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email</label>
                                <input type="email" name="email" onChange={(e) => { changeInputRegister(e) }} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Địa chỉ</label>
                                <input type="text" name="address" onChange={(e) => { changeInputRegister(e) }} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Số điện thoại</label>
                                <input type="text" name="phone" onChange={(e) => { changeInputRegister(e) }} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Mật khẩu</label>
                                <input type="password" name="password" onChange={(e) => { changeInputRegister(e) }} class="form-control" id="exampleInputPassword1" />
                            </div>
                        </div>
                        <a href="#" onClick={handleChangeLogin}>Đăng nhập</a>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button> */}
                {
                    showLogin &&
                    <Button variant="primary" onClick={LoginAPI}>
                        Đăng nhập
                    </Button>
                }
                {
                    showLogin == false &&
                    <Button variant="primary" onClick={RegisterAPI}>
                        Đăng ký
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    </>);
}

export default Header;
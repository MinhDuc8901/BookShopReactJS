import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Styles from "./Admin.module.css";


function Admin() {
    const navigation = useNavigate();
    const [data, setData] = useState([]);
    const columns = useMemo(() => {
        var column = [
            {
                name: "Mã",
                selector: row => row.id,
                sortable: true,
                cell: row => <div>{row.id}</div>,
            },
            {
                name: "Tên sách",
                selector: row => row.name,
                sortable: true,
                cell: row => <div>{row.name}</div>,
            },
            {
                name: "Tên tác giả",
                selector: row => row.author,
                sortable: true,
                cell: row => <div>{row.author}</div>,
            },
            {
                name: "Date",
                selector: row => row.create,
                sortable: true,
                cell: row => <div>{row.create}</div>,
            },
            {
                name: "Handle",
                selector: row => row.title,
                sortable: true,
                cell: row => <div>
                    {/* {sessionStorage.getItem("sessionId") && */}
                        <td>
                        <button className="btn btn-danger" onClick={() => { deleteBook(row) }}>Delete</button>&nbsp;
                        <button className="btn btn-primary" onClick={() => { navigation(`/admin/edit/${row.id}`) }}>Edit</button>
                        </td>
                        {/* } */}
                </div>,
            }
        ]
        return column;
    }, [])

    function deleteBook(item){
        let check = window.confirm("Bạn chắc chắn muốn xóa sản phẩm "+item.name);
        if(check == true){
            HandleDelete(item);
        }
    }
    async function HandleDelete(item){
        var removeProduct = {};
        removeProduct.idProduct = item.id;
        removeProduct.sessionId = localStorage.getItem("session_id");
        await fetch('http://localhost:8080/api/v1/admin/remove', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(removeProduct),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.code == 200) {
                    alert(data.description);
                    setData(data.results);
                }
                else {
                    alert(data.description);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        checkLogin(function(){
            getListBook();
        });
    }, [])
    async function checkLogin(callback) {
        var dataSession = {};
        dataSession.sessionId = localStorage.getItem("session_id")
        await fetch('http://localhost:8080/api/v1/admin/checkLogin', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataSession),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.code == 200) {
                    callback();
                }
                else  {
                    navigation("/admin/login");
                } 
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function Logout(){
        localStorage.removeItem("session_id");
        localStorage.removeItem("customer");
        navigation("/admin/login");
    }

    async function getListBook() {
        await fetch('http://localhost:8080/api/v1/product/allproduct')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData(data.result);
            });
    }
    return (<>
        <div className={clsx("container", Styles.Background_White)}>
            <nav className={clsx("navbar navbar-expand-lg bg-light")}>
                <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                    <div className="container-fluid" >
                        {/* <a className="navbar-brand" href="#">Thom</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button> */}
                        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ display: "flex", margin: "auto" }}>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Category</a>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div style={{width:400}}>
                        <button className={clsx("btn btn-primary")} onClick={()=>{navigation("/admin/add")}} style={{ width: 150,marginRight:10 }}>Thêm sản phẩm</button>
                        <button className={clsx("btn btn-primary")} onClick={Logout} style={{ width: 100 }}>Đăng xuất</button>
                    </div>

                </div>
            </nav>
            <div style={{ marginTop: "30px" }}>
                <DataTable title="" columns={columns} data={data} pagination />
            </div>
        </div>
    </>);
}

export default Admin;
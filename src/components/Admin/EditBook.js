import clsx from "clsx";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from "./Admin.module.css";
import Image1 from "../../asset/image/sanpham.jpg";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditBook() {
    let { id } = useParams();
    const navigator = useNavigate();
    const [data, setData] = useState({
        name: "",
        description: "",
        photo: "",
        hot: "",
        price: "",
        discount: "",
        author: "",
        pagenumber: "",
        create: "",
        sessionId: "",
        categoryid:""
    })

    const [dataError, setDataError] = useState({
        name: false,
        description: false,
        photo: false,
        hot: false,
        price: false,
        discount: false,
        author: false,
        pagenumber: false,
        create: false,
        
    })

    const [category,setCategory] = useState([]);

    function changeInput(e) {
        console.log(e.target.value)
        setData({ ...data, [e.target.name]: e.target.value });
    }

    function changeCheckbox(e){
        console.log(e.target.checked)
        if(e.target.checked == true){
            setData({... data,hot :1})
        }else{
            setData({ ...data, hot: 0 })
        }
    }

    function checkForm(e) {
        console.log(e)
        if (e.target.value.trim().length == 0) {
            setDataError({ ...dataError, [e.target.name]: true })
        } else {
            setDataError({ ...dataError, [e.target.name]: false })
        }
    }

    function changeImage(event) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = function (e) {
            var a = e.target.result;
            console.log(a)
            // console.log($scope.base64data);
            setData({ ...data, photo: a });
        }
    }

    function changeSelect(e) {
        console.log(e);
        setData({ ...data, ['categoryid']: e.target['0'].value });
    }
    function SetImage(src) {
        setData({ ...data, photo: src });
    }

    function Logout() {
        localStorage.removeItem("session_id");
        localStorage.removeItem("customer");
        navigator("/admin/login");
    }

    useEffect(() => {
        checkLogin(function(){
            getDataApi();
            getListCategory();
        })
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
                else {
                    navigator("/admin/login");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    async function getDataApi(){
        await fetch(`http://localhost:8080/api/v1/product/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData( data.results);
            });
    }

    async function getListCategory(){
        await fetch(`http://localhost:8080/api/v1/product/category`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCategory(data.results);
            });
    }

    async function UpdateBookAPI(){
        data.sessionId = "1de4a592-c003-42d4-bf85-83981ef60cbc";
        await fetch('http://localhost:8080/api/v1/admin/saveProduct', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.code == 200) {
                    alert(data.description);
                    navigator("/admin");
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


    return (<>
        <div className={clsx("container", styles.Width_Height)}>
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
                    <div>
                        <button className={clsx("btn btn-primary")} onClick={Logout} style={{ width: 100 }}>Đăng xuất</button>
                    </div>

                </div>
            </nav>
            <div>
                <div>
                    <h1>Thêm thông tin sách</h1>
                    <div className="row">
                        <div className="col-6">
                            <div style={{ display: 'flex' }}>
                                <div className={clsx(styles.inputForm)} style={{ width: "50%" }}>
                                    <label htmlFor="basic-url" className="form-label">Tiêu đề</label>
                                    <div className="input-group mb-3">
                                        {/* <span className="input-group-text" id="basic-addon3">https://example.com/users/</span> */}
                                        <input type="text" name="name" value={data.name} className="form-control" onChange={(e) => { changeInput(e); checkForm(e) }} id="basic-url" aria-describedby="basic-addon3" />
                                    </div>
                                    {dataError.name && (<span style={{ color: 'red' }}>Tiêu đề không được để trống</span>)}
                                </div>
                                <div className={clsx(styles.inputForm)} style={{ width: "50%" }}>
                                    <label htmlFor="basic-url" className="form-label">Tác giả</label>
                                    <div className="input-group mb-3">
                                        {/* <span className="input-group-text" id="basic-addon3">https://example.com/users/</span> */}
                                        <input type="text" name="author" value={data.author} className="form-control" onChange={(e) => { changeInput(e); checkForm(e) }} id="basic-url" aria-describedby="basic-addon3" />
                                    </div>
                                    {dataError.author && (<span style={{ color: 'red' }}>Tác giả không được để trống</span>)}
                                </div>
                                {/* {formError.author && (<span style={{ color: 'red' }}>author không được để trống</span>)} */}
                            </div>
                            <div className={clsx(styles.inputForm)}>
                                <label htmlFor="basic-url" className="form-label">Mô tả về sách</label>
                                <div className="input-group mb-3" style={{ height: 200, width: "100%", overflow: "scroll" }}>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={data.description}
                                        
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setData(item => ({ ...item, 'description': data }));
                                        }}

                                    />

                                </div>
                                {/* {formError.description && (<span style={{ color: 'red' }}>description không được để trống</span>)} */}
                            </div>
                            <div className="d-flex">
                                <div className={clsx(styles.inputForm)} style={{ width: "50%" }}>
                                    <label htmlFor="basic-url" className="form-label">Ngày phát hành</label>
                                    <div className="input-group mb-3">
                                        {/* <span className="input-group-text" id="basic-addon3">https://example.com/users/</span> */}
                                        <input type="text" name="create" value={data.create} className="form-control" onChange={(e) => { changeInput(e); checkForm(e) }} id="basic-url" aria-describedby="basic-addon3" />
                                        {/* <ReactDatePicker className="form-control" selected={new Date(moment(data.release_date).valueOf())} onChange={(date) => { console.log(date); setData(item => ({ ...item, 'release_date': moment(date).format("DD/MM/YYYY") })); console.log(data); }} /> */}
                                    </div>
                                    {dataError.create && (<span style={{ color: 'red' }}>Ngày phát hành không được để trống</span>)}
                                </div>
                                <div className={clsx(styles.inputForm)} style={{ width: "50%" }}>
                                    <label htmlFor="basic-url" className="form-label">Số trang</label>
                                    <div className="input-group mb-3">
                                        {/* <span className="input-group-text" id="basic-addon3">https://example.com/users/</span> */}
                                        <input type="text" name="pagenumber" value={data.pagenumber} className="form-control" onChange={(e) => { changeInput(e); checkForm(e) }} id="basic-url" aria-describedby="basic-addon3" />
                                    </div>
                                    {dataError.pagenumber && (<span style={{ color: 'red' }}>Số trang không được để trống</span>)}
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className={clsx(styles.inputForm)} style={{ width: "50%" }}>
                                    <label htmlFor="basic-url" className="form-label">Giá</label>
                                    <div className="input-group mb-3">
                                        {/* <span className="input-group-text" id="basic-addon3">https://example.com/users/</span> */}
                                        <input type="text" name="price" value={data.price} className="form-control" onChange={(e) => { changeInput(e); checkForm(e) }} id="basic-url" aria-describedby="basic-addon3" />
                                        {/* <ReactDatePicker className="form-control" selected={new Date(moment(data.release_date).valueOf())} onChange={(date) => { console.log(date); setData(item => ({ ...item, 'release_date': moment(date).format("DD/MM/YYYY") })); console.log(data); }} /> */}
                                    </div>
                                    {dataError.price && (<span style={{ color: 'red' }}>Giá tiền không được để trống</span>)}
                                </div>
                                <div className={clsx(styles.inputForm)} style={{ width: "50%" }}>
                                    <label htmlFor="basic-url" className="form-label">Giảm giá</label>
                                    <div className="input-group mb-3">
                                        {/* <span className="input-group-text" id="basic-addon3">https://example.com/users/</span> */}
                                        <input type="text" name="discount" value={data.discount} className="form-control" onChange={(e) => { changeInput(e); checkForm(e) }} id="basic-url" aria-describedby="basic-addon3" />
                                    </div>
                                    {dataError.discount && (<span style={{ color: 'red' }}>Phần trăm không được để trống</span>)}
                                </div>
                            </div>
                            <div className={clsx(styles.inputForm)}>
                                <label htmlFor="basic-url" className="form-label" style={{ marginRight: 20 }}>Hot</label>
                                <input type="checkbox" checked={data.hot == 1} onClick={(e => { changeCheckbox (e)})} name="hot" />
                            </div>
                            <div className={clsx(styles.inputForm)}>
                                <label htmlFor="basic-url" className="form-label">Thể loại sách</label>
                                <div className="input-group mb-3">
                                    {/* <span className="input-group-text" id="basic-addon3">https://example.com/users/</span> */}
                                    {/* <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                                 */}
                                    <select className=" form-select" onClick={(e) => { changeSelect(e)}} >
                                        {
                                            category.map((item) => {
                                                return(
                                                    <option key={item.id} selected={item.id == data.categoryid} value={item.id} >{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-6">
                            <input type="file" name="photo" />
                            <img style={{ width: '100%' }} />
                            <button >Chỉnh sửa ảnh</button>
                        </div> */}
                        <div className="col-6" style={{ textAlign: "center" }}>
                            <div className="input-group mb-3" style={{ marginTop: 40 }}>
                                <label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
                                <input type="file" className="form-control" id="inputGroupFile01" onChange={(e) => { changeImage(e) }} />
                            </div>
                            <div style={{width:"100%",height:"450px"}}>
                                <img src={data.photo} className="img-fluid" alt="" style={{ width: "100%", height: "100%" }} />
                            </div>
                            <button className="btn btn-warning" style={{ marginTop: 10 }}>Chỉnh sửa ảnh</button>
                        </div>

                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button className="btn btn-primary" onClick={UpdateBookAPI} >Thêm sản phẩm</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default EditBook;
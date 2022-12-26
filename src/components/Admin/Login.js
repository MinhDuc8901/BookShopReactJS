import clsx from "clsx";
import Styles from "./Login.module.css";
import styles from "./Admin.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigator = useNavigate();
    const [data, setData] = useState({
        email:"",
        password:""
    })
    const [dataError, setDataError] = useState({
        email:false,
        password:false
    });
    function changeInput(e){
        setData({...data,[e.target.name]:e.target.value});
    }
    

    async function sendData(){
        await fetch('http://localhost:8080/api/v1/admin/login', {
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
                    localStorage.setItem("session_id", data.session_id);
                    localStorage.setItem("customer", data.results);
                    alert(data.description);
                    navigator("/admin")
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


    return ( <>
        <div className={clsx("container",Styles.Background_Width_Height)}>
            <div className={clsx(Styles.Position_Center)}>
                <div className={clsx(styles.inputForm)} >
                    <label htmlFor="basic-url" className="form-label">Email</label>
                    <div className="input-group mb-3">
                        {/* <span className="input-group-text" id="basic-addon3">https://example.com/users/</span> */}
                        <input type="text" name="email" onChange={(e) => { changeInput(e) }}  className="form-control"  id="basic-url" aria-describedby="basic-addon3" />
                    </div>
                </div>
                <div className={clsx(styles.inputForm)} >
                    <label htmlFor="basic-url" className="form-label">Mật khẩu</label>
                    <div className="input-group mb-3">
                        {/* <span className="input-group-text" id="basic-addon3">https://example.com/users/</span> */}
                        <input type="password" name="password" onChange={(e)=> {changeInput(e)}}  className="form-control"  id="basic-url" aria-describedby="basic-addon3" />
                    </div>
                </div>
                <div style={{ textAlign: "center", marginTop:10}}>
                    <button className={clsx("btn btn-primary")} onClick={sendData} >Đăng nhập</button>
                </div>
            </div>
        </div>
    </> );
}

export default Login;
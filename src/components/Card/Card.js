import clsx from "clsx";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Product from "../../asset/image/product.jpg";
import styles from "./Card.module.css";

function Card(props) {
    const navigator = useNavigate();
    useEffect(()=>{
        
    })

    function price(){
        if(props.data.discount == 0){
            return props.data.price;
        }else{
            let price = props.data.price - props.data.price / props.data.discount;
            price = price /100 *100;
            return price;
        }
    }
    

    return (<>
        {
            props.data != undefined &&
            <a onClick={()=>{navigator(`/detail/${props.data.id}`)}} href="" style={{color:'rgb(36,36,36)',textDecoration:'none',width:200}}>
                <div className={clsx(styles.Card_size)}>
                    <div>
                        <img style={{width:200,height:200}} className="img-fluid" src={props.data.photo} alt="Product" />
                    </div>
                    <div className={clsx(styles.Card_info)}>
                        <div>
                            <h3 className={clsx(styles.Card_content)}>{props.data.name}</h3>
                        </div>
                        <div className={clsx(styles.Card_start)}>
                            <span>4.95 <i className="fa-solid fa-star"></i></span> | <span>Đã bán 16</span>
                        </div>
                        <div className={clsx(styles.Card_price)}>
                                <h2>{price().toLocaleString('vi', { style: 'currency', currency: 'VND' })}<span>-{props.data.discount}%</span></h2>
                        </div>
                        <div className={clsx(styles.Card_gif)}>
                            <p>Tặng tới 260 ASA (84k đ)</p>
                            <p>≈ 3.5% hoàn tiền</p>
                        </div>

                    </div>
                </div>

            </a>
        }
    </>);
}

export default Card;
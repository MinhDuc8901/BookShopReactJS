import clsx from "clsx";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import HeaderCard from "../HeaderCard/HeaderCard";
import Styles from "./Products.module.css";

function Products() {
    const [data, setData] = useState([]);

    useEffect(()=>{
        getListBooks();
    },[])
    async function getListBooks() {
        await fetch('http://localhost:8080/api/v1/product/allproduct')
            .then((response) => response.json())
            .then((data) => {
                if (data.code == 200) {
                    setData(data.result);
                }
            });
    }

    return (<>
        <div className={clsx('container')} style={{marginTop:'30px'}}>
            <HeaderCard text={"GỢI Ý HÔM NAY"}/>
            <div className={clsx(Styles.Card_padding)}>
                {
                    data.map(item=>{
                        return(
                            <div key={item.id} className={clsx(Styles.Card_block)}>
                                <Card  data={item}/>
                            </div>
                        )
                    })
                    
                }
                
            </div>
            
        </div>
    </>);
}

export default Products;
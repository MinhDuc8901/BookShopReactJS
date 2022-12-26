
import clsx from "clsx";
import { useEffect, useLayoutEffect, useState } from "react";
import Slider from "react-slick";
import Card from "../Card/Card";
import HeaderCard from "../HeaderCard/HeaderCard";
import Styles from "./SlideProduct.module.css";

function SlideProduct() {
    const [data, setData] = useState([]);
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    useEffect(()=>{
        getProductHot();
    },[])

    async function getProductHot(){
        await fetch('http://localhost:8080/api/v1/product/hot')
            .then((response) => response.json())
            .then((data) => {
                if(data.code == 200){
                    setData(data.results);
                }
            });
    }

    return ( <>
        <div className={clsx('container', Styles.Slide)}>
            <HeaderCard text={'SẢN PHẨM BÁN CHẠY'} />
            {/* <p>{{data}}</p> */}
            <div style={{marginTop: 16}}>
                <div className="row">
                    <Slider {...settings}>
                    {   data.length > 0 &&
                        data.map(item =>{
                            return(<div key={item.id}>
                                <Card data={item}/>
                            </div>);
                        })
                    }
                    </Slider>
                </div>
            </div>
        </div>
    </> );
}

export default SlideProduct;
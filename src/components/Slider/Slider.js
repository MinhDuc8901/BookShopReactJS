import clsx from "clsx";
import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../../asset/image/slide1.png';
import slide2 from '../../asset/image/slide2.png';
import adv from '../../asset/image/adv.png';
import styles from './Slider.module.css';


function Slider() {
    console.log(adv)
    return (<>
        <div className="container">
            <div className="row">
                <div className={clsx('col-md-8')}>
                    <div className={clsx(styles.slider)}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={slide1}
                                    alt="First slide"
                                />

                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={slide2}
                                    alt="Second slide"
                                />


                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={slide1}
                                    alt="Third slide"
                                />


                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={clsx(styles.slider_img)}>
                        <img src={adv} alt="First slide" className="" />
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Slider;
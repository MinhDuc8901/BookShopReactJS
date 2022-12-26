import clsx from "clsx";
import React, { } from "react";
import Category from "../Category/Category";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Products from "../Products/Products";
import SlideProduct from "../Slider/SlideProduct";
import Slider from "../Slider/Slider";
import Styles from "./Home.module.css";

function Home() {
    return (<>
        <Header />
        <Category />
        <Slider />
        <SlideProduct />
        <Products />
        <Footer />
    </>);
}

export default Home;
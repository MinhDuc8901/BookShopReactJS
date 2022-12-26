import clsx from "clsx";
import React from "react";
import styles from "./Category.module.css";


function Category() {
    return ( <>
        <div className={clsx('container')}>
            <div className="row">
                <div className={clsx(styles.Category_item)}>
                    <a href="">Ngữ văn</a>
                    <a href="">Toán học</a>
                    <a href="">Ngữ văn</a>
                    <a href="">Toán học</a>
                    <a href="">Ngữ văn</a>
                    <a href="">Toán học</a>
                    <a href="">Ngữ văn</a>
                    <a href="">Toán học</a>
                </div>
            </div>
        </div>
    </> );
}

export default Category;
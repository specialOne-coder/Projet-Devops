import { useState, Component, useContext, useEffect } from "react";
import styles from "../styles/style";
import { Welcome } from "../Components";
import { EuroTzContext } from "../context/DappContext";

const OtherPage = () => {

    return (
        <div className="bg-primary w-full overflow-hidden">
            <div className={`bg-primary ${styles.flexCenter} text-white mt-32 text-[20px]`}>
                <p> Other page, implement your other page logic here if you have one, you can also add many.</p>
            </div>
        </div>
    );
}

export default OtherPage;

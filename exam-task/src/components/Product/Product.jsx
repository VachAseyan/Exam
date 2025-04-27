import { useContext } from "react";
import style from "./Product.module.css"
import { ToggleContext } from "../../context/context";

function Product({ id, title, category, image, price, moveToCard }) {
    const { isToggleMode } = useContext(ToggleContext);

    return (
        <div className={`${style.productBox} ${isToggleMode ? style.darkMode : ""}`} key={id}>
            <img src={image} alt="" />
            <h2>{title}</h2>
            <p>{category}</p>
            <p>${price}</p>
            <button onClick={() => moveToCard(id)}>Add to Card</button>
        </div>
    )
}

export default Product;
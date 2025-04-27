import { useContext } from "react";
import style from "./Card.module.css";
import { ToggleContext } from "../../context/context";

function Card({ id, title, category, count, image, price, deleteProd, boughtProductsIncrement, boughtProductsDecrement }) {
    const { isToggleMode } = useContext(ToggleContext);
    return (
        <div>
            <div className={`${style.cardBox} ${isToggleMode ? style.darkMode : ""}`} key={id}>
                <img src={image} alt={title} />
                <h2>{title}</h2>
                <p>{category}</p>
                <p className={style.price}>${price.toFixed(2)}</p>
                <div className={style.counterBox}>
                    <button onClick={() => boughtProductsDecrement(id)}>-</button>
                    <h6>{count}</h6>
                    <button onClick={() => boughtProductsIncrement(id)}>+</button>
                </div>
                <button onClick={() => deleteProd(id)} className={style.buyButton}>Delete</button>
            </div>
        </div>
    );
}
export default Card;

import { useContext, useEffect, useRef, useState } from "react";
import style from "./ProductList.module.css";
import Product from "../Product/Product";
import Card from "../Card/Card";
import { fetchProducts } from "../api/api";
import { ToggleContext } from "../../context/context";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [input, setInput] = useState("");
    const [isBasketMode, setIsBasketMode] = useState(false);
    const [card, setCard] = useState(JSON.parse(localStorage.getItem("card")) ?? [])
    const prevCard = useRef([]);
    const [total, setTotal] = useState(0);
    const { isToggleMode, toggleMode } = useContext(ToggleContext);

    useEffect(() => {
        fetchProducts().then((res) => {
            setProducts(res);
            setFilteredProducts(res);
        });
    }, []);

    useEffect(() => {
        prevCard.current = card;
    }, [card]);

    useEffect(() => {
        if (card.length > 0) {
            localStorage.setItem("card", JSON.stringify(card));
        } else {
            localStorage.removeItem("card");
        }
    }, [card]);

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    useEffect(() => {
        if (input.length >= 1) {
            const results = products.filter((item) =>
                item.title.toLowerCase().includes(input.toLowerCase())
            );
            setFilteredProducts(results);
        } else {
            setFilteredProducts(products);
        }
    }, [input, products]);

    const toggleBasketMode = () => {
        setIsBasketMode(!isBasketMode);
    };

    const deleteProd = (id) => {
        setCard(card.filter((item) => item.id !== id));
    };

    const moveToCard = (id) => {
        const product = products.find((item) => item.id === id);
        setCard((prev) => {
            let found = prev.find((item) => item.id === id);
            if (!found) {
                return [...prev, { ...product, count: 1 }];
            }
            return prev.map((item) =>
                item.id === id ? { ...item, count: item.count + 1 } : item
            );
        });
    };

    const boughtProductsIncrement = (id) => {
        setCard((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, count: item.count + 1 } : item
            )
        );
    };

    const boughtProductsDecrement = (id) => {
        setCard((prev) =>
            prev.map((item) =>
                item.id === id && item.count > 1
                    ? { ...item, count: item.count - 1 }
                    : item
            )
        );
    };

    useEffect(() => {
        setTotal(card.reduce((curr, item) => curr + item.price * item.count, 0));
    }, [card]);

    const resetCard = () => {
        setCard(prevCard.current);
    };

    const deleteAll = () => {
        setCard([]);
    };

    return (
        <div className={`${style.container} ${isToggleMode ? style.darkMode : ""}`}>
            <button onClick={resetCard}>Reset Card</button>
            <div>
                <label htmlFor="search-prod">Search Product</label>
                <input
                    id="search-prod"
                    type="text"
                    value={input}
                    onChange={handleChange}
                    disabled={isBasketMode}
                />
            </div>
            <div>
                <button onClick={toggleBasketMode}>Card</button>
                <span>Count Products: {card.reduce((acc, prod) => acc + prod.count, 0)}</span>
            </div>
            <div>
                <button onClick={toggleMode}>
                    Toggle Dark or Light Mode
                </button>
            </div>
            {!isBasketMode ? (
                <div className={style.productContainer}>
                    {filteredProducts.map((product) => (
                        <Product
                            key={product.id}
                            {...product}
                            moveToCard={moveToCard}
                        />
                    ))}
                </div>
            ) : (
                <div>
                    {card.length > 0 && <button onClick={deleteAll}>Delete All</button>}
                    {card.length > 0 && <h1>Total Price: {total.toFixed(2)}</h1>}
                    <div>
                        {card.map((prod) => (
                            <Card
                                key={prod.id}
                                {...prod}
                                deleteProd={deleteProd}
                                boughtProductsIncrement={boughtProductsIncrement}
                                boughtProductsDecrement={boughtProductsDecrement}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductList;
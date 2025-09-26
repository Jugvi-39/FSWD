import { useNavigate } from "react-router-dom";
import data from '../data.json';
import { useCart } from "../context/CartContext";

function Home() {
    const navigate = useNavigate();
    const { addItem } = useCart();

    const handleAddToCart = (index) => {
        const product = data[index];
        addItem(product);
        alert(product.title + ' added to cart');
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {data.map((productObj, index) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 text-center mb-4" key={index}>
                        <img src={productObj.url} alt={productObj.title} style={{ width: '250px', height: '180px', objectFit: 'contain' }} />
                        <p>
                            <strong>{productObj.title}</strong>
                            <br />₹{productObj.price}
                        </p>
                        <div className="d-flex gap-2 justify-content-center">
                            <input
                                type="button"
                                value="Add to Cart"
                                className="btn btn-primary"
                                onClick={() => handleAddToCart(index)}
                            />
                            <input
                                type="button"
                                value="Buy Now"
                                className="btn btn-success"
                                onClick={() => { handleAddToCart(index); navigate('/mycart'); }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;


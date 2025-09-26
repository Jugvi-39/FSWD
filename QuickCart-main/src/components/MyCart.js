import { useCart } from "../context/CartContext";

function MyCart() {
    const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();

    if (!items.length) {
        return <div className="container mt-5"><h3>Your cart is empty.</h3></div>;
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="m-0">My Cart</h2>
                <button className="btn btn-outline-danger" onClick={clearCart}>Clear Cart</button>
            </div>
            <div className="row g-3">
                {items.map((product) => (
                    <div className="col-12 col-md-6 col-lg-4" key={product.title}>
                        <div className="card h-100">
                            <img src={product.url} className="card-img-top" alt={product.title} style={{ width: "100%", height: "200px", objectFit: "contain" }} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">Price: ₹{product.price}</p>
                                <p className="card-text flex-grow-1">{product.description}</p>
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <div className="input-group" style={{ width: '120px' }}>
                                        <button className="btn btn-outline-secondary" onClick={() => updateQuantity(product.title, product.quantity - 1)}>-</button>
                                        <input type="number" className="form-control text-center" value={product.quantity} min={1} onChange={(e) => updateQuantity(product.title, parseInt(e.target.value || '1', 10))} />
                                        <button className="btn btn-outline-secondary" onClick={() => updateQuantity(product.title, product.quantity + 1)}>+</button>
                                    </div>
                                    <button className="btn btn-outline-danger" onClick={() => removeItem(product.title)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-end align-items-center mt-4">
                <div className="card p-3" style={{ minWidth: '280px' }}>
                    <div className="d-flex justify-content-between">
                        <span>Subtotal</span>
                        <strong>₹{subtotal.toLocaleString()}</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Shipping</span>
                        <strong>₹0</strong>
                    </div>
                    <hr className="my-2" />
                    <div className="d-flex justify-content-between">
                        <span>Total</span>
                        <strong>₹{subtotal.toLocaleString()}</strong>
                    </div>
                    <button className="btn btn-success w-100 mt-3">Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default MyCart;


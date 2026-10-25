import { useCartStore } from "../store/cartStore.js";

const products = [
  { id: 1, name: "UI Starter Kit", description: "Reusable interface components", price: 499 },
  { id: 2, name: "Dashboard Template", description: "A responsive dashboard layout", price: 799 },
  { id: 3, name: "Icon Pack", description: "A set of interface icons", price: 199 }
];

export default function Shop() {
  const items = useCartStore(state => state.items);
  const addItem = useCartStore(state => state.addItem);
  const removeItem = useCartStore(state => state.removeItem);
  const changeQuantity = useCartStore(state => state.changeQuantity);
  const clearCart = useCartStore(state => state.clearCart);
  const totalPrice = useCartStore(state => state.totalPrice());

  return (
    <>
      <div className="page-heading"><div><p className="eyebrow">STATE MANAGEMENT</p><h1>Shopping cart</h1><p className="muted">Zustand shares cart state between product cards and the cart summary.</p></div></div>
      <section className="shop-grid">
        <div>
          <h2 className="section-title">Products</h2>
          <div className="product-list">
            {products.map(product => (
              <article className="product-card" key={product.id}>
                <div><h3>{product.name}</h3><p className="muted">{product.description}</p><strong>₹{product.price.toLocaleString("en-IN")}</strong></div>
                <button className="button" onClick={() => addItem(product)}>Add to cart</button>
              </article>
            ))}
          </div>
        </div>
        <aside className="panel cart-panel">
          <div className="panel-heading"><h2>Your cart</h2><span className="pill">{items.reduce((sum, item) => sum + item.quantity, 0)} items</span></div>
          {items.length === 0 ? <p className="muted">Your cart is empty. Add a product to get started.</p> : (
            <>
              {items.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-main"><strong>{item.name}</strong><small>₹{item.price.toLocaleString("en-IN")} each</small></div>
                  <div className="quantity">
                    <button className="quantity-button" onClick={() => changeQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name}`}>−</button>
                    <span>{item.quantity}</span>
                    <button className="quantity-button" onClick={() => changeQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name}`}>+</button>
                  </div>
                  <button className="text-button danger-text" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              ))}
              <div className="cart-total"><span>Total</span><strong>₹{totalPrice.toLocaleString("en-IN")}</strong></div>
              <button className="button secondary full-width" onClick={clearCart}>Clear cart</button>
            </>
          )}
        </aside>
      </section>
    </>
  );
}

import { useReducer, useState } from "react"
import ProductItem from "./ProductItem"

const initialState = {
  cart: [],
  quantity: 1,
  products: [
    {
      id: 1,
      brand: "Sneaker Company",
      name: "Fall Limited Edition Sneakers",
      description:
        "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
      price: 250,
      discount: 0.5,
      thumbnails: [
        "image-product-1-thumbnail.jpg",
        "image-product-2-thumbnail.jpg",
        "image-product-3-thumbnail.jpg",
        "image-product-4-thumbnail.jpg",
      ],
      imgs: [
        "image-product-1.jpg",
        "image-product-2.jpg",
        "image-product-3.jpg",
        "image-product-4.jpg",
      ],
    },
  ],
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        quantity: 1,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }
    case "INCREASE_QUANTITY":
      return {
        ...state,
        quantity: state.quantity + 1,
      }
    case "DECREASE_QUANTITY":
      if (state.quantity > 1) {
        return {
          ...state,
          quantity: state.quantity - 1,
        }
      }
      return state

    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { cart, quantity, products } = state
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenCart, setIsOpenCart] = useState(false)

  function handleOpenMenu() {
    setIsOpen(true)
    setIsOpenCart(false)
  }

  function handleCloseMenu() {
    setIsOpen(false)
  }

  function handleOpenCart() {
    setIsOpenCart((prev) => !prev)
    setIsOpen(false)
  }

  function handleRemoveFromCart(id) {
    dispatch({ type: "REMOVE_FROM_CART", payload: id })
  }

  return (
    <>
      <header
        className={`header ${isOpen ? "nav-open" : ""} ${
          isOpenCart ? "cart-open" : ""
        }`}
      >
        <div className="logo-box">
          <img
            src="icon-menu.svg"
            alt="hamburger menu icon"
            className="header__hamburger-menu"
            onClick={handleOpenMenu}
          />
          <img src="logo.svg" alt="logo" className="header__logo" />
        </div>
        <nav className="header__nav">
          <img
            src="icon-close.svg"
            alt="close icon"
            onClick={handleCloseMenu}
          />
          <ul className="nav-list">
            <li>
              <a href="#">Collections</a>
            </li>
            <li>
              <a href="#">Men</a>
            </li>
            <li>
              <a href="#">Women</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>

        <div className="user-box">
          <div className="icon-box">
            <img
              src="icon-cart.svg"
              alt="cart icon"
              className="header__cart-icon"
              onClick={handleOpenCart}
            />
            {cart.length > 0 && (
              <p className="header__cart-quantity">{quantity}</p>
            )}
          </div>

          <img
            src="image-avatar.png"
            alt="user avatar"
            className="header__user-avatar"
          />
        </div>
        <div className="cart">
          <p className="cart__heading">Cart</p>
          <div className="items-box">
            {cart.length === 0 ? (
              <p className="empty">Your cart is empty</p>
            ) : (
              <>
                <ul className="cart__items">
                  {cart.map((item) => (
                    <li key={item.id} className="cart__item">
                      <img
                        src={item.thumbnail}
                        alt="product thumbnail"
                        className="item__thumbnail"
                      />
                      <div className="item-box">
                        <p className="item__name">{item.name}</p>
                        <p className="item__price-box">
                          <span className="item__price">${item.price}</span>
                          <span className="item__quantity">
                            {" "}
                            x {item.quantity}
                          </span>
                          <span className="item__total-price">
                            {" "}
                            ${item.totalPrice}
                          </span>
                        </p>
                      </div>
                      <img
                        src="icon-delete.svg"
                        alt="trash icon"
                        className="item__delete-icon"
                        onClick={() => handleRemoveFromCart(item.id)}
                      />
                    </li>
                  ))}
                </ul>
                <button className="btn">Checkout</button>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="main">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            quantity={quantity}
            dispatch={dispatch}
          />
        ))}
      </main>
    </>
  )
}

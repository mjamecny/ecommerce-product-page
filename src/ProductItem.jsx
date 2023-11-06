import { useState } from "react"

import Lightbox from "yet-another-react-lightbox"
import Inline from "yet-another-react-lightbox/plugins/inline"
import "yet-another-react-lightbox/styles.css"

import NextButton from "./NextButton"
import PrevButton from "./PrevButton"
import MinusButton from "./MinusButton"
import PlusButton from "./PlusButton"

export default function ProductItem({ product, dispatch, quantity }) {
  const [open, setOpen] = useState(false)
  const { id, thumbnails, imgs, brand, description, name, price, discount } =
    product

  function handleAddtoCart() {
    const newItem = {
      id,
      name,
      price: price * discount,
      thumbnail: thumbnails[0],
      quantity,
      totalPrice: price * discount * quantity,
    }

    dispatch({ type: "ADD_TO_CART", payload: newItem })
  }

  return (
    <div key={id} className="product">
      <Lightbox
        slides={[
          { src: imgs[0] },
          { src: imgs[1] },
          { src: imgs[2] },
          { src: imgs[3] },
        ]}
        inline={{
          style: {
            width: "100%",
            maxWidth: "900px",
            aspectRatio: "1 / 1",
            margin: "0 auto",
          },
        }}
        carousel={{
          spacing: 0,
          padding: 0,
          imageFit: "cover",
        }}
        plugins={[Inline]}
        render={{
          iconPrev: () => <PrevButton />,
          iconNext: () => <NextButton />,
        }}
      />

      <div className="product__info">
        <p className="product__info__brand">{brand}</p>
        <p className="product__info__name">{name}</p>
        <p className="product__info__description">{description}</p>
        <div className="product__info__price-box">
          <div className="random-box-2">
            <p className="product__info__price">
              ${(price * discount).toFixed(2)}
            </p>
            <p className="product__info__discount">{discount * 100}%</p>
          </div>

          <p className="product__info__before-discount">${price.toFixed(2)}</p>
        </div>
        <div className="random-box">
          <div className="quantity-box">
            <MinusButton dispatch={dispatch} />
            <p className="quantity-box__quantity">{quantity}</p>
            <PlusButton dispatch={dispatch} />
          </div>
          <button className="btn" onClick={handleAddtoCart}>
            <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                fill="currentColor"
              />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

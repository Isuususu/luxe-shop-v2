import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../lib/client";
import { Link, useLoaderData, useParams } from "react-router-dom";
import getProducts from "../../lib/utils";
import Reviews from "../../components/Reviews/Reviews";

//Icons
import { FaRegHeart } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdArrowRoundDown } from "react-icons/io";

import { motion } from "framer-motion";

import BlockContent from "@sanity/block-content-to-react";

import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { TbSquareRoundedMinusFilled } from "react-icons/tb";
import { FaBagShopping } from "react-icons/fa6";

import { useStateContext } from "../../context/StateContext";
export async function loader() {
  return { relatedProducts: await getProducts() };
}

const ProductDetails = () => {
  const windowWidth = window.innerWidth;
  const mobile = windowWidth < 500;

  const relatedProducts = useLoaderData();
  console.log(relatedProducts);
  const [product, setProduct] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [fullSpecificationOpen, setFullSpecificationOpen] =
    useState(false);

  const { addToCart, increaseQty, decreaseQty, qty } =
    useStateContext();

  // const product = useLoaderData();

  const { slug } = useParams();

  useEffect(() => {
    const query = `*[_type == "product" && slug.current == $slug] `;
    client
      .fetch(query, { slug: slug })
      .then((data) => setProduct(data[0]));
  }, []);

  // console.log(product);

  return (
    <>
      <section
        className={`product-detail-container ${
          mobile === false ? "desktop__product-detail-container" : ""
        }`}
      >
        <div
          className={`product-detail-container__buying-options ${
            mobile === false ? "desktop__buying-options" : ""
          }`}
        >
          <h3 className="product-detail-container__buying-options__price">
            £{product.price}
          </h3>
          {/* <AddToCart product={product} /> */}
          <div>
            <button
              type="button"
              className="product-detail-container__buying-options__add-to-cart"
              onClick={() => addToCart(product, qty)}
            >
              <span className="product-detail-container__buying-options__qty">
                <TbSquareRoundedMinusFilled
                  onClick={decreaseQty}
                  style={{ fontSize: "2.2rem" }}
                  className={`product-detail-container__buying-options__qty__button ${
                    qty === 1 ? "btn-not-allowed" : ""
                  }`}
                />
                <p className="product-detail-container__buying-options__qty__value">
                  {qty}
                </p>
                <TbSquareRoundedPlusFilled
                  onClick={increaseQty}
                  style={{ fontSize: "2.2rem" }}
                  className={`product-detail-container__buying-options__qty__button`}
                />
              </span>
              Add to cart
              <FaBagShopping style={{ fontSize: "1.4rem" }} />
            </button>
          </div>
        </div>
        <button className="product-detail-container__back-button">
          <Link to="/">
            <FaArrowLeft style={{ fontSize: "2.4rem" }} />
          </Link>
          <span>{product.category && product.category[0]}</span>
        </button>
        {/* <ProductImages product={product} /> */}
        <div>
          {product.image && (
            <>
              <img
                src={urlFor(product.image[imageIndex])}
                alt=""
                className="product-detail-container__image"
              />
              <div className="product-detail-container__slides">
                {product.image.map((item, index) => (
                  <img
                    src={urlFor(item)}
                    alt=""
                    className={`product-detail-container__slides__slide ${
                      index === imageIndex ? "selected-slide" : ""
                    }`}
                    onMouseEnter={() => setImageIndex(index)}
                    key={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="product-detail-container__reviews">
          <Reviews
            stars={product.stars}
            ratings={product.ratings}
            cardSmall={product.cardSmall}
          />
        </div>
        <button className="product-detail-container__add-to-wishlist">
          <FaRegHeart fontSize="2rem" />
        </button>
        <div className="product-detail-container__details">
          <h2 className="product-detail-container__details__name">
            {product.name}
          </h2>

          <div
            className="product-detail-container__details__desc"
            id="desc"
          >
            <p>{product.details}</p>
            {/* <ToggleSpecification product={product} /> */}
            <>
              {!fullSpecificationOpen && (
                <button
                  onClick={() => setFullSpecificationOpen(true)}
                  className="product-detail-container__details__desc__show-spec"
                >
                  Full specification
                  <IoMdArrowRoundDown />
                </button>
              )}
              {fullSpecificationOpen && (
                <motion.div
                  className="product-detail-container__specification"
                  initial={{ opacity: 0, maxHeight: 0 }}
                  animate={{ opacity: 1, maxHeight: "200vh" }}
                >
                  <h3>Specification</h3>

                  <BlockContent blocks={product.specification} />
                </motion.div>
              )}
            </>
          </div>
        </div>
        <div className="product-detail-container__related">
          <h2>You may also like</h2>
          <div className="product-detail-container__related__slider">
            {/* <RelatedProducts products={products} /> */}
            {/* <Swiper
      slidesPerView={2}
      spaceBetween={20}
      autoplay={true}
      speed={500}
      loop={true}
      cssMode={true}
    >
      {products.map((item) => (
        <SwiperSlide key={item._id}>
          <Product key={item._id} product={item} cardSmall={true} />
        </SwiperSlide>
      ))}
    </Swiper> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;

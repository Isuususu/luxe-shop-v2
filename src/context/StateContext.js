import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import toast from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const [searchBar, setSearchBar] = useState(false);

  let matchingProduct;
  let matchingProductIndex;

  //
  //Adding item to cart
  //

  const addToCart = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    setTotalQuantities((prevQuantity) => prevQuantity + quantity);

    if (checkProductInCart) {
      //If you have product in cart and you choose to add the same product
      //this will just increase the quantiy and total price insetad
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === product._id)
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          };
        return cartItem;
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} x ${product.name} added to cart`, {
      position: "top-center",
      duration: 2000,
      style: { marginTop: "10vh" },
    });
    setQty(1);
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem(
        "shoppingBag",
        JSON.stringify(...[cartItems])
      );
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(totalQuantities)
      );
      localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    }
  }, [cartItems]);

  const [clientSideData, setClientSideData] = useState([]);
  const [clientSideQuantity, setClientSideQuantity] = useState();
  const [clientSidePrice, setClientsidePrice] = useState();

  useEffect(() => {
    // Use local storage or any other client-side mechanism here
    const storedValue = localStorage.getItem("shoppingBag");
    const storedTotalQuantities =
      localStorage.getItem("totalQuantity");
    const storedTotalPrice = localStorage.getItem("totalPrice");
    //Getting a value of local storage

    if (storedValue && cartItems.length < 1) {
      setCartItems(clientSideData);
      setTotalPrice(clientSidePrice);
      setTotalQuantities(clientSideQuantity);

      //If there is value in local storage and not in cartItems run this
    }
    if (storedValue) {
      //This should run only when there is a value on client side

      setClientSideData(JSON.parse(storedValue));
      setClientSideQuantity(JSON.parse(storedTotalQuantities));
      setClientsidePrice(JSON.parse(storedTotalPrice));
    }
  }, [cartItems]);

  //
  // Removing cart item
  //
  const removeItem = (product) => {
    matchingProduct = cartItems.find(
      (item) => item._id === product._id
    );

    const newCardItems = cartItems.filter(
      (item) => item._id !== product._id
    );

    //New card items in remove function

    setTotalPrice(
      (prev) =>
        prev - matchingProduct.price * matchingProduct.quantity
    );
    setTotalQuantities((prev) => prev - matchingProduct.quantity);
    setCartItems(newCardItems);
  };

  //
  // Updating cart item quantity when you add item to cart that already exists
  //

  const updateCartItemQuantity = (id, value) => {
    matchingProduct = cartItems.find((item) => item._id === id);
    matchingProductIndex = cartItems.findIndex(
      (product) => product._id === id
    );
    //Remove not updated element and replace it with new one so products are
    //not duplicating
    const newCardItems = cartItems.filter((item) => item._id !== id);
    //Incrementing item quantity
    if (value === "increment") {
      setCartItems([
        ...newCardItems,
        {
          ...matchingProduct,
          quantity: matchingProduct.quantity + 1,
        },
      ]);
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + matchingProduct.price
      );
      setTotalQuantities((prev) => prev + 1);
      //Decrementing item quantity
    } else if (
      value === "decrement" &&
      matchingProduct.quantity > 1
    ) {
      setCartItems([
        ...newCardItems,
        {
          ...matchingProduct,
          quantity: matchingProduct.quantity - 1,
        },
      ]);
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice - matchingProduct.price
      );
      setTotalQuantities((prev) => prev - 1);
    }
  };

  const increaseQty = (e) => {
    e.stopPropagation();
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = (e) => {
    e.stopPropagation();
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        showMenu,
        setShowMenu,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        increaseQty,
        decreaseQty,
        addToCart,
        updateCartItemQuantity,
        removeItem,
        searchBar,
        setSearchBar,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

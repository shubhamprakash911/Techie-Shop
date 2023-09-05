const roundNum = (num) => {
  return Math.round(num);
};

export const updateCart = (state) => {
  // Calculate the items price
  state.itemsPrice = roundNum(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate the shipping price
  state.shippingPrice = roundNum(state.itemsPrice > 100 ? 0 : 10);

  // Calculate the tax price
  state.taxPrice = roundNum(Number(0.15 * state.itemsPrice));

  // Calculate the total price
  state.totalPrice =
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice);

  // Save the cart to localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};

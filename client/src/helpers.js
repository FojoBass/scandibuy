export const getAttibute = (attrId, attrItemId, product, isDefault = false) => {
  const attributeItems =
    product.attributes.find(
      (attr) => attr.id.toLowerCase() === attrId.toLowerCase()
    )?.items ?? [];

  let attributeItem;

  if (isDefault) attributeItem = attributeItems[0];
  else
    attributeItem = attributeItems.find(
      (item) => item.id.toLowerCase() === attrItemId.toLowerCase()
    );
  return attributeItem ?? null;
};

export const productInCart = (cartItemToAdd, cart) => {
  const { product, orderInfo } = cartItemToAdd;

  const itemInCart =
    cart.find((item) => item.product.id === product.id) ?? null;
  if (itemInCart) {
    const selAttrsToAdd = orderInfo.selectedAttributes;
    const selAttrsInCart = itemInCart.orderInfo.selectedAttributes;

    if (selAttrsToAdd.length === selAttrsInCart.length) {
      let checker = false;
      for (let i = 0; i < selAttrsInCart.length; i++) {
        const id = selAttrsInCart[i].id;
        const selAttrToAdd =
          selAttrsToAdd.find((attr) => attr.id === id)?.selItem ?? null;

        if (!selAttrToAdd) {
          checker = false;
          break;
        } else {
          if (selAttrToAdd.id !== selAttrsInCart[i].selItem.id) {
            checker = false;
            break;
          }
          checker = true;
        }
      }
      return checker ? itemInCart.id : checker;
    }
  }
  return false;
};

export const kebabFormatter = (value) =>
  value.toLowerCase().split(' ').join('_');

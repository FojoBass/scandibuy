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

export const cartChecker = (cartItemToAdd, cart) => {
    // *Cart checker checks if there is already a product in the cart with same attribute

    const { product, orderInfo } = cartItemToAdd;
    let isProductInCart = false;
    let orderId = 0;

    const itemIdInCart =
        cart.filter((item) => item.product.id === product.id) ?? [];

    if (itemIdInCart.length) {
        const selectedAttributesToAdd = orderInfo.selectedAttributes;

        for (let ind = 0; ind < itemIdInCart.length; ind++) {
            const itemInCartselectedAttributes =
                itemIdInCart[ind].orderInfo.selectedAttributes;

            const itemOrderId = itemIdInCart[ind].id;

            for (let i = 0; i < itemInCartselectedAttributes.length; i++) {
                const currentSelectedAttribute =
                    selectedAttributesToAdd.find(
                        (attr) => attr.id === itemInCartselectedAttributes[i].id
                    ) ?? null;

                if (!currentSelectedAttribute) {
                    isProductInCart = false;
                    break;
                }
                if (
                    itemInCartselectedAttributes[i].selItem.value !==
                    currentSelectedAttribute.selItem.value
                ) {
                    isProductInCart = false;
                    break;
                } else isProductInCart = true;
            }

            if (isProductInCart) {
                orderId = itemOrderId;
                break;
            }
        }
    } else {
        isProductInCart = false;
    }
    return { isProductInCart, orderId };
};

export const kebabFormatter = (value, isLower = true) =>
    isLower
        ? value.toLowerCase().split(" ").join("-")
        : value.split(" ").join("-");

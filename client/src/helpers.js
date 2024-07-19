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

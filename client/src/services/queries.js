const AllProducts = `query GetProducts{products{name, prices, id, gallery, inStock, attributes {attributes}}}`;

const AllCategories = `query Categories{categories}`;

const GetProduct = `query Product($id: ID!){product(id: $id){id, name, inStock, gallery, prices, attributes{ attributes}}}`;

const CreateOrder = `mutation CreateOrder($orders: [OrderInput!]!){createOrder(orders: $orders)}`;

const CategoryProducts = `query CategProducts($categ: String!){categProduct(categ: $categ){name, prices, id, gallery, inStock, attributes {attributes}}}`;

export {
  AllProducts,
  AllCategories,
  CategoryProducts,
  CreateOrder,
  GetProduct,
};

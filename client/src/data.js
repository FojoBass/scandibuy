export const categories = [
  {
    name: 'all',
    __typename: 'Category',
  },
  {
    name: 'clothes',
    __typename: 'Category',
  },
  {
    name: 'tech',
    __typename: 'Category',
  },
];

export const products = [
  {
    id: 'huarache-x-stussy-le',
    name: 'Nike Air Huarache Le',
    inStock: true,
    gallery: [
      'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087',
      'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087',
      'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087',
      'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087',
      'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087',
    ],
    description: 'Great sneakers for everyday use!',
    category: 'clothes',
    attributes: [
      {
        id: 'Size',
        items: [
          {
            displayValue: '40',
            value: '40',
            id: '40',
            __typename: 'Attribute',
          },
          {
            displayValue: '41',
            value: '41',
            id: '41',
            __typename: 'Attribute',
          },
          {
            displayValue: '42',
            value: '42',
            id: '42',
            __typename: 'Attribute',
          },
          {
            displayValue: '43',
            value: '43',
            id: '43',
            __typename: 'Attribute',
          },
        ],
        name: 'Size',
        type: 'text',
        __typename: 'AttributeSet',
      },
    ],
    prices: [
      {
        amount: 144.69,
        currency: { label: 'USD', symbol: '$', __typename: 'Currency' },
        __typename: 'Price',
      },
    ],
    brand: 'Nike x Stussy',
    __typename: 'Product',
  },
  {
    id: 'jacket-canada-goosee',
    name: 'Jacket',
    inStock: true,
    gallery: [
      'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg',
      'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg',
      'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg',
      'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg',
      'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg',
      'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png',
      'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png',
    ],
    description: 'Awesome winter jacket',
    category: 'clothes',
    attributes: [
      {
        id: 'Size',
        items: [
          {
            displayValue: 'Small',
            value: 'S',
            id: 'Small',
            __typename: 'Attribute',
          },
          {
            displayValue: 'Medium',
            value: 'M',
            id: 'Medium',
            __typename: 'Attribute',
          },
          {
            displayValue: 'Large',
            value: 'L',
            id: 'Large',
            __typename: 'Attribute',
          },
          {
            displayValue: 'Extra Large',
            value: 'XL',
            id: 'Extra Large',
            __typename: 'Attribute',
          },
        ],
        name: 'Size',
        type: 'text',
        __typename: 'AttributeSet',
      },
    ],
    prices: [
      {
        amount: 518.47,
        currency: { label: 'USD', symbol: '$', __typename: 'Currency' },
        __typename: 'Price',
      },
    ],
    brand: 'Canada Goose',
    __typename: 'Product',
  },
  {
    id: 'ps-5',
    name: 'PlayStation 5',
    inStock: false,
    gallery: [
      'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg',
    ],
    description:
      'A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha',
    category: 'tech',
    attributes: [
      {
        id: 'Color',
        items: [
          {
            displayValue: 'Green',
            value: '#44FF03',
            id: 'Green',
            __typename: 'Attribute',
          },
          {
            displayValue: 'Cyan',
            value: '#03FFF7',
            id: 'Cyan',
            __typename: 'Attribute',
          },
          {
            displayValue: 'Blue',
            value: '#030BFF',
            id: 'Blue',
            __typename: 'Attribute',
          },
          {
            displayValue: 'Black',
            value: '#000000',
            id: 'Black',
            __typename: 'Attribute',
          },
          {
            displayValue: 'White',
            value: '#FFFFFF',
            id: 'White',
            __typename: 'Attribute',
          },
        ],
        name: 'Color',
        type: 'swatch',
        __typename: 'AttributeSet',
      },
      {
        id: 'Capacity',
        items: [
          {
            displayValue: '512G',
            value: '512G',
            id: '512G',
            __typename: 'Attribute',
          },
          {
            displayValue: '1T',
            value: '1T',
            id: '1T',
            __typename: 'Attribute',
          },
        ],
        name: 'Capacity',
        type: 'text',
        __typename: 'AttributeSet',
      },
    ],
    prices: [
      {
        amount: 844.02,
        currency: { label: 'USD', symbol: '$', __typename: 'Currency' },
        __typename: 'Price',
      },
    ],
    brand: 'Sony',
    __typename: 'Product',
  },
  {
    id: 'xbox-series-s',
    name: 'Xbox Series S 512GB',
    inStock: false,
    gallery: [
      'https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg',
    ],
    description:
      '\n<ul>\n<li>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</li>\n<li>Spiele Games mit bis zu 120 Bilder pro Sekunde</li>\n<li>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</li>\n<li>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</li>\n<li>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</li>\n<li>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</li>\n<li>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</li>\n<li>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</li>\n<li>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</li>\n<li>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies & TV und mehr</li>\n</ul>\n',
    category: 'tech',
    attributes: [
      {
        id: 'Color',
        items: [
          {
            displayValue: 'Green',
            value: '#44FF03',
            id: 'Green',
            __typename: 'Attribute',
          },
          {
            displayValue: 'Cyan',
            value: '#03FFF7',
            id: 'Cyan',
            __typename: 'Attribute',
          },
          {
            displayValue: 'Blue',
            value: '#030BFF',
            id: 'Blue',
            __typename: 'Attribute',
          },
          {
            displayValue: 'Black',
            value: '#000000',
            id: 'Black',
            __typename: 'Attribute',
          },
          {
            displayValue: 'White',
            value: '#FFFFFF',
            id: 'White',
            __typename: 'Attribute',
          },
        ],
        name: 'Color',
        type: 'swatch',
        __typename: 'AttributeSet',
      },
      {
        id: 'Capacity',
        items: [
          {
            displayValue: '512GB',
            value: '512GB',
            id: '512GB',
            __typename: 'Attribute',
          },
        ],
        name: 'Capacity',
        type: 'text',
        __typename: 'AttributeSet',
      },
    ],
    prices: [
      {
        amount: 458.64,
        currency: { label: 'USD', symbol: '$', __typename: 'Currency' },
        __typename: 'Price',
      },
    ],
    brand: 'Microsoft',
    __typename: 'Product',
  },
];

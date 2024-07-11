const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8001;

app.use(bodyParser.json());
app.set('views', __dirname + '/views');

let products = [
  { id: 1, name: 'Smartphone', price: 699, description: 'A high-end smartphone with 128GB storage' },
  { id: 2, name: 'Laptop', price: 999, description: 'A powerful laptop with 16GB RAM and 512GB SSD' },
  { id: 3, name: 'Headphones', price: 199, description: 'Noise-cancelling over-ear headphones' },
  { id: 4, name: 'Smartwatch', price: 299, description: 'A smartwatch with fitness tracking features' },
  { id: 5, name: 'Tablet', price: 499, description: 'A 10-inch tablet with 64GB storage' }
];

// 상품 생성 (추가)
app.post('/products', (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price || !description) {
    return res.status(400).json({ message: 'Name, price, and description are required' });
  }
  const newProduct = { id: products.length + 1, name, price, description };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// 상품 목록 조회
app.get('/products', (req, res) => {
  res.json(products);
});

// 특정 상품 조회
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// 상품 수정
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const productIndex = products.findIndex(p => p.id === parseInt(id));
  if (productIndex !== -1) {
    products[productIndex] = { id: parseInt(id), name, price, description };
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// 상품 삭제
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === parseInt(id));
  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1);
    res.json(deletedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
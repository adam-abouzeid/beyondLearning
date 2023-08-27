import asyncHandler from "../middleware/asyncHandler.js";
import Item from "../models/itemModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber || 1);
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Item.countDocuments({ ...keyword });

  const items = await Item.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({
    items,
    page,
    pages: Math.ceil(count / pageSize),
  });
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Item.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  const product = new Item({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    category: "Sample Category",
    countInStock: 0,
    description: "Sample Description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { name, price, description, image, category, countInStock } = req.body;
  const product = await Item.findById(req.params.id);
  if (product) {
    product.name = name;
    product.description = description;
    product.category = category;
    product.image = image;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource Not FOund");
  }
};
// @desc    delete a product
// @route   DEL /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  const product = await Item.findById(req.params.id);

  if (product) {
    await Item.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product Deleted" });
  } else {
    res.status(404);
    throw new Error("Resource Not FOund");
  }
};
export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

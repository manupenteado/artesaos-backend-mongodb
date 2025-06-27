import Product from '../models/Product.js';
import User from '../models/User.js';

const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, artisanId } = req.body;
    
    // Verificar se o artesão existe e tem o role correto
    const artisan = await User.findById(artisanId);
    if (!artisan) {
      return res.status(404).json({ message: 'Artesão não encontrado' });
    }
    
    if (artisan.role !== 'artesan') {
      return res.status(403).json({ message: 'Apenas artesãos podem cadastrar produtos' });
    }
    
    const product = new Product({
      name,
      price,
      description,
      category,
      artisan: artisanId
    });
    
    await product.save();
    await product.populate('artisan', 'name email');
    
    res.status(201).json({ message: 'Produto cadastrado com sucesso', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('artisan', 'name email');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsByArtisan = async (req, res) => {
  try {
    const { artisanId } = req.params;
    const products = await Product.find({ artisan: artisanId }).populate('artisan', 'name email');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, description },
      { new: true, runValidators: true }
    ).populate('artisan', 'name email');
    
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    
    res.status(200).json({ message: 'Produto atualizado com sucesso', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { 
  createProduct, 
  getProducts, 
  getProductsByArtisan, 
  updateProduct, 
  deleteProduct 
};


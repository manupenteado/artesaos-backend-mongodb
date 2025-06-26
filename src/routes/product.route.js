import express from 'express';
import productController from '../controller/product.controller.js';

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/artisan/:artisanId', productController.getProductsByArtisan);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;

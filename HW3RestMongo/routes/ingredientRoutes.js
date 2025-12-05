const express = require('express');
const Ingredient = require('../models/ingredient'); // ✅ Importa con mayúscula
const router = express.Router();

// GET todos los ingredientes
router.get('/ingredients', async(req, res) => { // ✅ Cambié a /ingredients (plural)
    try {
        const ingredients = await Ingredient.find(); // ✅ Renombré variable
        res.json(ingredients);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

// GET ingredientes por categoría
router.get('/ingredients/category/:category', async (req, res) => { // ✅ Agregué /
    try {
        const ingredients = await Ingredient.find({category: req.params.category}); // ✅ Corregí await
        if (ingredients.length === 0) {
            res.status(404).json({message: 'No ingredients found in this category'});
        } else {
            res.json(ingredients);
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }  
});

// GET ingrediente por productId
router.get('/ingredients/:productId', async (req, res) => {
    try {
        const ingredient = await Ingredient.findOne({productId: req.params.productId});
        if (ingredient == null) {
            res.status(404).json({message: 'Ingredient not found'});
        } else {
            res.json(ingredient);
        }
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

// POST crear ingrediente
router.post('/ingredient', async (req, res) => {
    const ingredientObject = new Ingredient({ // ✅ Usa Ingredient con mayúscula
        productId: req.body.productId,
        name: req.body.name,
        category: req.body.category,
        product: req.body.product,
        brand: req.body.brand,
        size: req.body.size,
        sizeUnit: req.body.sizeUnit,
        price: req.body.price,
        availableUnits: req.body.availableUnits,
        supplier: req.body.supplier
    });

    try {
        const newIngredient = await ingredientObject.save();
        res.status(201).json(newIngredient); // ✅ Cambié req por res
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// PUT actualizar ingrediente
router.put('/ingredient/:productId', async (req, res) => {
    try {
        const ingredientObject = await Ingredient.findOne({productId: req.params.productId}); // ✅ Corregí findOnse y el modelo
        if (ingredientObject == null) {
            return res.status(404).json({message: 'Ingredient not found'});
        }

        if (req.body.name != null) ingredientObject.name = req.body.name;
        if (req.body.category != null) ingredientObject.category = req.body.category;
        if (req.body.product != null) ingredientObject.product = req.body.product;
        if (req.body.brand != null) ingredientObject.brand = req.body.brand;
        if (req.body.size != null) ingredientObject.size = req.body.size;
        if (req.body.sizeUnit != null) ingredientObject.sizeUnit = req.body.sizeUnit;
        if (req.body.price != null) ingredientObject.price = req.body.price;
        if (req.body.availableUnits != null) ingredientObject.availableUnits = req.body.availableUnits;
        if (req.body.supplier != null) ingredientObject.supplier = req.body.supplier; 
        
        const updatedIngredient = await ingredientObject.save();
        res.json(updatedIngredient);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// DELETE eliminar ingrediente
router.delete('/ingredient/:productId', async (req, res) => {
    try {
        const ingredientObject = await Ingredient.findOne({productId: req.params.productId}); // ✅ Usa Ingredient
        if (ingredientObject == null) {
            return res.status(404).json({message: 'Ingredient not found'});
        }
        await Ingredient.deleteOne({productId: req.params.productId}); // ✅ Usa Ingredient
        res.json({message: 'Ingredient deleted successfully'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
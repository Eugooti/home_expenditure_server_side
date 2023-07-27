const Category=require("../Models/Category")
const express=require("express")
const router=express.Router();
const Expenditure=require("../Models/ExpenditureModel");


// Post  category
router.post("/category",async (req,res)=>{
    try {
        const { name, description } = req.body;
        const category = await Category.create({ name, description });

        res.status(201).json({ category });
    }catch (error){
        res.status(500).json({ Error: 'Failed to create category' });
    }
})

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve categories' });
    }
});

// Get category by ID
router.get('/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve category' });
    }
});

// Update category by ID
router.put('/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name, description } = req.body;

        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Update the category
        category.name = name;
        category.description = description;
        await category.save();

        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
});


// Delete category by ID
router.delete('/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;

        const category = await Category.findByPk(categoryId);

        const expenditure=await Expenditure.findOne({where:{category:category.name}})

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        else if (expenditure){
            return res.status(404).json({error:"category in use"});
        }
        // Delete the category
        await category.destroy();

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
});


module.exports=router;

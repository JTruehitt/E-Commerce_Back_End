const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({ include: Product });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  const { id } = req.params
  // be sure to include its associated Products
  try {
    const category = await Category.findAll({
      where: {
        id: id
      },
      include: Product
    });
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}`})
  }
});

router.post("/", async (req, res) => {
  // create a new category
  const category = req.body

  try {
    const newCategory = await Category.create(category)
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}`})
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;

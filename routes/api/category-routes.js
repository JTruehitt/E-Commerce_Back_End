const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({ include: Product });

    if (!categories)
      return res.status(404).json({ message: "Sorry, no categories found." });

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  const { id } = req.params;
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(id, { include: Product });

    if (!category)
      return res
        .status(404)
        .json({ message: "Sorry, no category with that ID found." });

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
});

router.post("/", async (req, res) => {
  // create a new category
  const category = req.body;

  try {
    const newCategory = await Category.create(category);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value

  try {
    const { id } = req.params;
    const category_name = req.body;
    await Category.update(category_name, {
      where: {
        id: id,
      },
    });

    const updatedCategory = await Category.findAll({
      where: {
        id: id,
      },
    });

    if (!updatedCategory)
      return res
        .status(404)
        .json({ message: "No category with that ID was found." });

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id)
    if (!category)
      return res
        .status(404)
        .json({ message: "No category with that ID found." });

    const deleted = await category.destroy()
    res.status(200).json({ deleted: deleted});
  } catch (err) {
    res.status(err).json({ message: `Error: ${err}` });
  }
});

module.exports = router;

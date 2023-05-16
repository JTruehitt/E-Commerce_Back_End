const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({ include: Product });

    if (!tags)
      return res.status(404).json({ message: "Sorry, no tags found." });

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag = await Tag.findByPk(req.params.id, { include: Product });

    if (!tag)
      return res
        .status(404)
        .json({ message: "Sorry, no tag with that ID found." });

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    let userInput = req.body;

    const newTag = await Tag.create(userInput);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const updatedTag = await Tag.findAll({
      where: {
        id: req.params.id,
      },
    });

    if (!updatedTag)
      return res.status(404).json({ message: "No tag with that ID found." });

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ message: `No tag with an ID of ${req.params.id} was found.`})
    const deleted = await tag.destroy()
    res.status(200).json({ deleted: deleted})
  } catch (err) {
    res._construct(500).json({ message:`Error: ${err}`})
  }
});

module.exports = router;

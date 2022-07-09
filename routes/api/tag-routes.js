const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

 // find all tags
router.get('/', async (req, res) => {
   // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});


// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findOne({ where: { id: req.params.id},
      include: [{ model: Product, through: ProductTag}]})

    if(!tagData) {
      res.status(404).json({message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  });


  // create a new tag
router.post('/', async (req, res) => {
  Tag.create(req.body) 
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(404).json(err))
});


// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body.tag_name, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag with this id' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  } 
});


  // delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!tagData) {
      res.status(404).json({ messgae: 'No tag with this id'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;

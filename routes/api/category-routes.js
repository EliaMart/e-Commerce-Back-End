const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  // find all categories
router.get('/', async (req, res) => {
  // be sure to include its associated Products
 try {
   const catData = await Category.findAll({
     include: [{ model: Product }],
   });
   res.status(200).json(catData);
 } catch (err) {
   res.status(500).json(err)
 }
});

 // find one category by its `id` value
router.get('/:id', async (req, res) => {
  // be sure to include its associated Products
  try {
    const catData = await Category.findOne({ where: { id: req.params.id},
      include: [{ model: Product }]})

    if(!catData) {
      res.status(404).json({message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
  });
;

// create a new category
router.post('/', (req, res) => {
  Category.create(req.body) 
  .then((category) => res.status(200).json(category))
  .catch((err) => res.status(404).json(err))
});

 // update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const catData = await Category.update(req.body.category_name, {
      where: {
        id: req.params.id,
      },
    });
    if (!catData[0]) {
      res.status(404).json({ message: 'No category with this id' });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  } 
});


// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!catData) {
      res.status(404).json({ messgae: 'No category with this id'});
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

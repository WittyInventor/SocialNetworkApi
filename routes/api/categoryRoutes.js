const router = require('express').Router();
const { Category, } = require('../../models');
// importing information from the models folder in the category.js class file.

// GET all categories
router.get('/', async (req, res) => {
  // the get('/'), async(promise code) and the users request and response from computer is in the first steps of the get.
  try {
    const categoryData = await
      // await is telling the code that it will wait until they receive the code communication info from the async promise code and the request from the user and the response from the developers/server.
      Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(categoryData);
  }catch(err){
    res.status(400).json(err);
  }
}
)

// get means reading the request
// post means to create the request
// update means to put it
// Create Read Update Delete
// Post   Get   Put    Delete
// CREATE a category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a category
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

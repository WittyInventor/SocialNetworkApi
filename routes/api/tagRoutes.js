const router = require('express').Router();
const { Tag, } = require('../../models');
// importing information from the models folder in the product.js class file.

// GET all products
router.get('/', async (req, res) => {
  // the get('/'), async(promise code) and the users request and response from computer is in the first steps of the get.
  try {
    const tagData = await
      // await is telling the code that it will wait until they receive the code communication info from the async promise code and the request from the user and the response from the developers/server.
      Tag.findAll();
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(tagData);
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

// CREATE a product
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

// PUT a product

router.put('/:id', async (req, res) => {
    try {
      const tagData = await Tag.update(
        {tag_name:req.body.tag_name},
        {
        where: {
          id: req.params.id
        }
      });
  
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
  
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
});
module.exports = router;













module.exports = router;

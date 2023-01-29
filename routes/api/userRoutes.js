const router = require('express').Router();
const { User, } = require('../../models');
// importing information from the models folder in the user.js class file.

// GET all users
router.get('/', async (req, res) => {
  // the get('/'), async(promise code) and the users request and response from computer is in the first steps of the get.
  try {
    const userData = await
      // await is telling the code that it will wait until they receive the code communication info from the async promise code and the request from the user and the response from the developers/server.
      User.find();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET a single user by its _id and populated thought and friend data

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findById(
        req.params.id
    ).populate("thoughts").populate("friends");
    res.status(200).json(userData);
  }catch(err){
    console.log(err)
    res.status(400).json(err);
  }
}
)

// get means reading the request
// post means to create the request
// update means to put it
// Create Read Update Delete
// Post   Get   Put    Delete
// CREATE a user
// new user post route below 
"/api/users"

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// DELETE to remove user by its _id

router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.deleteOne({
      
        id: req.params.id
      
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT to update a user by its _id
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.replaceOne(
      {
        _id: req.params.id
      },
      {username:req.body.username,email:req.body.email},
      
    );

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//"/api/users/54/friends/76"

router.post('/:userId/friends/:friendId', async (req, res) => {
  
  User.findOneAndUpdate(
    { _id: req.params.userId },
    {$push:{friends:req.params.friendId}}

  )
    .then((friend) =>
      !friend
        ? res.status(404).json({ message: 'No friend with this id!' })
        : res.json(friend)
    )
    .catch((err) => res.status(500).json(err));
 
  })


  router.delete('/:userId/friends/:friendId', async (req, res) => {
    console.log(req.params)
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { $gte: req.params.friendId } } },
      {new:true}
    )
    // $gte means it gets the value of the element of friend- it will find the friendId inside the array. 
    
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: 'No friend with this id!' })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
   
  
    })



module.exports = router;

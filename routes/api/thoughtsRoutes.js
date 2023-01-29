const router = require('express').Router();
const { Thought,User } = require('../../models');
// importing information from the models folder in the thought.js class file.

// GET all thoughts
router.get('/', async (req, res) => {
  // the get('/'), async(promise code) and the thoughts request and response from computer is in the first steps of the get.
  try {
    const thoughtData = await
      // await is telling the code that it will wait until they receive the code communication info from the async promise code and the request from the thought and the response from the developers/server.
      Thought.find();
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single thought by its _id 
router.get('/:id', async (req, res) => {
  try {
    const thoughtData = await Thought.findById(
        req.params.id
    );
    res.status(200).json(thoughtData);
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
// CREATE a user
// new user post route below 

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)


router.post('/', async (req, res) => {
  try {
    
    const thoughtData = await Thought.create(req.body);
    // code above means its creating a new thought and awaiting for it
     await User.findByIdAndUpdate(
      
        req.body.userId     ,
      {$push:{thoughts:thoughtData.id}},
      
    );
    res.status(200).json(thoughtData);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// DELETE to remove a thought by its _id

router.delete('/:id', async (req, res) => {
  try {
    const thoughtData = await Thought.deleteOne({
      
        id: req.params.id
      
    });

    if (!thoughtData) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }

    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT to update a thought by its _id
router.put('/:id', async (req, res) => {
  try {
    const thoughtData = await Thought.updateOne(
      {
        _id: req.params.id
      },
      {thoughtText:req.body.thoughtText},
    );

    if (!thoughtData) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
  // code above: if the user sends a nonexistent thought id then the computer code will return a message to let them know its not there.

  // code below: if the thought id is FOUND, then it will return the results of the thought data.

  // error 404 is targeted towards communication of the error to the user whereas the 500 error is communicated to the developers. That is the main difference.
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:thoughtId/reactions/', async (req, res) => {
  
  try {

    const thoughtData = await Thought.findByIdAndUpdate(
     {_id: req.params.thoughtId} 
     ,
     {reactions:req.body})

     if (!thoughtData) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
  

    res.status(200).json(thoughtData);
  } catch(err) {
    res.status(500).json(err)
  }
  })

  router.delete('/:thoughtId/reactions/', async (req, res) => {
    
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.body.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
 
  })

module.exports = router;



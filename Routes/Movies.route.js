const router = require('express').Router();
const Detail = require('../models/Movie.model');

router.route('/').get((req, res) => {
  Detail.find()
    .then(Detail => res.json(Detail))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
  const title = req.body.title;
  const genre  = req.body.genre;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  const detail = new Detail({
    title,
    genre,
    description,
    imageUrl
  });
detail.save()
  .then(() => res.json('Movie added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Detail.findById(req.params.id)
    .then(Detail => res.json(Detail))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Detail.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Detail.findById(req.params.id)
    .then(detail => {
      detail.title = req.body.title;
      detail.genre = req.body.genre;
      detail.description = req.body.description;

      detail.save()
        .then(() => res.json('Movie updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
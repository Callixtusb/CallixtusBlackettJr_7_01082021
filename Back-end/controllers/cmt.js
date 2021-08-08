const cmt = require('../models/cmt');
const fs = require('fs');


// Middleware display one comment
exports.getOneCmt = (req, res, next) => {
    cmt.findOne({ _id: req.params.id })
    .then(cmt => res.status(200).json(cmt))
    .catch(error => res.status(404).json({ error }));
};

// Middleware display of all comments
exports.getAllCmts = (req, res, next) => {
    cmt.find()
    .then(cmts => res.status(200).json(cmts))
    .catch(error => res.status(400).json({ error }));
};



//Créer une nouvelle cmt /////////////////////////////////////////////////
exports.createCmt = (req, res, next) => {
  const cmtObject = JSON.parse(req.body.cmt);
  delete cmtObject._id;
  const cmt = new Cmt({
    ...cmtObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  console.log(cmt)
  cmt.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};



//Modifier une cmt //////////////////////////////////////////////////
exports.modifyCmt = (req, res, next) => {
  const cmtObject = req.file ?
    {
      ...JSON.parse(req.body.cmt),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    cmt.updateOne({ _id: req.params.id }, { ...cmtObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};


//Effacer une cmt //////////////////////////////////////////////////
exports.deleteCmt = (req, res, next) => {
    Cmt.findOne({ _id: req.params.id })
    .then(cmt => {
      const filename = cmt.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        cmt.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};



/** Contrôle pour ajouter, modifier, mettre à jour et effacer y compris les likes et les dislikes **/
//Liker une sauce //////////////////////////////////////////////////
exports.likeCmt = (req, res, next) => {
  switch (req.body.like) {
    // Défault = 0
    // Check that the user hasn't already liked the cmt
    case 0:
        Cmt.findOne({ _id: req.params.id })
        .then((cmt) => {
          if (cmt.usersLiked.find(user => user === req.body.userId)) {
            Cmt.updateOne({ _id: req.params.id }, {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
              _id: req.params.id
            })
              .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
              .catch((error) => { res.status(400).json({ error: error }); });

            // check that the user hasn't already diliked the sauce
          } if (cmt.usersDisliked.find(user => user === req.body.userId)) {
            Cmt.updateOne({ _id: req.params.id }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
              _id: req.params.id
            })
              .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
              .catch((error) => { res.status(400).json({ error: error }); });
          }
        })
        .catch((error) => { res.status(404).json({ error: error }); });
      break;
    //Mise à jour des likes (+1)
    case 1:
        Cmt.updateOne({ _id: req.params.id }, {
        $inc: { likes: 1 },
        $push: { usersLiked: req.body.userId },
        _id: req.params.id
      })
        .then(() => { res.status(201).json({ message: 'Ton like a été pris en compte!' }); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;

    //Mise à jour des dislikes (+1)
    case -1:
        Cmt.updateOne({ _id: req.params.id }, {
        $inc: { dislikes: +1 },
        $push: { usersDisliked: req.body.userId },
        _id: req.params.id
      })
        .then(() => { res.status(201).json({ message: 'Ton dislike a été pris en compte!' }); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;

    default:
      console.error('mauvaise requête');
  }
};
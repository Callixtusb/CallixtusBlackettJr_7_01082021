const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

// Routes pour le fonctionement des comments..
router.post('', auth, multer, commentCtrl.createSauce);
router.put('/:id', auth, multer, commentCtrl.modifySauce);
router.delete('/:id', auth, multer, commentCtrl.deleteSauce);
router.get('/:id', auth, commentCtrl.getOneSauce);
router.get('', auth, commentCtrl.getAllSauces);
router.post('/:id/like', auth, commentCtrl.likeSauce);

module.exports = router;
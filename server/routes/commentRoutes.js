const express = require('express');
const { isAuthorizedUser } = require('../middlewares/authorization');
const { comment, getAllCommentsByRecipeId, deleteCommentByCommentId, updateCommentByCommentId } = require('../controllers/commentController');

const router = express.Router();

// protected routes
router.post('/', isAuthorizedUser, comment);
router.get('/:id', isAuthorizedUser, getAllCommentsByRecipeId);
router.delete('/:id', isAuthorizedUser, deleteCommentByCommentId);
router.put('/:id', isAuthorizedUser, updateCommentByCommentId)

module.exports = router;
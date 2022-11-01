const router = require('express').Router();
const playerController = require('../controllers/playerController');

router.get('/', playerController.getAllPlayers);

router.get('/:playerId', playerController.getSinglePlayer);

router.post('/', playerController.createNewPlayer);

router.post('/:playerId/comments', playerController.addComment);

router.patch('/:playerId', playerController.updatePlayer);

router.patch('/:playerId/goals', playerController.updatePlayerGoals);

router.put('/:playerId/like', playerController.likePlayer);

router.put(
  '/:playerId/comments/:commentId/like',
  playerController.addCommentLike
);

router.delete('/:playerId', playerController.deletePlayer);

router.delete(
  '/:playerId/comments/:commentId',
  playerController.deletePlayerComment
);

module.exports = router;

const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');


router.get('/',indexController.getIndex);

router.get('/createRoom',indexController.getCreateRoom);

router.post('/createRoom',indexController.postCreateRoom);
router.get('/joinRoom',indexController.getJoinRoom);
router.post('/joinRoom',indexController.postJoinRoom);

router.get('/room/:roomId',indexController.JoinRoom);  
router.get('/error/:errTyp',indexController.getError);

module.exports = router;
const router = require('express').Router();

const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User, Question, Answer } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth.js');

const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')
const questionsRouter = require('./questions.js');
const answersRouter = require('./answers.js')
const commentsRouter = require('./comments.js')


router.use('/session', sessionRouter)
router.use('/users', usersRouter)
router.use('/questions', questionsRouter)
router.use('/answers', answersRouter)
router.use('/comments', commentsRouter)


router.get('/', asyncHandler(async(req, res) => {
  const questions = await Question.findAll({
    include: User, Answer
  })
  return res.json(questions)
}))

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body})
})


router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);

router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);



router.get('/set-token-cookie', asyncHandler(async (req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      },
    })
  setTokenCookie(res, user);
  return res.json({ user });
}));




router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});


module.exports = router;
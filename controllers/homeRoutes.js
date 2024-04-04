const router = require('express').Router();
const { Product, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
router.get('/data', async (req, res) => {
  try {
    // Get all Products and JOIN with user data
    const productData = await Product.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'role'],
        },
        {
          model: Comment,
          attributes: ['text'],
        },
      ],
    });
    // Serialize data so the template can read it
    const products = productData.map((Product) => Product.get({ plain: true }));
console.log("!!!!!!!!!!!", products);
const currentUser = await User.findByPk(req.session.user_id);
console.log("currentUser", currentUser);
const isManager = currentUser.role ==='manager';
console.log("isManager", isManager);
    // Pass serialized data and session flag into template
    res.render('data', {
      products,
      isManager,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// router.get('/product/:id', async (req, res) => {
//   try {
//     const productData = await Product.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name', 'id'],
//         },
//         {model:Comment, include:[User],
//         attributes:['text']}
//       ],
//     });
//     const product = productData.get({ plain: true });
//     const userId = req.session.user_id;
//     const productUserId = product.user_id;
//     const sameUser = userId === productUserId;
//     res.render('product', {
//       ...product,
//       logged_in: req.session.logged_in,
//       sameUser
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [Product],
//     });
//     const user = userData.get({ plain: true });
//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.get('/', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/data');
    return;
  }
  res.render('login');
});
router.get('/register', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  res.render('register');
});
router.get('/warning', (req, res) => {
    res.render('warning');
})
// router.get('/comment/:id', withAuth, async (req, res) => {
//   const productData = await Product.findByPk(req.params.id,
//     {include: [User,
//       {model:Comment, attributes:['text'], include:[User],
//   }]});
//   const productDataPlain = productData.get({ plain: true });
//   res.render('comment', {productDataPlain, logged_in: req.session.logged_in, userId: req.session.user_id});
// })
// router.get('/edit/:id', withAuth, async (req, res) => {
//   const productData = await Product.findByPk(req.params.id,
//     {include: [User,
//       {model:Comment, attributes:['text'], include:[User],
//   }]});
//   const productDataPlain = productData.get({ plain: true });
//   res.render('edit', {productDataPlain, logged_in: req.session.logged_in, userId: req.session.user_id});
// })
module.exports = router;
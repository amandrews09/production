const router = require('express').Router();
const { Product, User } = require('../models');
const withAuth = require('../utils/auth');
const moment = require('moment');

// router.get('/products', async (req, res) => {
//   try {
//     const productData = await Product.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//         {
//           model: Comment,
//           include: [Product],
//           attributes: ['text'],
//         },
//       ],
//     });

//     // const product = productData.map(Product => Product.get({ plain: true }));

//    res.status(200).json(productData)
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/createproduct', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
       
      ],
    });

    const productsFormatted = productData.map(product => {
      const productPlain = product.get({ plain: true });
      // if (productPlain.selectedDate) {
      //   productPlain.selectedDate = moment(productPlain.selectedDate).format('ddd MMM DD YYYY');
      // }
      if (productPlain.startTime) {
        productPlain.startTime = moment(productPlain.startTime).format('ddd MMM DD YYYY HH:mm:ss');
      }
      if (productPlain.stopTime) {
        productPlain.stopTime = moment(productPlain.stopTime).format('ddd MMM DD YYYY HH:mm:ss');
      }
      return productPlain;
    });

    res.status(200).json(productsFormatted);
    const products = productData.map(Product => Product.get({ plain: true }));
    res.render('createproduct', {
      products,
      
      logged_in: req.session.logged_in,
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/data', async (req, res) => {
  try {
    // Get all Products and JOIN with user data
    const productData = await Product.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'role'],
        }        
      ],
    });
    // Serialize data so the template can read it
    const products = productData.map(product => {
      const productPlain = product.get({ plain: true });
      // productPlain.selectedDate = productPlain.selectedDate ? moment(productPlain.selectedDate).format('ddd MMM DD YYYY') : null;
      productPlain.startTime = productPlain.startTime ? moment(productPlain.startTime).format('ddd MMM DD YYYY HH:mm:ss') : null;
      productPlain.stopTime = productPlain.stopTime ? moment(productPlain.stopTime).format('ddd MMM DD YYYY HH:mm:ss') : null;
      return productPlain;
    });

    const currentUser = await User.findByPk(req.session.user_id);

    let user;
    if (currentUser) {
      user = currentUser.get({ plain: true });
    }

    const isManager = user.role === 'manager';

    res.render('data', {
      products,
      isManager,
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/product/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'id'],
        }
      ],
    });
    const product = productData.get({ plain: true });
    const userId = req.session.user_id;
    const productUserId = product.user_id;
    const sameUser = userId === productUserId;
    res.render('product', {
      ...product,
      logged_in: req.session.logged_in,
      sameUser
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
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
});

//


router.get('/edit/:id', withAuth, async (req, res) => {
  const productData = await Product.findByPk(req.params.id,
    {
      include: [User]
    });
  const productDataPlain = productData.get({ plain: true });
  const currentUser = await User.findByPk(req.session.user_id);

  let user;
  if (currentUser) {
    user = currentUser.get({ plain: true });
  }

  const isManager = user.role === 'manager';

  res.render('edit', { productDataPlain, 
    logged_in: req.session.logged_in, 
    userId: req.session.user_id,
  isManager });
})

module.exports = router;

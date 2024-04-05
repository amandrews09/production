const router = require('express').Router();
const { Product } = require('../../models');
const withAuth = require('../../utils/auth');
router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newProduct = await Product.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.put('/:id', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newProduct = await Product.update(req.body,{
      where:{id: req.params.id}
    },
    );
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: 'No Product found with this id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
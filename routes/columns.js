const router = require('express').Router();
const auth = require('../middleware/auth');
const Column = require('../models/Column');
const Card = require('../models/Card');

// Kolon ekle
router.post('/', auth, async (req, res) => {
  try {
    const { title, boardId } = req.body;
    const lastCol = await Column.findOne({ board: boardId }).sort('-order');
    const order = lastCol ? lastCol.order + 1 : 1;
    const column = await Column.create({ title, board: boardId, order });
    res.json(column);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Kolon güncelle (başlık veya sıra)
router.patch('/:id', auth, async (req, res) => {
  const column = await Column.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(column);
});

// Kolon sil
router.delete('/:id', auth, async (req, res) => {
  await Column.findByIdAndDelete(req.params.id);
  await Card.deleteMany({ column: req.params.id });
  res.json({ message: 'Silindi' });
});

module.exports = router;
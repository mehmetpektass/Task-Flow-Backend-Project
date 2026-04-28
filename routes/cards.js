const router = require('express').Router();
const auth = require('../middleware/auth');
const Card = require('../models/Card');

// Kart ekle
router.post('/', auth, async (req, res) => {
  try {
    const { title, columnId, boardId } = req.body;
    const lastCard = await Card.findOne({ column: columnId }).sort('-order');
    const order = lastCard ? lastCard.order + 1 : 1;
    const card = await Card.create({ title, column: columnId, board: boardId, order });
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Kart güncelle (başlık, açıklama, veya sürükleme sonrası kolon+order)
router.patch('/:id', auth, async (req, res) => {
  const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(card);
});

// Kart sil
router.delete('/:id', auth, async (req, res) => {
  await Card.findByIdAndDelete(req.params.id);
  res.json({ message: 'Silindi' });
});

module.exports = router;
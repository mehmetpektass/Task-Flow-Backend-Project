const router = require('express').Router();
const auth = require('../middleware/auth');
const Board = require('../models/Board');
const Column = require('../models/Column');
const Card = require('../models/Card');

// Kullanıcının boardlarını getir
router.get('/', auth, async (req, res) => {
  const boards = await Board.find({ owner: req.user.id });
  res.json(boards);
});

// Board detayı (kolonlar + kartlarla birlikte)
router.get('/:id', auth, async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.id, owner: req.user.id });
    if (!board) return res.status(404).json({ message: 'Board bulunamadı' });

    const columns = await Column.find({ board: board._id }).sort('order');
    const cards = await Card.find({ board: board._id }).sort('order');

    res.json({ board, columns, cards });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Board oluştur
router.post('/', auth, async (req, res) => {
  try {
    const board = await Board.create({ title: req.body.title, owner: req.user.id });
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Board sil
router.delete('/:id', auth, async (req, res) => {
  await Board.deleteOne({ _id: req.params.id, owner: req.user.id });
  await Column.deleteMany({ board: req.params.id });
  await Card.deleteMany({ board: req.params.id });
  res.json({ message: 'Silindi' });
});

module.exports = router;
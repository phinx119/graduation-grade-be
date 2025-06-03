const { getDB } = require('../models/db');

exports.getAll = async (req, res) => {
    try {
        const db = getDB();

        const year = req.query.year || '2024';
        const collection = db.collection(`data_${year}`);

        const id = parseInt(req.query.id) || null;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await collection.countDocuments();
        const data = id ? await collection.find({ sbd: id }).skip(skip).limit(limit).toArray()
            : await collection.find().skip(skip).limit(limit).toArray();

        res.status(200).json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: data
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const db = getDB();

        const year = req.params.year || '2024';
        const collection = db.collection(`data_${year}`);

        const data = await collection.findOne({ sbd: parseInt(req.params.sbd) });
        if (!data) return res.status(404).json({ error: "Not found" });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
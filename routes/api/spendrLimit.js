const express = require('express');
const router = express.Router();

// Load SpendrLimit model
const SpendrLimit = require('../../models/SpendrLimit');

router.post('/add', (req, res) => {
    const { userId, limit } = req.body;
    const query = { userId: userId };
    const update = {
        $set: {
            userId: userId,
            maxLimit: limit,
        },
    };
    const options = { new: true };

    SpendrLimit.findOneAndUpdate(query, update, options)
        .then(updatedDocument => {
            if (updatedDocument) {
                console.log(`Successfully updated document: ${updatedDocument}.`);
                return res.json(updatedDocument);
            } else {
                const newLimit = new SpendrLimit({
                    userId: userId,
                    maxLimit: limit,
                });
                newLimit
                    .save()
                    .then(limit => res.json(limit))
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.error(`Failed to find and update document: ${err}`));
});

router.get('/limit/:userId', (req, res) => {
    const query = { userId: req.params.userId };
    SpendrLimit.findOne(query)
        .then(limit => res.json(limit))
        .catch(err => console.log(err));
});

module.exports = router;

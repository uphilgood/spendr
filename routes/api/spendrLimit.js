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
    const options = { returnNewDocument: true };

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
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.error(`Failed to find and update document: ${err}`));
});

module.exports = router;

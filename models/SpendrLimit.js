const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpendrLimitSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    maxLimit: {
        type: Number,
    },
});
module.exports = SpendrLimit = mongoose.model('spendrLimit', SpendrLimitSchema);

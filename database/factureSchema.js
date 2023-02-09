const mongoose = require('mongoose');

const factureSchema = mongoose.Schema({
        id : {type : String, required: true},
        amount : {type: Number, required: true},
        user_id : {type : String, required: true},
        statut : {type : Boolean, required: true}
});

module.exports = mongoose.model('Facture', factureSchema);
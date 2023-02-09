const express = require('express');
const mongoose = require('mongoose');
const Facture = require('./database/factureSchema');
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://valouz:MONmaths42@cluster0.25lbgrt.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log('Connexion à Mongoose réussie !'))
.catch(() => console.log('Echec de la connexion à mongoose ...'));


//requête get
app.get('/api/facture', (req, res, next) => {
    Facture.find({})
    .then(Facture => res.status(200).json(Facture))
    .catch(error => res.status(400).json({error}));
});

//requête getByID (je l'ai fait avec ma propre valeur de ID, pas celle automatiquement affectée par MongoDB)
app.get('/api/facture/:id', (req,res, next) => {
    Facture.findOne({id: req.params.id})
    .then(factures => res.status(200).json(factures))
    .catch(error => res.status(420).json({error})); 
});

//requête getByClient
app.get('/api/facture/:user_id', (req,res, next) => {
    Facture.findOne({user_id: req.params.user_id})
    .then(factures => res.status(200).json(factures))
    .catch(error => res.status(420).json({error})); 
});


//requête post
app.post('/api/facture', (req,res,next) =>{
    console.log(req.body);
    facture = new Facture({
        id : req.body.id,
        amount : req.body.amount,
        user_id : req.body.user_id,
        statut : req.body.statut
    });
    facture.save()
    .then(() => res.status(201).json({message: 'Facture enregistrée !'}))
    .catch(error => res.status(420).json({error}));
});


//requête put
app.put('/api/facture/:id', (req, res, next) => {
    Facture.updateOne( {id: req.params.id},
        {
            $set:{amount : req.body.amount},
            $set:{user_id : req.body.user_id},
            $set:{statut : req.body.statut}
        })
        .then(() => res.status(200).json({message : 'Facture modifiée'}))
        .catch(error => res.status(420).json({error}));
});


//requête delete
app.delete('/api/facture/:id', (req, res, next) => {
    Facture.deleteOne({id: req.params.id})
        .then(() => res.status(200).json({message : 'Facture supprimée'}))
        .catch(error => res.status(420).json({error}));
})


module.exports = app;
const express = require('express');
const router = express.Router();
const Menu = require('./../models/menu');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new Menu(data);
        const responce = await newMenu.save();
        console.log('data saved succesfully');
        res.status(200).json(responce);
    } catch (err) {
        console.log('file saving error : ', err)
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await Menu.find();
        console.log('data fecthed');
        res.status(200).json(data);
    } catch (err) {
        console.log('file saving error : ', err)
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {
            const responce = await Menu.find({ taste: tasteType });
            console.log('responce fetched');
            res.status(200).json(responce);
        } else {
             console.log('not found');
             res.status(404).json({ error: 'Data not found' });
        }
    } catch (err) {
        console.log('data fetched error', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
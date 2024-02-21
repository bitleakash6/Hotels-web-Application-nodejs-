const express = require('express');
const router = express.Router();
const Person = require('./../models/person');


router.post('/', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the person data

        //Create a new Person document using the mongodb model
        const newPerson = new Person(data);   //directly setting data

        //save the new person to the database
        const response = await newPerson.save();
        console.log('data saved succesfully...');
        res.status(200).json(response);
    }
    catch (err) {
        console.log('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



//GET method to get the person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data saved');
        res.status(200).json(data);
    } catch (err) {
        console.log('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const responce = await Person.find({ work: workType });
            console.log('responce fetched');
            res.status(200).json(responce);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.log('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', async (req, res)=>{
    try{
        const person_id = req.params.id;
        const updatepersonInfo = req.body;

        const responce = await Person.findByIdAndUpdate(person_id, updatepersonInfo, {
            new: true,
            runValidators : true,
        })

        if(!responce){
            res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(responce);
    }catch (err){
        console.log('Error update person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res)=> {
    try{
        const person_id = req.params.id;
        const responce = await Person.findByIdAndDelete(person_id);
        if(!responce){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data delete');
        res.status(200).json({message: 'Person deleted succesfully'})
    }catch (err){
        console.log('Error delete person', err);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;
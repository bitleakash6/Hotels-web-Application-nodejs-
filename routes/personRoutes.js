const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');


router.post('/signup', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the person data

        //Create a new Person document using the mongodb model
        const newPerson = new Person(data);   //directly setting data

        //save the new person to the database
        const response = await newPerson.save();
        console.log('data saved succesfully...');

        const payload = {
            id: response.id,
            username: response.username,
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("token is : ", token);

        res.status(200).json({response : response, token: token});
    }
    catch (err) {
        console.log('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//login Route
router.post('/login', async (req, res)=>{
    try{
        //Extract the username and password from request body
        const {username, password} = req.body;

        //find the user by username
        const user = await Person.findOne({username: username});
        const pass = await Person.findOne({password : password});

        //if user does not exist or password does not match, return error
        if(!user || !pass){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        //generate token
        const payload = {
            id: user.id,
            username: user.username,
        }

        const token = generateToken(payload);

        //return token as response
        res.json({token});
    }catch (err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/profile', jwtAuthMiddleware, async (req, res)=>{
    try{
        const userData = req.user;
        console.log("user Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
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

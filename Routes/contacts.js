const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact')
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/', auth, async (req,res) => {
    try {
        //Using user bcz it pointed to userModel in ContactModel
        const contacts = await Contact.find({ user:req.user.id }).sort({ date: -1 })
        res.json(contacts)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

router.post('/', [auth, body('name', 'Name is required').not().isEmpty()], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const {name, email, phone, type} = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user:req.user.id
        })

        const contact = await newContact.save();
        res.json(contact)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error'); 
    }
})

router.put('/:id', auth, async (req,res) => {
    const {name, email, phone, type} = req.body;
    
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({msg:'Contact Not found'});
        console.log("Cont", contact)
        console.log("Cont ID", contact.user)
        if(contact.user.toString() !== req.user.id) return res.status(401).json({msg:'UnAuthorized'})

        contact = await Contact.findByIdAndUpdate(req.params.id, {$set:contactFields}, {new:true})
        res.json(contact)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error'); 
    }
})

router.delete('/:id', auth, async (req,res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({msg:'Contact Not found'});    
        if(contact.user.toString() !== req.user.id) return res.status(401).json({msg:'UnAuthorized'})
        await Contact.findByIdAndRemove(req.params.id)
        res.json("Deleted")
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error'); 
    }
})

module.exports = router;
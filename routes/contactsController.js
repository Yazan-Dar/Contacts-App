const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');
const checkAuthenticatedUser = require('./usersController').checkAuthenticatedUser;
const multer = require('multer');
const fs = require('fs');
const path = require('path');
var randomstring = require("randomstring");
const { check, validationResult } = require('express-validator');

// Image upload Handling (GETs and POSTs)
let storage = multer.diskStorage({
    destination: 'public/images/contacts_imgs/',
    filename: (req, file, cb) => {
        cb(null, randomstring.generate() + file.originalname)
    }
});

// Upload
let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        checkImgType(file, cb);
    }
})

// Check file type function
function checkImgType(file, cb) {
    const fileTypes = /png|gif|jpeg|jpg|bmp/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
        return cb(null, true);
    } else {
        cb('Please add only image with types: PNG,GIF,JPG/JPEG,BMP');
    }
}


router.get('/contacts/add', checkAuthenticatedUser, (req, res) => {
    res.render('contacts/add')
})

router.get('/contacts/searchresult', checkAuthenticatedUser, (req, res) => {
    let query = { name: req.query.name };
    Contact.find(query)
        .then(contact => {
            res.render('contacts/search', { contact: contact })
        }).catch(error => {
            req.flash('error_msg', "Sorry.. Error with search " + error)
            //console.log(error);
            res.redirect('/');
        })
})


router.get('/contacts/edit/:id', upload.single('contact-img'), checkAuthenticatedUser, (req, res) => {
    let userContactsData = { _id: req.params.id};
    Contact.findOne(userContactsData)
        .then(ks => {
            if (req.user.id != ks.user_id) {
                req.flash('error_msg', 'You do not have permission to delete it')
                return  res.redirect('/contacts')
            }
            Contact.findOne(userContactsData)
                .then(contact => {
                    res.render('contacts/edit', { contact: contact })
                }).catch(error => {
                    console.log("Sorry .. Error with Edit " + error);
                })
        })
})


router.post('/contacts/add', upload.single('contact-img'), checkAuthenticatedUser, [
    check('name', 'At least the name must be entered').exists().trim().escape().not().isEmpty()
], (req, res) => {
    const file = req.file;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        for (let i = 0; i < errors.errors.length; i++) {
            req.flash('error_msg', errors.errors[i].msg + '<br>')
        }
        res.redirect('/contacts/add')
    } else {
        if (!file) {
            let contact = {
                name: req.body.name,
                lastname: req.body.lastname,
                phone: req.body.phone,
                email: req.body.email,
                user_id: req.user.id
            }
            Contact.create(contact)
                .then(contact => {
                    req.flash('success_msg', 'Contact added successfully')
                    res.redirect('/contacts')
                }).catch(err => {
                    req.flash('error_msg', 'An error occurred ' + err)
                    res.redirect('/contacts')
                })
        } else {
            let url = file.path
            let newcontact = {
                name: req.body.name,
                lastname: req.body.lastname,
                phone: req.body.phone,
                email: req.body.email,
                user_id: req.user.id,
                img: url
            }
            Contact.create(newcontact)
                .then(contact => {
                    req.flash('success_msg', 'Contact added successfully')
                    res.redirect('/contacts')
                }).catch(err => {
                    req.flash('error_msg', 'An error occurred ' + err)
                    res.redirect('/contacts')
                })
        }
    }
})


router.get('/contacts', checkAuthenticatedUser, (req, res) => {
    let userContactsData = { user_id: req.user.id };
    Contact.find(userContactsData).then(contacts => {
        //console.log(contacts.length)
        res.render('contacts/index', { contacts: contacts })
    }).catch(err => {
        console.log("error in get contacts");
    })
});




router.put('/contacts/edit/:id', upload.single('contact-img'), checkAuthenticatedUser, [
    check('name', 'At least the name must be entered').exists().trim().escape().not().isEmpty()
], (req, res) => {
    const file = req.file;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        for (let i = 0; i < errors.errors.length; i++) {
            req.flash('error_msg', errors.errors[i].msg + '<br>')
        }
        res.redirect('/contacts/edit/' + req.params.id)
    } else {
        let query = { _id: req.params.id };
        if (file) {
            let url = file.path;
            Contact.updateOne(query, {
                $set: {
                    name: req.body.name,
                    lastname: req.body.lastname,
                    phone: req.body.phone,
                    email: req.body.email,
                    img: url
                }
            })
                .then(contact => {
                    req.flash('success_msg', 'Contact edited successfully')
                    res.redirect('/contacts')
                }).catch(error => {
                    req.flash('error_msg', 'An error occurred ' + error)
                    res.redirect('/contacts')
                })
        } else {
            Contact.updateOne(query, {
                $set: {
                    name: req.body.name,
                    lastname: req.body.lastname,
                    phone: req.body.phone,
                    email: req.body.email,
                }
            })
                .then(contact => {
                    req.flash('success_msg', 'Contact edited successfully')
                    res.redirect('/contacts')
                }).catch(error => {
                    req.flash('error_msg', 'An error occurred ' + error)
                    res.redirect('/contacts')
                })
        }
    }
})

router.delete('/delete/:id', checkAuthenticatedUser, (req, res) => {
    let removeTarget = { _id: req.params.id };

    Contact.findOne(removeTarget).then(sss => {
        if (req.user.id != sss.user_id) {
            req.flash('error_msg', 'You do not have permission to delete it')
            return res.redirect("/contacts")
        }
        Contact.deleteOne(removeTarget)
            .then(contact => {
                req.flash('success_msg', 'Contact deleted successfully')
                res.redirect('/contacts')
            }).catch(error => {
                req.flash('error_msg', 'An error occurred ' + error)
                res.redirect('/contacts')
            })
    })
})


module.exports = router
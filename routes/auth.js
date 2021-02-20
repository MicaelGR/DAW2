const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidationSchema, loginValidationSchema } = require('../validation');

router.post('/register', async (req, res) => {
    // Valida de los parámetros
    const { error, value } = registerValidationSchema(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Comprueba si el email ya está registrado
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists');

    // Passwords -> Hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Crea los usuarios
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    // Guarda en la DB
    try {
        const savedUser = await user.save();
        res.redirect('/login.html');
    } catch(err) {
        res.status(400).send(err);   
    }
});

router.post('/login', async (req, res) => {
    const { error, value } = loginValidationSchema(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const userEmail = await User.findOne({ email: req.body.email });
    if (!userEmail) return res.status(400).send('Email or password is wrong');

    const validPass = await bcrypt.compare(req.body.password, userEmail.password);
    if(!validPass) return res.status(400).send('Email or password is wrong');

    res.send("Logged in");
});

module.exports = router;
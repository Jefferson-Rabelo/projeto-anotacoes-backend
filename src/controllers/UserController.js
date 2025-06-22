const connection = require('../database/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async register(req, res) {
        const { name, email, password } = req.body;

        const userExists = await connection('users').where({ email }).first();
        if (userExists) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        await connection('users').insert({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: 'Usuário criado com sucesso' });
    },

    async login(req, res) {
        const { email, password } = req.body;

        const user = await connection('users').where({ email }).first();

        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }


        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        return res.json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    },
};

const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { title, content } = req.body;
        const user_id = req.userId;

        await connection('notes').insert({ title, content, user_id });

        return res.status(201).json({ message: 'Nota criada com sucesso' });
    },

    async list(req, res) {
        const user_id = req.userId;

        const notes = await connection('notes').where({ user_id }).select('*');

        return res.json(notes);
    },

    async update(req, res) {
        const { id } = req.params;
        const { title, content } = req.body;
        const user_id = req.userId;

        const note = await connection('notes').where({ id, user_id }).first();

        if (!note) {
            return res.status(404).json({ error: 'Nota não encontrada' });
        }

        await connection('notes').where({ id }).update({ title, content });

        return res.json({ message: 'Nota atualizada com sucesso' });
    },

    async delete(req, res) {
        const { id } = req.params;
        const user_id = req.userId;

        const note = await connection('notes').where({ id, user_id }).first();

        if (!note) {
            return res.status(404).json({ error: 'Nota não encontrada' });
        }

        await connection('notes').where({ id }).delete();

        return res.json({ message: 'Nota excluída com sucesso' });
    },
};

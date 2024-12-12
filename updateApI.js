import express from 'express';
import con from './dbconnection.js';

const router = express.Router();

router.put('/:id/:phonenum', async (req, res) => {
    const { id, phonenum } = req.params;
    const upd_query = 'UPDATE personaldet SET phonenum = $1 WHERE id = $2;';
    try {
        const result = await con.query(upd_query, [phonenum, id]);
        console.log('Phonenum updated in DB:', result.rows);
        res.status(200).json({ message: 'Phonenum updated successfully', data: result.rows });
    } catch (err) {
        console.error('Error updating phonenum:', err);
        res.status(500).json({ message: 'Failed to update phonenum' });
    }
});

router.put('/:id/:username', async (req, res) => {
    const { id, username } = req.params;
    const upd_query = 'UPDATE personaldet SET username = $1 WHERE id = $2;';
    try {
        const result = await con.query(upd_query, [username, id]);
        console.log('Username updated in DB:', result.rows);
        res.status(200).json({ message: 'Username updated successfully', data: result.rows });
    } catch (err) {
        console.error('Error updating username:', err);
        res.status(500).json({ message: 'Failed to update username' });
    }
});

router.put('/:id/:password', async (req, res) => {
    const { id, password } = req.params;
    const upd_query = 'UPDATE personaldet SET password = $1 WHERE id = $2;';
    try {
        const result = await con.query(upd_query, [password, id]);
        console.log('Password updated in DB:', result.rows);
        res.status(200).json({ message: 'Password updated successfully', data: result.rows });
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).json({ message: 'Failed to update password' });
    }
});

export default router;

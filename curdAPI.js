import express from 'express';
import axios from 'axios';
import con from './dbconnection.js';
import updateRoutes from './updateApI.js'; 

const app = express();
app.use(express.json());

app.use('/update-helpers', updateRoutes); 

app.post('/insert', async (req, res) => {
    const { id, username, phonenum, password } = req.body;

    if (!id || !username || !phonenum || !password) {
        return res.status(400).json({ error: 'All fields (id, username, phonenum, password) are required.' });
    }

    const insert_query = 'INSERT INTO personaldet (id, username, phonenum, password) VALUES ($1, $2, $3, $4)';

    try {
        const result = await con.query(insert_query, [id, username, phonenum, password]);
        console.log('Data inserted:', result.rowCount);
        res.status(201).json({ message: 'Data inserted successfully', data: req.body });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Failed to insert data' });
    }
});

app.get('/getdata', async (req, res) => {
    const data_query = 'SELECT * FROM personaldet';
    try {
        const result = await con.query(data_query);
        console.log('Data retrieved from DB', result.rows);
        res.status(200).json({ message: 'Successfully fetched data', data: result.rows });
    } catch (err) {
        console.error('No data found', err);
        res.status(500).json({ message: 'No result found' });
    }
});

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { phonenum, username, password } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'ID is required.' });
    }

    let triggeredApis = [];

    try {
        if (phonenum) {
            const phonenumResponse = await axios.put(`http://localhost:4000/update-helpers/${id}/${phonenum}`);
            triggeredApis.push({ type: 'phonenum', response: phonenumResponse.data });
        }

        if (username) {
            const usernameResponse = await axios.put(`http://localhost:4000/update-helpers/${id}/${username}`);
            triggeredApis.push({ type: 'username', response: usernameResponse.data });
        }

        if (password) {
            const passwordResponse = await axios.put(`http://localhost:4000/update-helpers/${id}/${password}`);
            triggeredApis.push({ type: 'password', response: passwordResponse.data });
        }

        res.status(200).json({ message: 'All updates triggered successfully', updates: triggeredApis });
    } catch (err) {
        console.error('Error triggering updates:', err);
        res.status(500).json({ error: 'Failed to trigger updates' });
    }
});

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const del_query = 'DELETE FROM personaldet WHERE id = $1';
    try {
        const result = await con.query(del_query, [id]);
        console.log('Delete successful:', result.rowCount);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Deleted', data: result.rows });
        } else {
            res.status(404).json({ message: 'No record found' });
        }
    } catch (err) {
        console.error('Delete failed', err);
        res.status(500).json({ error: 'Failed to delete' });
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

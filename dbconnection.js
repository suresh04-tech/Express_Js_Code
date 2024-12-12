import pg from 'pg'

const {Client}=pg
const con=new Client({
    user:'postgres',
    host:'localhost',
    password:'tiger',
    port:5432,
    database:'empdetail'
})


con.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Connection error', err.stack));

    export default con;
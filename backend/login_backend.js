const express = require('express');
const db = require('../js/dbconnect');
const cors = require('cors');
const sessionTime = require('../js/config');
const authTime = require('./backend_config')
const crypto = require('crypto');
const { json } = require('stream/consumers');
const { promises, resolve } = require('dns');
// const { Suspense } = require('react');
const app = express();
app.use(cors())
app.use(express.json());
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);



function session(email) {
    let session = (Date.now() + authTime);


    const user = { email: email, session: session }
    const data = JSON.stringify(user)
    console.log(user, 'im user session')

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data, 'utf8', "hex")

    encrypted += cipher.final('hex');


    return encrypted
}


// decryption 
function decryption(authkey) {

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(authkey, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    const originalObject = JSON.parse(decrypted);
    console.log(originalObject, "im decrypted auth>>>>>>")

    return originalObject;

}







// check if server and db is up!

app.get('/', (req, res) => {
    res.send('node+ mysql running')
})



// Validate session Expiry and auth decrytor

function checkValidAuthKey(authkey) {
    let test;
    console.log('im called every time >>>>>')

    return new Promise((resolve, reject) => {


        let authEncryptedKey;
        try {
            authEncryptedKey = decryption(authkey)
        } catch (err) {
            return resolve(false)

        }
        if (!authEncryptedKey) {
            return resolve(false);
        }
        console.log('im chechValidauthkey func >>>>>', authEncryptedKey)
        let { email, session } = authEncryptedKey;

        let epoch = Date.now();
        console.log('current date ', epoch)
        db.query(
            `SELECT * From validUser Where email = ?`, [email], (err, result) => {


                if (err) {
                    return reject(err);
                }

                let validEmailFound = result.length === 1;
                if (session > epoch && validEmailFound) {
                    console.log('/////////////////////////////////////////////////////////////////')
                    resolve(true);
                } else {
                    resolve(false)
                }




            }
        )


    })






}



// Validate User 








// get all users
app.get('/users', (req, res) => {
    db.query('SELECT * From validUser', (err, result) => {
        if (err) return res.send(err)
        res.json(result)
    })
})

// login api with session 

app.post('/taskly/login', (req, res) => {
    const { email, pass } = req.body;
    db.query(
        'SELECT * FROM validUser WHERE email = ? AND pass = ?',
        [email, pass],
        (err, result) => {
            if (result.length > 0) {
                console.log(result, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> result ")
                return res.status(200).json({ success: true, message: 'OK', 'auth_key': `${session(email)}` });
            } else {
                return res.status(400).json({ success: false, message: 'Invalid username or Password' });
            }


        }
    );



})

// create new user

app.post('/create/user', (req, res) => {
    const { username, email, pass, age } = req.body;


    db.query(
        'INSERT INTO validUser (username,email,pass,age) values (?,?,?,?)', [username, email, pass, age], (err, result) => {

            if (err) {

                return res.status(403).json({ success: false, message: "DB Error" })
            } else {
                return res.status(200).json({ success: true, message: 'user created', 'auth_key': `${session(email)}` });
            }
        }
    )
})


// session api 


app.get('/session', async (req, res) => {

    const authkey = req.headers['auth-key']

    let isValid = await checkValidAuthKey(authkey)


    if (isValid) {
        res.json({ success: true, message: 'auth passed' })

    } else res.status(403).json({ success: false, message: 'auth failed' })

})


// Create Task API

app.post('/create/task', async (req, res) => {

    const authkey = req.headers['auth-key'];

    let isValid = await checkValidAuthKey(authkey)


    if (isValid) {
        const { assignee } = req.body;
        console.log(assignee,'im assigneee>>>>>>>>>>>>>>>>>>>>>>')
        db.query(
            'select * from validUser where username = ?', [assignee], (err, result) => {
                if (err) return res.status(400).json({ success: false, message: 'DB Error' })

                else {

                    const assignee = result[0].email;
                    console.log('im assignee email>>>>>>>>>>>> ', assignee)
                    console.log('im assignee result>>>>>>>>>>>> ', result)
                    const { task_title, task_des, status, severity } = req.body;
                    db.query(
                        'Insert into userTasks( task_title , task_description , task_status , task_severity , assignee) values (?,?,?,?,?)', [task_title, task_des, status, severity, assignee], (err, result) => {
                            if (err) return res.status(400).json({ success: false, message: 'DB Error' })
                            else return res.status(200).json({ success: true, message: 'saved' })
                        }
                    )
                }

            }
        )



    } else return res.status(403).json({ success: false, message: 'auth failed' })


})





app.get('/tasks_assigned', async (req, res) => {
    const authkey = req.headers['auth-key'];
    console.log(authkey)
    let isValid = await checkValidAuthKey(authkey)
    //  let isValid = true

    console.log(isValid, "im is valid")
    let { email, session } = decryption(authkey);
    console.log(email, session)
    console.log('>>>>>>>>>>>>>>>>>>>>>?????>')


    if (isValid) {
        db.query(
            'SELECT * From userTasks where assignee = ?', [email], (err, result) => {
                if (err) {
                    console.log(result, 'im new task ')
                    return res.status(200).json({ success: true, total_record: 0, error: 0 })
                } else {

                    return res.status(200).json({ success: true, result, total_record: result.length })
                }
            }
        )

    } else {
        return res.status(403).json({ success: false, Auth: "failed" })

    }
})



// get user names


app.get('/get_user_names', async (req, res) => {
    const authkey = req.headers['auth-key'];
    console.log('testing>>>>>1')
    let isValid = await checkValidAuthKey(authkey);
    if (isValid) {
        console.log('testing>>>>>2')

        db.query(
            'select username from validUser', (err, result) => {
                if (err) {
                    console.log('testing>>>>>3')

                    return res.status(404).json({ success: false, total_record: 0, error: err })
                } else {
                    return res.status(200).json({ success: true, result: result, total_record: result.length })
                }
            }
        )
    } else {
        return res.status(403).json({ success: false, Auth: "failed" })

    }
})

// patch task
app.patch('/update_task',async (req,res)=>{
    const authkey = req.headers['auth-key'];
    console.log('testing Patch call response =', req.body)
    let isValid = await checkValidAuthKey(authkey)
    if(isValid){
        console.log('isValid = ',isValid)
    }

})


app.listen(3000, () => {
    console.log('server ruuning on port 3000')
})
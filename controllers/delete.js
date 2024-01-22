export const handleDeleteAcc = (req, res, bcrypt, db) => {
    const {email, password} = req.body
    db.select('*').from('login').where('email', '=', email)
    .then((data) => {
        // database and input validation
        const isValid = (bcrypt.compareSync(password, data[0].hash) && email === data[0].email) 
        // proceeding to delete account if validated or sending error message
        if(isValid) {
            db.transaction((trx) => {
                trx.select('*').from('login').where('email', '=', email).del()
                .catch(err => res.json('there was an error trying to delete from the users table'))
                trx.select('*').from('users').where('email', '=', email).del()
                .then(trx.commit)
                .catch(trx => trx.rollback)
            })
            .then(res.json('successfully deleted account'))
            .catch(err => res.json('there was an error trying to delete the account'))
        } else {
            res.json('wrong credentials')
        }
    })
}
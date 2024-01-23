export const handleSignin = (req, res, bcrypt, db) => {
    db.select('*').from('login').where('email', '=', req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if(isValid) {
            return db.select('*').from('users').where('email', '=', data[0].email)
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json('unable to get user'))
        } else {
            res.status(400).json('unable to process user')
        }
    })
    .catch(err => res.status(400).json('unable to process users'))
}


export const handleRegister = (req, res, bcrypt, db) => {
    const {email,name,password} = req.body;
    const hash = bcrypt.hashSync(password, 10);
    db.transaction( trx => {
        trx.insert({
            email: email,
            hash: hash
        })
        .into('login')
        .returning('email')
        .then(logEmail => {
           return trx('users').insert({
                name: name,
                email: logEmail[0].email,
                joined: new Date()
            })
            .returning('*')
            .then(data => res.json(data[0]))
            .catch(err => res.status(400).json("not able to register"))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
}


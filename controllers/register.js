const handleRegister = (req,res,db,bcrypt)=>{
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json("Enter Required Fields");
    }

    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash:hash,
            email:email
        })
        .into('prj.login')
        .returning('email')
        .then(loginEmail =>{
            return trx('prj.users')
            .returning('*')
            .insert({
                name : name,
                email : loginEmail[0],
                joined : new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json("unable to register"))
}

module.exports = {
    handleRegister : handleRegister
}




// app.post('/register', (req,res)=>{                       //array db version
//     const { name, email, password } = req.body;

//     bcrypt.hash(password, null, null,function(err,hash){
//         console.log(hash);
//     })

//     database.users.push(
//         {
//         id : "125",
//         name : name,
//         email : email,
//         password : password,
//         entries : 0,
//         joined : new Date(),
//         }
//     )

//     userLoad={
//         id:database.users[database.users.length - 1].id,
//         name:name,
//         email:email,
//         entries:database.users[database.users.length - 1].entries,
//         joined:database.users[database.users.length - 1].joined
//     }

//      res.json(userLoad);
//     //res.json('success');
// })

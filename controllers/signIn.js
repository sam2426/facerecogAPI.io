const handleSignIn= (db,bcrypt) =>(req,res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        res.status(400).json("Enter required fields");
    }

    db.select('email','hash')
    .from('prj.login')
    .where('email', '=', email)
    .then(data =>{
        if(bcrypt.compareSync(password, data[0].hash)){
            return db.select('*').from('prj.users')
            .where('email', '=', email)
            .then(user =>{
                res.json(user[0])
            })
            .catch(err => res.status('400').json('password wrong'))
        }
        else{
            res.status(400).json(' Check password/id');
        }
    })
    .catch(err => res.status(400).json(' Check password/id'))

}

module.exports={
    handleSignIn
}



 // const {email, password} = req.body;
    
    // bcrypt.compare(password,'hash',function(err,res){
    //     console.log(res);
    // })

    // if(email === database.users[0].email && 
    //     password === database.users[0].password){
    //         //res.json('Login successfully');
    //         userLoad={
    //             id:database.users[0].id,
    //             name:database.users[0].name,
    //             email:email,
    //             entries:database.users[0].entries,
    //             joined:database.users[0].joined
    //         }
        
    //          res.json(userLoad);
    //     }
    //     else{
    //         res.status(400).json('unsuccessfull');
    //     }
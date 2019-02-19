const handleProfile = (db)=>(req,res)=>{
    // console.log(req.params);
    const { id } = req.params;
    db.select('*').from('prj.users').where({        //we can also write as .where({id}).then(re...
    id : id                                         //as of es6 feature.
    }).then(user =>{
        if(user.length){
            res.json(user[0])
        }else{
            res.status('400').json(`user not found`)
        }
    })
    .catch(err => res.status('400').json('wrong request')); //here .catch(err => res.json(err)); this gives blank array.
                                                            // as Boolean([]) is true.

// let found = false;
    // database.users.forEach(user=>{
    //     // console.log(user.id, req.params.id);
    //     if(user.id === id){
    //         found=true;
    //         return res.json(user);
    //     }
    //     // return res.json(user);
    // })
    // if(!found){
    //     res.json("user not found");
    // }
    
}

module.exports={
    handleProfile
}
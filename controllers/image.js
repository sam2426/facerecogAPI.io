const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '52d868a0788240eea8af0e87807732d6'
   });


   const handleApiCall = (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("error in API"))
   }

   

const handleImage = (req,res,db) => {
    const { id } = req.body;
    let found=false;
    // database.users.forEach(user => {
    //     console.log(user.id, req.body);
    //     if(user.id === id){
    //         found=true;
    //         user.entries++;
    //         return res.json(user.entries);
    //     }
    // })
    // if(!found){
    //     res.status(404).json("user not found")
    // }

    db('prj.users')
    .where('id', '=', id )                  // .where( {id} ) also correct es6
    .increment('entries',1)
    .returning('entries')
    .then(data => {
        if(data.length)
            res.json(data[0])
        else
            res.status('400').json('entries not found')
    })
    .catch(err => res.status(400).json("unable to get entries"));
}

module.exports = {
    handleImage,
    handleApiCall
}
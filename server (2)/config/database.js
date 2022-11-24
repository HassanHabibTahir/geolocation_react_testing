const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://root:root@cluster0.s2cmx1z.mongodb.net/bloctech?retryWrites=true&w=majority").then(()=>{
    console.log("connectrd to the database");
}).catch(err =>{
    console.log('err DB  not connected', err)
})

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var ArticlesSchema =  new Schema({
    name: {
        type: String,
        required: true
    },

    pic: {
        type: String,
        required: true
    }
    // notes: {
    //     type: Schema.Types.ObjectID,
    //     ref: 'Notes'
    // }
});

var Articles = mongoose.model('Articles', ArticlesSchema);

module.exports = Articles;
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: { data: Buffer, contentType: String },
  productID: Number
});

ProductSchema.plugin(passportLocalMongoose);

// Points back to Excuse and in server.js
var Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
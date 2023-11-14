//Lolo
// const User = require("../models/customerSchema");
const User = require("../models/customerSchema");
var moment = require("moment");

const user_index_get = (req, res) => {
  console.log("-------------------AllData--------------------");
  //result array of objects
  User.find()
    .then((result) => {
      // console.log(result);
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};



const user_edit_get = (req, res) => {
  //result===> object
  console.log("================================================");
  User.findById(req.params.id)
    .then((result) => {
      // console.log(result);
      res.render("user/edit", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};
const user_view_get = (req, res) => {
  //result===> object
  console.log("================================================");
  User.findById(req.params.id)
    .then((result) => {
      // console.log(result);
      res.render("user/view", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};
const user_search_post = (req, res) => {
  console.log("*************************req.body****************************");

  const searchText = req.body.searchText.trim();

  // User.find({$or:[{fireName:"Sedkey"},{lastName:"Sedkey"}]})
  User.find({ gender: searchText })
    .then((result) => {
      // console.log("##########################result##########################");
      // console.log(result);
      res.render("user/search", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};
const user_delete = (req, res) => {
  // User.findByIdAndDelete(req.params.id)
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};
const user_put = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body).then(() => {
    res.redirect("/home");
  });
};
const user_add_get = (req, res) => {
  res.render("user/add");
};
const user_post = (req, res) => {
  User.create(req.body)
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  user_index_get,
  user_edit_get,
  user_view_get,
  user_search_post,
  user_delete,
  user_put,
  user_add_get,
  user_post,
};

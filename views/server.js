const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// eslint-disable-next-line prettier/prettier
mongoose.connect(
  'mongodb+srv://admin-sahil:test123@cluster0.mbvqk.mongodb.net/todoDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const itemsSchema = mongoose.Schema({
  name: String,
});

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
  name: 'Welcome to your todoList',
});
const item2 = new Item({
  name: 'Hit the + button to add the item',
});
const item3 = new Item({
  name: '<-- Hit this to delete the item',
});

const defaultItems = [item1, item2, item3];

const listSchema = mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

const List = mongoose.model('List', listSchema);

app.get('/', (req, res) => {
  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, err => {
        if (err) {
          console.log(err);
        } else {
          console.log('Defaults Items Successfully Added!!');
        }
      });
      res.redirect('/');
    } else {
      res.render('list', { listTitle: 'Today', newListItems: foundItems });
    }
  });
});

app.get('/:customListName', (req, res) => {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({ name: customListName }, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect(`/${customListName}`);
      } else {
        res.render('list', {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    }
  });
});

// NOT UNDERSTOOD
app.post('/', (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName,
  });

  if (listName === 'Today') {
    item.save();
    res.redirect('/');
  } else {
    List.findOne({ name: listName }, (err, foundList) => {
      foundList.items.push(item);
      foundList.save();
      res.redirect(`/${listName}`);
    });
  }
});

app.post('/delete', (req, res) => {
  const checkedItemId = req.body.checkbox;
  const { listName } = req.body;
  if (listName === 'Today') {
    Item.findByIdAndRemove(checkedItemId, err => {
      if (!err) {
        console.log('Successfully deleted');
        res.redirect('/');
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      (err, foundList) => {
        if (!err) {
          res.redirect(`/${listName}`);
        }
      }
    );
  }
});

app.listen(3000, () => {
  console.log('App is running at port 3000');
});

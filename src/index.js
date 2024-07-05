const express = require("express");
var methodOverride = require('method-override')
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const app = express();
const path = require("path");
const { log } = require("console");
const port = 3000;
const sortMiddleware = require('./app/middleware/sortMiddleware')
const route = require("./routes");
const db = require('./config/db');

//Connect DB 
db.connect();
//static files
app.use(express.static(path.join(__dirname, "public")));

//middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);

// tu form submit len server
// su dung code js submit
// XMLHttpRequest, fetch, axios
app.use(express.json());
app.use(methodOverride('_method'))

//Custom middlware
app.use(sortMiddleware);

//HTTP logger
//app.use(morgan('combined'))

// Template engine
app.engine(
  "hbs",
  engine({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      sum: (a,b)=> a+b,
      sortable: (col,sort )=>{
        const icons = {
          default:'fa-solid fa-sort',
          asc: 'fa-solid fa-arrow-up-short-wide',
          desc:'fa-solid fa-arrow-down-wide-short'
        }
        const types ={
          default: 'desc',
          asc: 'desc',
          desc: 'asc'
        }
        const sortType = col === sort.column ? sort.type: 'default'
        const icon = icons[sortType];
        const type = types[sort.type];

        return ` <a href="?_sort&column=${col}&type=${type}">
                    <i class="${icon}"></i>
                    </a>`
      }
  }
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'resources','views'));

//Action --> Dispatcher --> Function handler
//Route init
route(app);

// 127.0.0.1
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

//console.log('PATH: '+path.join(__dirname,'resources/views'));

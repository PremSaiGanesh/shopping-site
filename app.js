const path = require('path');

const express=require('express');
const csrf=require('csurf'); // import csrf for protection
const expressSession = require('express-session'); // import expressSession

const createSessionConfig = require('./config/session'); //import session config
const db=require('./data/database');
// importing middleware functions
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutesMiddleware = require('./middlewares/protect-routes');

// importing routes functions
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(express.static('public')); // static middleware
app.use('/products/assets',express.static('product-data')); // static middleware

app.use(express.urlencoded({ extended:false }));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig)); //session middleware and do all session function
app.use(csrf()); //csrf middleware

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

// registering the routes
app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use(protectRoutesMiddleware);
app.use('/admin',adminRoutes);

app.use(errorHandlerMiddleware);


db.connectToDatabase()
.then(function() {
    app.listen(3000);
})
.catch(function(error){
    console.log('Failed to connect to database');
    console.log(error);

});

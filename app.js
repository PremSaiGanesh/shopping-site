const path = require('path');

const express=require('express');
const csrf=require('csurf'); // import csrf for protection
const expressSession = require('express-session'); // import expressSession

const createSessionConfig = require('./config/session'); //import session config
const db=require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(express.urlencoded({ extended:false }));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig)); //session middleware and do all session function
app.use(csrf()); //csrf middleware

app.use(addCsrfTokenMiddleware);

app.use(errorHandlerMiddleware);

app.use(authRoutes);

db.connectToDatabase()
.then(function() {
    app.listen(3000);
})
.catch(function(error){
    console.log('Failed to connect to database');
    console.log(error);

});

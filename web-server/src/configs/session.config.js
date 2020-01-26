let sessionConfig = {};
if (SERVER.isDev()) {
    sessionConfig = {
       secret: 'yC9GEfKs57ythfgdfdsisdf5MTPhpzXLs45ytyjgjTDQ3UBzdHiRCTbi',
       resave: false,
       saveUninitialized: true,
       name: '__uCTN',
       cookie: { 
           maxAge: 60000
       }
   };
}
module.exports = sessionConfig;
const app = require('./routes');
const db = require('./config/db');
const port = 3000

db.connect(() => {
    app.listen(process.env.PORT || port, function () {
        console.log(`SERVER STARTED ON PORT ${port}`);
    });
});
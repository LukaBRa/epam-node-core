const UserRoutes = require("./userRoutes");

module.exports = (req, res) => {

    switch(req.method) {
        case "GET":
            if(req.url === "/api/users") {
                UserRoutes.getAllUsers(req, res);
            } else if (req.url.split("/").length === 4) {
                // get user with specific id
                UserRoutes.getUser(req, res);
            } else if(req.url.split("/").length === 5) {
                // get hobbies for specified user id

                if(req.url.split("/")[4] !== "hobbies"){
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify("Not found."));
                    return;
                }

                UserRoutes.getUserHobbies(req, res);

            } else {
                res.statusCode = 404;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify("Not found."));
            }
            break;
        case "POST":
            if(req.url === "/api/users"){
                UserRoutes.createUser(req, res);
            } else {
                res.statusCode = 404;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify("Not found."));
            }
            break;
        case "DELETE":
            if(!req.url.startsWith("/api/users")){
                res.statusCode = 404;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: `Not found.` }));
                return;
            }
            UserRoutes.deleteUser(req, res);
            break;
        case "PATCH":
            if(req.url.split("/")[4] !== "hobbies"){
                res.statusCode = 404;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify("Not found."));
                return;
            }

            UserRoutes.updateUserHobbies(req, res);
            break;
        default:
            break;
    }

}
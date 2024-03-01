const parseRequestBody = require("../utils/parseRequestBody");
const UserController = require("../controllers/userController");


module.exports = class UserRoutes {

    static getAllUsers = (req, res) => {
        const users = UserController.getAllUsers();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(users));
    }

    static createUser = async (req, res) => {
        const respBody = await parseRequestBody(req);

        const createdUser = UserController.createUser(respBody);

        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ data: createdUser, error: null }));
    }

    static getUser = (req, res) => {
        const userId = req.url.split("/")[3];
        const user = UserController.getUser(userId);
        
        if(!user){
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ data: null, error: `User with id ${userId} not found.` }));
            return;
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ data: user, error: null }));

    }

    static getUserHobbies = (req, res) => {
        const userId = req.url.split("/")[3];
        const userHobbies = UserController.getUserHobbies(userId);

        if(userHobbies){
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ data: userHobbies, error: null }));
            return;
        }

        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ data: null, error: `User with id ${userId} not found.` }));

    }

    static deleteUser = (req, res) => {
        const userId = req.url.split("/")[3];
        const user = UserController.deleteUser();
    
        if(!user) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ data: null, error: `User with id ${userId} not found.` }));
            return;
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ data: user, error: null }));
    }

    static updateUserHobbies = async (req, res) => {
        const userId = req.url.split("/")[3];
        const newHobbies = await parseRequestBody(req);
        const user = UserController.updateUserHobbies(userId, newHobbies);

        if(!user) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ data: null, error: `User with id ${userId} not found.` }));
            return;
        }
        
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ data: user, error: null }));
    }
    
}
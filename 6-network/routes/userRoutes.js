const parseRequestBody = require("../utils/parseRequestBody");
const UserService = require("../services/user.service");


module.exports = class UserRoutes {

    static getAllUsers = (req, res) => {
        const users = UserService.getAllUsers();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.set('Cache-Control', 'public, max-age=3600');
        res.end(JSON.stringify(users));
    }

    static createUser = async (req, res) => {
        const respBody = await parseRequestBody(req);

        const createdUser = UserService.createUser(respBody);

        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ data: createdUser, error: null }));
    }

    static getUser = (req, res) => {
        const userId = req.url.split("/")[3];
        const user = UserService.getUser(userId);
        
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
        const userHobbies = UserService.getUserHobbies(userId);

        if(userHobbies){
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.set('Cache-Control', 'private, max-age=3600');
            res.end(JSON.stringify({ data: userHobbies, error: null }));
            return;
        }

        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ data: null, error: `User with id ${userId} not found.` }));

    }

    static deleteUser = (req, res) => {
        const userId = req.url.split("/")[3];
        const user = UserService.deleteUser();
    
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
        const user = UserService.updateUserHobbies(userId, newHobbies);

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
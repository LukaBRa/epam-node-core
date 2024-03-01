const uuid = require("uuid");

module.exports = class UserController {

    static users = [];
    static userHobbies = [];

    static getAllUsers = () => UserController.users;

    static getUser = (id) => {
        return this.users.find(user => user.user.id === id);
    };

    static createUser = ({ name, email }) => {
        const userId = uuid.v4();
        const newUser = {
            user: {
                id: userId,
                name: name,
                email: email
            },
            links: {
                self: `/api/users/${userId}`,
                hobbies: `/api/users/${userId}/hobbies`
            }
        };
        const newHobbies = {
            userId: userId,
            hobbies: [],
            links: {
                self: `/api/users/${userId}/hobbies`,
                user: `/api/users/${userId}`
            }
        }
        UserController.users.push(newUser);
        UserController.userHobbies.push(newHobbies);
        return newUser;
    }

    static getUserHobbies = (id) => {
        if(!this.users.find(user => user.user.id === id)){
            return null;
        }
        const { hobbies, links } = this.userHobbies.find(user => user.userId === id);
        return { hobbies, links };
    }

    static deleteUser = (id) => {
        const user = this.users.find(user => user.id === id);
        if(!user){
            return null;
        }

        this.users = this.users.filter(user => user.user.id !== user.user.id);
        this.userHobbies = this.userHobbies.filter(hobbie => hobbie.userId !== user.user.id);

        return user;
    }

    static updateUserHobbies = (userId, newHobbies) => {
        const hobbiesInstance = this.userHobbies.find(hobbie => hobbie.userId === userId);

        if(!hobbiesInstance) {
            return null;
        }

        hobbiesInstance.hobbies = [... new Set([...hobbiesInstance.hobbies, ...newHobbies.hobbies])];

        const user = this.users.find(user => user.user.id === userId);

        return user;
    }

}
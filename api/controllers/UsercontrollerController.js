/**
 * UsercontrollerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    getAll: async function (req, res) {
        console.log("started");
        try {
            const users = await Users.find();
            console.log(users);
            return res.json({'user': users});
        } catch (err) {
            console.log(err);
            return res.serverError(err);
        }
    },

};


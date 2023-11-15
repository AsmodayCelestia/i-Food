const {User, Menu, Category, Transaction, Sequelize} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {signToken} = require('../helpers/jwt')
const { Op } = Sequelize;
const axios = require('axios')

class Controller{
    static async allMenu(req, res, next){
        const { filter, page, sort, keyword } = req.query;
        console.log(page, keyword, filter);
        const paramQuerySQL = {
            include: [
                {model: Category,
                }
            ],
            order: [
                ['id', 'ASC'] 
            ]
        };
        let limit = 9
        let offset = 0

        //search
        if(keyword !== '' && typeof keyword !== 'undefined'){
            const title = {[Op.iLike]: `%${keyword.title}%`};
                paramQuerySQL.where = {title};
        }

        // sorting
        if (sort){
            paramQuerySQL.order = [["id", sort]]
        }

        // filtering by category
        if (filter?.category) {
            paramQuerySQL.where = {
                categoryId: filter.category,
            }
        }
        
        // pagination
        if (page !== '' && typeof page !== 'undefined') {
            if (page.size !== '' && typeof page.size !== 'undefined') {
                limit = page.size;
                paramQuerySQL.limit = limit;
            }
            if (page.number !== '' && typeof page.number !== 'undefined') {
                offset = page.number * limit - limit;
                paramQuerySQL.offset = offset;
            }
        } else {
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
        }
        console.log(paramQuerySQL, '<<<< ini yg bakal di findall');
        try {
            const menu = await Menu.findAll(paramQuerySQL)
            // console.log(article);
            res.status(200).json({message: 'Read Success', menu})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller 
'use strict';
require("dotenv").config()
const axios = require('axios')
const {hashPassword} = require('../helpers/bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
      const {data}= await axios({
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/list',
        params: {
          from: '0',
          size: '20',
          tags: 'under_30_minutes'
        },
        headers: {
          'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
        }
      });

      const category = require('../db/category.json');
      category.forEach(el => {
        el.createdAt = el.updatedAt = new Date();
      });

      const menu = data.results.map(el=>{
        return {
          name: el.name, 
          description: el.description, 
          image: el.thumbnail_url, 
          price: el.price.total*100,
          categoryId: el.categoryId= Math.floor(Math.random() * category.length) +1,
          createdAt: el.createdAt = new Date(),
          updatedAt: el.updatedAt = new Date()
        }
    })

      const user = require('../db/user.json')
      user.forEach(el => {
       delete el.id
       el.password = hashPassword(el.password)
       el.createdAt = el.updatedAt = new Date()
      });

      await queryInterface.bulkInsert('Categories', category);
      await queryInterface.bulkInsert('Menus', menu);
      await queryInterface.bulkInsert('Users', user);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null);
    await queryInterface.bulkDelete('Menus', null);
    await queryInterface.bulkDelete('Users', null);
  }
};

const {User, Menu, Category, Transaction, Cart} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {signToken} = require('../helpers/jwt')
const { Op } = require("sequelize");
const axios = require('axios')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();

class Controller{
    static async login(req, res, next){
        try {
            const {email, password} = req.body
            console.log(req.body,"<<<<<<<<< THIS IS BODY");
            if(!email){
                res.status(404).json({message: "Email is required"})
            }
            if(!password){
                res.status(404).json({message: "Password is required"})
            }
            const user = await User.findOne({where:{email}})
            console.log(user,"<<<<<<< THIS IS USER");
            if(!user){
                res.status(404).json({message: "Invalid email/password"})
            }
            if(!user){
                res.status(401).json({message: "Invalid email/password"})
            }
            const compare = comparePassword(password, user.password)
            if(!compare){
                res.status(401).json({message: "Invalid email/password"})
            }
            const access_token = signToken({id:user.id})
            // console.log(access_token);
            res.status(200).json({Authorization: `Bearer ${access_token}`})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }

    static async register(req, res, next){
        try {
            const user = await User.create(req.body)
            res.status(201).json({id: user.id, email: user.email})
        } catch (error) {
            if(error.name === "SequelizeValidationError"){
                res.status(404).json({message: error.errors[0].message})
            }else if( error.name === "SequelizeUniqueConstraintError"){
                res.status(404).json({message: error.errors[0].message})
            }else{
                res.status(500).json({message: "Internal Server Error"})
            }
        }
    }

    static async googleLogin(req, res, next){
        try{
               const ticket = await client.verifyIdToken({
                    idToken: req.headers.google_token,
                    audience: process.env.G_CLIENT, 
                });
                console.log(ticket);
                const payload = ticket.getPayload();
                console.log(payload);
                let user = await User.findOne({
                    where:{email:payload.email}
                })
                if(!user){
                    user = await User.create({
                        email:payload.email,
                        password:payload.email,
                    })
                }
                let access_token = signToken({
                    id:user.id
                })
                const role = user.role
                // const userid = payload['sub'];
                res.status(201).json({Authorization: `Bearer ${access_token}`})
        }catch(error){
            // console.log(error);
            next(error);
        }
    }

    static async allMenu(req, res, next){
        const { filter, page, sort, keyword } = req.query;
        // console.log(page, keyword, filter);
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
        // if(keyword["title"] !== '' && typeof keyword["title"] !== 'undefined'){
        //     const name = {[Op.iLike]: `%${keyword.title.name}%`};
        //         paramQuerySQL.where = {name};
        // }

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
            console.log(menu);
            res.status(200).json({message: 'Read Success', menu})
        } catch (error) {
            next(error)
        }
    }

    static async menu(req, res, next){
        const {id} = req.params
        console.log(id, "ini id dari params");
        try {
            const menu = await Menu.findOne({
                where: {
                    id
                  },
                  include: [
                    {
                        model: Category, 
                    },
                ]
                });
            if(!menu){
                throw {name: "Error Not Found"}
            }
            res.status(200).json({menu, message: "Read Articles Detail Success"})
        } catch (error) {
            next(error);
        }
    }

    static async addCart(req, res, next) {
        try {
            const { menuId, transactionId, quantity, price } = req.body.data;
    
            // Ensure "userId" is not included if it's not part of the Cart model
            const data = await Cart.create({ menuId, transactionId, quantity, price });
    
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    static async transaction(req, res, next) {
        try {
          console.log(req.user.id, "ini di transaction");
          const userId = req.user.id
          const transaction = await Transaction.create({ userId });
          console.log(transaction, "<<<<dapet nih abangkuuuh");
      
          // Now, if you want to add a Cart to the Transaction, you can do something like this:
          const { menuId, quantity, price } = req.body.data;
          const cart = await Cart.create({
            menuId,
            transactionId: transaction.id,
            quantity,
            price,
            userId
          });
      
          res.status(200).json(cart);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async allCart(req, res, next) {
        try {
            console.log("sampe sini");
            const data = await Cart.findAll({ 
                include: [
                    {model: Transaction,
                    },
                    {model: Menu,
                    }
                ],
                order: [
                    ['id', 'ASC'] 
                ]
        });
            console.log(data.data);
            res.status(200).json({data});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async payment(req, res){
        try {
          const apiKey =
            process.env.XENDIT_API_KEY;
          const base64ApiKey = Buffer.from(apiKey + ":").toString("base64");
          const headers = {
            Authorization: `Basic ${base64ApiKey}`,
            "Content-Type": "application/json",
          };
          console.log(req.body);
      
          const requestData = {
            external_id: `invoice-${Date.now()}`,
            amount: req.body.total,
            // payer_email: req.body.email,
            // description: `Sewa film ${}`,
            success_redirect_url: `https://ifood-9263a.web.app`,
          };
          


          const response = await axios.post(
            "https://api.xendit.co/v2/invoices",
            requestData,
            {
              headers: headers,
            }
          );
      
        //   const payment = await Transaction.create({
        //     quantity: 1,
        //     status: "paid",
        //     sendAddress: "jalan ini",
        //     price: req.body.price,
        //     UserId: req.body.UserId,
        //     BatikTypeId: req.body.TypeId,
        //   });
        const payment = await Cart.destroy({
            where: {},
          });         
          
          const paid = await Transaction.destroy({
            where: {},
          });  
          console.log(requestData, response.data);
          res.json({ invoiceUrl: response.data.invoice_url });
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .json({ error: "Terjadi kesalahan dalam membuat pembayaran." });
        }
      };
}

module.exports = Controller 
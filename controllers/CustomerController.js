const { Customer } = require('../models')

const CustomerController = {
    index: async (req,res) => {
        let data = {
            customerList: await Customer.findAll() // select * from customers
        }
        return res.render("customer/index", data)
    },
    add: async (req,res) => {
        return res.render("customer/add")
    },
    store: async (req,res) => {
        let input = req.body
        // insert data customer
        await Customer.create({
            customerCode: input.customer_code,
            customerName: input.customer_name,
            phone: input.phone
        })
        return res.redirect('/customer')
    },
    edit: async (req,res) => {
        const data = {
            customer: await Customer.findByPk(req.params.id) // select * from m_customer WHERE id = ? LIMIT 1
        }
        return res.render("customer/edit", data)
    },
    update: async (req,res) => {
        let input = req.body
        let customer = await Customer.findByPk(req.params.id)
        customer.customerCode = input.customer_code
        customer.customerName = input.customer_name
        customer.phone = input.phone
        await customer.save()
        return res.redirect('/customer')
    },
    delete: async (req,res) => {
        let customer = await Customer.findByPk(req.params.id)
        await customer.destroy()
        return res.redirect('/customer')
    }

}
module.exports  = CustomerController


const { Customer } = require('../../models')

const CustomerController = {
    index: async (req,res) => {
        let customerList =  await Customer.findAll()
        return res.json({data: customerList})
    },
    store: async (req,res) => {
        let input = req.body
        // insert data customer
        let customer = await Customer.create({
            customerCode: input.customer_code,
            customerName: input.customer_name,
            phone: input.phone
        })
        return res.json({data: customer, message: 'Berhasil menambah pelanggan'})
    },
    update: async (req,res) => {
        let input = req.body
        let customer = await Customer.findByPk(req.params.id)
        customer.customerCode = input.customer_code
        customer.customerName = input.customer_name
        customer.phone = input.phone
        await customer.save()
        return res.json({data: customer, message: 'Berhasil mengubah pelanggan'})
    },
    detail: async (req,res) => {
        let customer = await Customer.findByPk(req.params.id)
        return res.json({data: customer})
    },
    delete: async (req,res) => {
        let customer = await Customer.findByPk(req.params.id)
        await customer.destroy()
        return res.json({ message: 'Berhasil menghapus pelanggan'})
    }

}
module.exports  = CustomerController


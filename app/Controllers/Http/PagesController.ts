// import { schema } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Logger from '@ioc:Adonis/Core/Logger'
import Customer from 'App/Models/Customer';

export default class PagesController {

    public async home({ view }: HttpContextContract) {
        const customers = await Customer.all();
        const state = customers.map((customer) => {
            return {
                id: customer.id,
                name: customer.name,
                user_name: customer.user_name,
                email: customer.email,
                sex: customer.sex ? "Male" : "Female",
                age: customer.age
            }
        })
        return view.render('home', {
            customers: JSON.stringify(state)
        });
        // return view.render('home', { name: customers[0].user_name });
    }

    public async about({ view }: HttpContextContract) {
        return view.render('about');
    }

    public async contact({ view }: HttpContextContract) {
        return view.render('contact');
    }

    public async create({ view }: HttpContextContract) {
        return view.render('create', { isCreateUser: true });
    }
    // move to create page
    public async update({ view, request }: HttpContextContract) {
        const rq = JSON.stringify(request);
        const customerId = JSON.parse(rq).body.customerId;
        const customer = await Customer.find(customerId)
        return view.render('create', { isCreateUser: false, customer: customer });
    }
    // create/update user
    public async store({ request, response }: HttpContextContract) {
        const newCustomerSchema = schema.create({
            name: schema.string({ escape: true, trim: true }),
            user_name: schema.string({ escape: true, trim: true }),
            email: schema.string([
                rules.email()
            ])
        })
        const payload = await request.validate({ schema: newCustomerSchema })
        // const customer = await Customer.create(payload);
        const body = request.body();
        // update customer
        if (body.id) {
            const customer = await Customer.find(body.id)
            customer?.merge(body);
            await customer?.save();
        } else { //update customer
            await Customer.create(payload);
            // await Customer.create(body);
        }

        return response.redirect('/')
    }

    public async destroy({ params, response, request }: HttpContextContract) {
        Logger.info('delete')
        const idString = JSON.stringify(request.body().ids).replace(/['"]+/g, '');
        const ids = idString.split(',').map(function (item) {
            return parseInt(item, 10);
        });
        const customers = await Customer.findMany(ids);
        await Promise.all(customers.map(async (customer): Promise<any> => {
            await customer.delete();
        }));
        // await Customer.query().where('id', ids).delete();
        return response.redirect('/')
    }
}

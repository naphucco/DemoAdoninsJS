import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator';
import Logger from '@ioc:Adonis/Core/Logger'
import Customer from "App/Models/Customer";

export default class TestCrudsController {
    // get /crud 
    public async index() {
        return Customer.all();
    }

    // post /crud 
    public async store({ request, response }: HttpContextContract) {
        // const body = request.body();

        const newCustomerSchema = schema.create({
            name: schema.string({ trim: true }),
        })
        const payload = await request.validate({ schema: newCustomerSchema })
        const customer = await Customer.create(payload);
        response.status(201);
        return customer;
    }

    // get /crud/1
    public async show({ params, request }: HttpContextContract) {
        // return request;
        const rq = JSON.stringify(request);
        return JSON.parse(rq).body.customerId;
        // return Customer.findOrFail(params.id)
    }

    public async destroy({ params, response }: HttpContextContract) {
        const customer = await Customer.findOrFail(params.id)
        await customer.delete();
        return customer;
    }
}
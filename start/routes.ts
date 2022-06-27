/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'PagesController.home')
Route.get('/about-us', 'PagesController.about').as('about')
Route.get('/contact-us', 'PagesController.contact').as('contact')
Route.get('/create-customer', 'PagesController.create').as('create')
Route.get('/update-customer', 'PagesController.update').as('update')
Route.post('/custommer', 'PagesController.store')
Route.post('/custommers', 'PagesController.destroy')
Route.resource('/crud', 'TestCrudsController')
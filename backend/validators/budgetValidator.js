const Joi = require('joi');

const budgetSchema = Joi.object({
    title: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
    amount: Joi.number().positive().required(),
    spent: Joi.number().min(0).optional(),
    date: Joi.date().iso().required(),
   description: Joi.string().allow('').trim().optional(),

});

module.exports = { budgetSchema };

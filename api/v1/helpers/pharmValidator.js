import Joi from '@hapi/joi';

export default class PharmValidator {
  static request(pharm) {
    const schema = Joi.object().keys({
      name: Joi.string()
        .required()
        .min(3)
        .max(40)
        .trim()
        .pattern(/^[a-zA-Z]+$/),
      logo: Joi.any(),
      insurances: Joi.array(),
      email: Joi.string()
        .email()
        .required()
        .trim(),
      telephone: Joi.string()
        .trim()
        .regex(/^[0-9]{7,10}$/)
        .required(),
      pharmRep: Joi.string()
        .required()
        .min(5)
        .trim()
    });
    return schema.validate(pharm, { abortEarly: false });
  }
}

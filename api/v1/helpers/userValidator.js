import Joi from '@hapi/joi';

export default class UserValidator {
  static login(user) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .trim()
        .required(),
      password: Joi.string()
        .trim()
        .required()
    });
    return schema.validate(user, { abortEarly: false });
  }

  static signup(user) {
    const schema = Joi.object().keys({
      firstName: Joi.string()
        .required()
        .min(3)
        .max(40)
        .trim()
        .pattern(/^[a-zA-Z]+$/),
      lastName: Joi.string()
        .required()
        .min(3)
        .max(40)
        .trim()
        .pattern(/^[a-zA-Z]+$/),
      email: Joi.string()
        .email()
        .required()
        .trim(),
      password: Joi.string()
        .min(6)
        .trim(),
      role: Joi.string().trim()
    });
    return schema.validate(user, { abortEarly: false });
  }
}

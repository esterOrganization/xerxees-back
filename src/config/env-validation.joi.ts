import * as joi from 'joi';

export const envValidationSchema = joi.object({
  // APP
  APP_PORT: joi.string().required(),
  APP_MODE: joi.string().required(),
  APP_PREFIX: joi.string().required(),


  // POSTGRES
  PG_HOST: joi.string().required(),
  PG_PORT: joi.string().required(),
  PG_USERNAME: joi.string().required(),
  PG_PASSWORD: joi.string().required(),
  PG_DATABASE: joi.string().required(),

  // SWAGGER
  SG_TITLE: joi.string().required(),
  SG_DESCRIPTION: joi.string().required(),
  SG_VERSION: joi.string().required(),
  SG_TAG: joi.string().required(),
  SG_PREFIX: joi.string().required(),

  // JWT
  JWT_SECRET: joi.string().required(),
  JWT_EXPIRATION_TIME: joi.string().required(),

  // GOOGLE OAUTH
  GOOGLE_CLIENT_ID: joi.string().required(),
  GOOGLE_CLIENT_SECRET: joi.string().required(),
  GOOGLE_CALLBACK_URL: joi.string().required(),
  FRONT_CALL_BACK: joi.string().required(),
});
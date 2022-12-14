"use strict";
exports.__esModule = true;
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var express_validator_1 = require("express-validator");
var userRoute = express_1.Router();
userRoute.post('/user/registration', express_validator_1.body('email').isEmail(), express_validator_1.body('name').isLength({ min: 2, max: 15 }), express_validator_1.body('surname').isLength({ min: 2, max: 15 }), express_validator_1.body('password').isLength({ min: 5 }), user_controller_1["default"].registrate);
userRoute.patch('/user/auth-code', express_validator_1.body('email').isEmail(), express_validator_1.body('code').isLength({ min: 1, max: 6 }), user_controller_1["default"].sendAuthCode);
userRoute.post('/user/send-mail', express_validator_1.body('email').isEmail(), user_controller_1["default"].sendMail);
userRoute.post('/user/login', express_validator_1.body('email').isEmail(), express_validator_1.body('password').isLength({ min: 5, max: 25 }), user_controller_1["default"].login);
userRoute["delete"]('/user/:id', user_controller_1["default"].deleteUser);
userRoute.get('/user/email/:email', express_validator_1.param('email').isEmail(), user_controller_1["default"].getEmail);
userRoute.get('/user', user_controller_1["default"].getUsers);
userRoute.get('/user/:id', express_validator_1.param('id').isNumeric(), user_controller_1["default"].getOneUser);
userRoute.put('/user/:id', express_validator_1.param('id').isNumeric(), express_validator_1.body('name').isLength({ min: 2 }), express_validator_1.body('surname').isLength({ min: 2 }), user_controller_1["default"].updateUser);
userRoute.patch('/user/homebar/:id', express_validator_1.param('id').isNumeric(), express_validator_1.body('homebar.coctail').isLength({ min: 2 }), user_controller_1["default"].updateHomeBar);
userRoute.patch('/user/favorites/:id', express_validator_1.param('id').isNumeric(), express_validator_1.body('favorites.coctail').isLength({ min: 2 }), user_controller_1["default"].updataFavorites);
exports["default"] = userRoute;

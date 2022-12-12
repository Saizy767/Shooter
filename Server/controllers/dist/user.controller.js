"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var db_1 = require("../database/db");
var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
var mail_service_1 = require("../service/mail-service");
var bscript = require("bcryptjs");
var checker_service_1 = require("../service/checker-service");
var express_validator_1 = require("express-validator");
dotenv.config();
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.registrate = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error, _a, name, surname, email, password, securePassword, activationCode, checkerEmail;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        error = express_validator_1.validationResult(req);
                        _a = req.body, name = _a.name, surname = _a.surname, email = _a.email, password = _a.password;
                        if (error.errors.length) {
                            return [2 /*return*/, res.status(400).json(error.errors[0].msg)];
                        }
                        securePassword = bscript.hashSync(password, 6);
                        activationCode = Math.floor(Math.random() * 999999).toString();
                        return [4 /*yield*/, checker_service_1["default"].checkEmail(email)];
                    case 1:
                        checkerEmail = _b.sent();
                        if (!checkerEmail) return [3 /*break*/, 3];
                        return [4 /*yield*/, db_1["default"].query("INSERT INTO person (name, surname, email,\n                                    password, favorites, homebar, \n                                    isActivated,tokenActivated, activatedCode)\n                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)", [name, surname, email, securePassword, [], [], false, false, activationCode])];
                    case 2:
                        _b.sent();
                        res.status(201).json({ message: 'Account created' });
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, db_1["default"].query("UPDATE person SET name=$1, surname=$2,\n                                    password=$3, favorites=$4, homebar=$5, \n                                    isActivated=$6,tokenActivated=$7, activatedCode=$8 WHERE email= $9", [name, surname, securePassword, [], [], false, false, activationCode, email])];
                    case 4:
                        _b.sent();
                        res.status(200).json({ message: 'Account updated' });
                        _b.label = 5;
                    case 5:
                        if (!(process.env.NODE_ENV !== 'test')) return [3 /*break*/, 7];
                        return [4 /*yield*/, mail_service_1["default"].sendToEmail(email, activationCode)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, tokenList, user, accessToken, refreshToken, response;
            return __generator(this, function (_b) {
                _a = req.body, email = _a.email, password = _a.password;
                tokenList = {};
                user = {
                    email: email,
                    password: password
                };
                accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_LIFE });
                refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN_LIFE });
                response = {
                    "status": "Logged in",
                    "accessToken": accessToken,
                    "refreshToken": refreshToken
                };
                tokenList[refreshToken] = response; // send refreshToken to client
                res.status(200).json(response);
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.getToken = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var postData, tokenList, user, accessToken, response;
            return __generator(this, function (_a) {
                postData = req.body;
                tokenList = {};
                if ((postData.refreshToken) && (postData.refreshToken in tokenList)) {
                    user = {
                        "email": postData.email,
                        "name": postData.name
                    };
                    accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_LIFE });
                    response = {
                        "accessToken": accessToken
                    };
                    tokenList[postData.refreshToken].accessToken = accessToken;
                    res.status(200).json(response);
                }
                else {
                    res.status(404).send('Invalid request');
                }
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.sendMail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, error, activationCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        error = express_validator_1.validationResult(req);
                        activationCode = Math.floor(Math.random() * 999999).toString();
                        if (error.errors.length) {
                            return [2 /*return*/, res.status(400).json(error.errors[0].msg)];
                        }
                        return [4 /*yield*/, db_1["default"].query("UPDATE person SET activatedCode=$1 WHERE email=$2", [activationCode, email])];
                    case 1:
                        _a.sent();
                        if (!(process.env.NODE_ENV !== 'test')) return [3 /*break*/, 3];
                        return [4 /*yield*/, mail_service_1["default"].sendToEmail(email, activationCode)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        res.status(200).json("Send to " + email);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.sendAuthCode = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, email, error, CompareCode;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, code = _a.code, email = _a.email;
                        error = express_validator_1.validationResult(req);
                        if (error.errors.length) {
                            return [2 /*return*/, res.status(400).json(error.errors[0].msg)];
                        }
                        return [4 /*yield*/, checker_service_1["default"].checkCode({ email: email, code: code })];
                    case 1:
                        CompareCode = _b.sent();
                        if (!CompareCode) return [3 /*break*/, 3];
                        return [4 /*yield*/, db_1["default"].query("UPDATE person SET isActivated = $1, tokenActivated = $2 WHERE email = $3", [true, true, email])];
                    case 2:
                        _b.sent();
                        res.status(200).json('Authorization code updated');
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(400).json('Authorization code error');
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getEmail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, error, checkEmail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.params.email;
                        error = express_validator_1.validationResult(req);
                        return [4 /*yield*/, checker_service_1["default"].checkEmail(email)];
                    case 1:
                        checkEmail = _a.sent();
                        if (error.errors.length) {
                            return [2 /*return*/, res.status(400).json(error.errors[0].msg)];
                        }
                        if (!checkEmail) {
                            res.status(400).json(email + " is existing");
                        }
                        else {
                            res.status(200).json(email + " is not existing");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1["default"].query("SELECT * FROM person")];
                    case 1:
                        users = _a.sent();
                        res.status(200).json(users.rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, checkID, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, checker_service_1["default"].checkID({ id: id })];
                    case 1:
                        checkID = _a.sent();
                        if (!checkID) return [3 /*break*/, 3];
                        return [4 /*yield*/, db_1["default"].query('DELETE FROM person WHERE id = $1', [id])];
                    case 2:
                        user = _a.sent();
                        res.status(200).json("User " + id + " deleted");
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(400).json("User " + id + " is not existing");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getOneUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error, checkID, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        error = express_validator_1.validationResult(req);
                        if (error.errors.length) {
                            return [2 /*return*/, res.status(400).json(error.errors[0].msg)];
                        }
                        return [4 /*yield*/, checker_service_1["default"].checkID({ id: id })];
                    case 1:
                        checkID = _a.sent();
                        if (!checkID) return [3 /*break*/, 3];
                        return [4 /*yield*/, db_1["default"].query("SELECT * FROM person WHERE id = $1", [id])];
                    case 2:
                        user = _a.sent();
                        res.status(200).json(user.rows);
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(400).json('This ID not exsist');
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, name, surname, error, checkID, updatePerson;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, name = _a.name, surname = _a.surname;
                        error = express_validator_1.validationResult(req);
                        if (error.errors.length) {
                            return [2 /*return*/, res.status(400).json(error.errors[0].msg)];
                        }
                        return [4 /*yield*/, checker_service_1["default"].checkID({ id: id })];
                    case 1:
                        checkID = _b.sent();
                        if (!checkID) return [3 /*break*/, 3];
                        return [4 /*yield*/, db_1["default"].query("UPDATE person SET name = $1, surname = $2 WHERE id = $3", [name, surname, id])];
                    case 2:
                        updatePerson = _b.sent();
                        res.status(200).json(updatePerson.rows[0]);
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(400).json('This ID not exsist');
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateHomeBar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, homebar, error, checkID, currentHomeBar, nextHomeBar, sendHomeBar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        homebar = req.body.homebar;
                        error = express_validator_1.validationResult(req);
                        if (error.errors.length) {
                            return [2 /*return*/, res.status(400).json(error.errors[0].msg)];
                        }
                        return [4 /*yield*/, checker_service_1["default"].checkID({ id: id })];
                    case 1:
                        checkID = _a.sent();
                        if (!checkID) return [3 /*break*/, 4];
                        return [4 /*yield*/, db_1["default"].query('SELECT homebar FROM person WHERE id = $1', [id])];
                    case 2:
                        currentHomeBar = _a.sent();
                        currentHomeBar.rows[0].homebar.push(homebar);
                        nextHomeBar = currentHomeBar.rows[0].homebar;
                        return [4 /*yield*/, db_1["default"].query('UPDATE person SET homebar = $1 WHERE id = $2', [nextHomeBar, id])];
                    case 3:
                        sendHomeBar = _a.sent();
                        res.status(200).json(sendHomeBar.rows);
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(400).json('This ID not exsist');
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updataFavorites = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, favorites, error, checkID, currentFavotires, nextFavorites, sendHomeBar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        favorites = req.body.favorites;
                        error = express_validator_1.validationResult(req);
                        if (error.errors.length) {
                            return [2 /*return*/, res.status(400).json(error.errors[0].msg)];
                        }
                        return [4 /*yield*/, checker_service_1["default"].checkID({ id: id })];
                    case 1:
                        checkID = _a.sent();
                        if (!checkID) return [3 /*break*/, 4];
                        return [4 /*yield*/, db_1["default"].query('SELECT favorites FROM person WHERE id = $1', [id])];
                    case 2:
                        currentFavotires = _a.sent();
                        currentFavotires.rows[0].favorites.push(favorites);
                        nextFavorites = currentFavotires.rows[0].favorites;
                        return [4 /*yield*/, db_1["default"].query('UPDATE person SET favorites = $1 WHERE id = $2', [nextFavorites, id])];
                    case 3:
                        sendHomeBar = _a.sent();
                        res.status(200).json(sendHomeBar.rows);
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(400).json('This ID not exsist');
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports["default"] = new UserController();

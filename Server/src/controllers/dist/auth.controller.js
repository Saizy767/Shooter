"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var dotenv = require("dotenv");
var bscript = require("bcryptjs");
var express_validator_1 = require("express-validator");
var mail_service_1 = require("../service/mail-service");
var checker_service_1 = require("../service/checker-service");
var token_service_1 = require("../service/token-service");
var userDTO_1 = require("../dtos/userDTO");
var db_1 = require("../database/db");
dotenv.config();
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.registrate = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error, _a, name, surname, email, password, securePassword, activationCode, checkerEmail, VerificationEmail;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        error = express_validator_1.validationResult(req);
                        if (error.errors.length) {
                            return [2 /*return*/, res.status(400).json(error.errors[0])];
                        }
                        _a = req.body, name = _a.name, surname = _a.surname, email = _a.email, password = _a.password;
                        securePassword = bscript.hashSync(password, 6);
                        activationCode = Math.floor(Math.random() * 999999).toString();
                        return [4 /*yield*/, checker_service_1["default"].checkEmail(email)];
                    case 1:
                        checkerEmail = _b.sent();
                        return [4 /*yield*/, checker_service_1["default"].checkOfVerificationEmail(email)];
                    case 2:
                        VerificationEmail = _b.sent();
                        if (!(checkerEmail && !VerificationEmail)) return [3 /*break*/, 4];
                        return [4 /*yield*/, db_1["default"].query("INSERT INTO person (name, surname, email,\n                                    password, favorites, homebar, \n                                    isActivated,tokenActivated, activatedCode)\n                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)", [name, surname, email, securePassword, [], [], false, false, activationCode])];
                    case 3:
                        _b.sent();
                        res.status(201).json('Account created');
                        return [3 /*break*/, 7];
                    case 4:
                        if (!(checkerEmail && VerificationEmail)) return [3 /*break*/, 5];
                        res.status(400).json('Account has verification');
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, db_1["default"].query("UPDATE person SET name=$1, surname=$2,\n                                    password=$3, favorites=$4, homebar=$5, \n                                    isActivated=$6,tokenActivated=$7, activatedCode=$8 WHERE email= $9", [name, surname, securePassword, [], [], false, false, activationCode, email])];
                    case 6:
                        _b.sent();
                        res.status(200).json('Account updated');
                        _b.label = 7;
                    case 7:
                        if (!(process.env.NODE_ENV !== 'test')) return [3 /*break*/, 9];
                        return [4 /*yield*/, mail_service_1["default"].sendToEmail(email, activationCode)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error, _a, email, password, user, sendUser, comparePasswords, userDTO, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        error = express_validator_1.validationResult(req);
                        if (error.errors.length) {
                            return [2 /*return*/, res.status(400).json(error.errors[0])];
                        }
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, db_1["default"].query("SELECT * FROM person WHERE email = $1", [email])];
                    case 1: return [4 /*yield*/, (_b.sent()).rows[0]];
                    case 2:
                        user = _b.sent();
                        sendUser = {
                            name: user.name,
                            img: user.img
                        };
                        return [4 /*yield*/, bscript.compare(password, user.password)];
                    case 3:
                        comparePasswords = _b.sent();
                        userDTO = new userDTO_1["default"]({
                            id: user.id,
                            email: user.email,
                            isActivated: user.isactivated
                        });
                        if (!comparePasswords || !user) {
                            return [2 /*return*/, res.status(401).json('Authorization error')];
                        }
                        if (!(user.isactivated)) {
                            return [2 /*return*/, res.status(401).json('Activate code by your email')];
                        }
                        return [4 /*yield*/, token_service_1["default"].generateTokens(__assign({}, userDTO))];
                    case 4:
                        token = _b.sent();
                        res.cookie('refreshToken', token.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                        res.status(200).json({ token: token, sendUser: sendUser });
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.sendAuthCode = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error, _a, code, email, CompareCode;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        error = express_validator_1.validationResult(req);
                        if (error.errors.length) {
                            return [2 /*return*/, res.status(400).json(error.errors[0])];
                        }
                        _a = req.body, code = _a.code, email = _a.email;
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
    AuthController.prototype.sendMail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error, email, activationCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = express_validator_1.validationResult(req);
                        if (error.errors.length) {
                            return [2 /*return*/, res.status(400).json(error.errors[0])];
                        }
                        email = req.body.email;
                        activationCode = Math.floor(Math.random() * 999999).toString();
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
    AuthController.prototype.getEmail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error, email, checkEmail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = express_validator_1.validationResult(req);
                        if (error.errors.length) {
                            return [2 /*return*/, res.status(400).json(error.errors[0])];
                        }
                        email = req.params.email;
                        return [4 /*yield*/, checker_service_1["default"].checkEmail(email)];
                    case 1:
                        checkEmail = _a.sent();
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
    return AuthController;
}());
exports["default"] = new AuthController();

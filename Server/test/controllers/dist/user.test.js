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
var user_href_1 = require("./../../src/href/user.href");
var auth_href_1 = require("./../../src/href/auth.href");
var pg_1 = require("pg");
var supertest_1 = require("supertest");
var index_1 = require("../../index");
var user_schema_1 = require("../../src/models/user-schema");
var testPool = new pg_1.Pool({
    user: process.env.POOL_NAME,
    host: process.env.HOST,
    port: Number(process.env.DATAPORT),
    database: process.env.TEST_DATANAME
});
describe('delete user', function () {
    var user;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testPool.query(user_schema_1.DataQuery)];
                case 1:
                    _a.sent();
                    user = { name: 'Mike', surname: 'Dark', email: 'qwerty@gmail.com', password: 'qwertyqwert' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).post('/api' + auth_href_1.authRegistration).send(user)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.clearAllMocks();
                    return [4 /*yield*/, testPool.query('DROP TABLE person;')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return of success deleting', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = 1;
                    return [4 /*yield*/, supertest_1["default"](index_1.app)["delete"]("/api" + user_href_1.userURL + id).send({ id: id })];
                case 1:
                    response = _a.sent();
                    expect(response.body).toBe("User " + id + " deleted");
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return of error deleting', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, getUser, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = 2;
                    return [4 /*yield*/, supertest_1["default"](index_1.app).get("/api" + user_href_1.userURL + id)];
                case 1:
                    getUser = _a.sent();
                    return [4 /*yield*/, supertest_1["default"](index_1.app)["delete"]("/api" + user_href_1.userURL + id).send({ id: id })];
                case 2:
                    response = _a.sent();
                    expect(response.body).toBe("User " + id + " is not existing");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('get all users', function () {
    var user;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testPool.query(user_schema_1.DataQuery)];
                case 1:
                    _a.sent();
                    user = { name: 'Mike', surname: 'Dark', email: 'qwerty@gmail.com', password: 'qwertyqwert' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).post('/api' + auth_href_1.authRegistration).send(user)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.clearAllMocks();
                    return [4 /*yield*/, testPool.query('DROP TABLE person;')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return all users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).get('/api' + user_href_1.userURL)];
                case 1:
                    response = _a.sent();
                    expect(response.body[0]).toMatchObject({
                        "email": user.email,
                        "name": user.name,
                        "tokenactivated": false,
                        "surname": user.surname,
                        "isactivated": false
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('get one user by ID', function () {
    var user;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testPool.query(user_schema_1.DataQuery)];
                case 1:
                    _a.sent();
                    user = { name: 'Mike', surname: 'Dark', email: 'qwerty@gmail.com', password: 'qwertyqwert' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).post('/api' + auth_href_1.authRegistration).send(user)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.clearAllMocks();
                    return [4 /*yield*/, testPool.query('DROP TABLE person;')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should find user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).get("/api" + user_href_1.userURL + "1")];
                case 1:
                    response = _a.sent();
                    expect(response.body[0]).toMatchObject({
                        "email": user.email,
                        "name": user.name,
                        "tokenactivated": false,
                        "surname": user.surname,
                        "isactivated": false
                    });
                    return [2 /*return*/];
            }
        });
    }); }),
        it('should dont find user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).get("/api" + user_href_1.userURL + "2")];
                    case 1:
                        response = _a.sent();
                        expect(response.body).toBe('This ID not exsist');
                        return [2 /*return*/];
                }
            });
        }); });
    it('should return error cause ID is NaN', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).get("/api" + user_href_1.userURL + "asd")];
                case 1:
                    response = _a.sent();
                    expect(response.body).toBe('Invalid value');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('updating user by ID', function () {
    var user;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testPool.query(user_schema_1.DataQuery)];
                case 1:
                    _a.sent();
                    user = { name: 'Mike', surname: 'Dark', email: 'qwerty@gmail.com', password: 'qwertyqwert' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).post('/api' + auth_href_1.authRegistration).send(user)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.clearAllMocks();
                    return [4 /*yield*/, testPool.query('DROP TABLE person;')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updatedCharecters, id, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updatedCharecters = { name: 'Lucka', surname: 'Host' };
                    id = 1;
                    return [4 /*yield*/, supertest_1["default"](index_1.app).put("/api" + user_href_1.userURL + id).send(updatedCharecters)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest_1["default"](index_1.app).get("/api" + user_href_1.userURL + "1")];
                case 2:
                    response = _a.sent();
                    expect(response.body[0]).toMatchObject({
                        name: updatedCharecters.name,
                        surname: updatedCharecters.surname,
                        email: user.email
                    });
                    return [2 /*return*/];
            }
        });
    }); }),
        it('should send error of extraneous parameter', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedCharecters, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updatedCharecters = { name: 'Lucka', email: 'qwertyu@gmail.com' };
                        return [4 /*yield*/, supertest_1["default"](index_1.app).put("/api" + user_href_1.userURL + "1").send(updatedCharecters)];
                    case 1:
                        response = _a.sent();
                        expect(response.body).toBe('Invalid value');
                        return [2 /*return*/];
                }
            });
        }); });
    it('should send error by empty name', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updatedCharecters, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updatedCharecters = { name: '', surname: 'Host' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).put("/api" + user_href_1.userURL + "1").send(updatedCharecters)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toBe('Invalid value');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should send error by empty surname', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updatedCharecters, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updatedCharecters = { name: 'Lucka', surname: ';' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).put("/api" + user_href_1.userURL + "1").send(updatedCharecters)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toBe('Invalid value');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should send error by invalid ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updatedCharecters, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updatedCharecters = { name: 'Lucka', surname: 'Host' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).put("/api" + user_href_1.userURL + "qwer").send(updatedCharecters)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toBe('Invalid value');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should send error by not existing ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updatedCharecters, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updatedCharecters = { name: 'Lucka', surname: 'Host' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).put("/api" + user_href_1.userURL + "12").send(updatedCharecters)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toBe('This ID not exsist');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('adding to user homebar', function () {
    var user;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testPool.query(user_schema_1.DataQuery)];
                case 1:
                    _a.sent();
                    user = { name: 'Mike', surname: 'Dark', email: 'qwerty@gmail.com', password: 'qwertyqwert' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).post('/api' + auth_href_1.authRegistration).send(user)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.clearAllMocks();
                    return [4 /*yield*/, testPool.query('DROP TABLE person;')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should adding 2 coctails', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, responseGet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = 1;
                    return [4 /*yield*/, supertest_1["default"](index_1.app).patch("/api" + user_href_1.patchHomebar + id).send({ homebar: { coctail: 'Pinokolada' } })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest_1["default"](index_1.app).patch("/api" + user_href_1.patchHomebar + id).send({ homebar: { coctail: 'B52' } })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1["default"](index_1.app).get("/api" + user_href_1.userURL + id)];
                case 3:
                    responseGet = _a.sent();
                    expect(responseGet.body[0].homebar).toStrictEqual([{ coctail: 'Pinokolada' }, { coctail: 'B52' }]);
                    return [2 /*return*/];
            }
        });
    }); }),
        it('should adding one coctail of 2', function () { return __awaiter(void 0, void 0, void 0, function () {
            var id, errorReq, responseGet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = 1;
                        return [4 /*yield*/, supertest_1["default"](index_1.app).patch("/api" + user_href_1.patchHomebar + id).send({ homebar: { coctail: 'Pinokolada' } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, supertest_1["default"](index_1.app).patch("/api" + user_href_1.patchHomebar + id).send({ homebar: { coctail: '' } })];
                    case 2:
                        errorReq = _a.sent();
                        return [4 /*yield*/, supertest_1["default"](index_1.app).get("/api" + user_href_1.userURL + id)];
                    case 3:
                        responseGet = _a.sent();
                        expect(responseGet.body[0].homebar).toStrictEqual([{ coctail: 'Pinokolada' }]);
                        expect(errorReq.body).toBe('Invalid value');
                        return [2 /*return*/];
                }
            });
        }); }),
        it('should send error by invalid ID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var id, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = 'qwe';
                        return [4 /*yield*/, supertest_1["default"](index_1.app).patch("/api" + user_href_1.patchHomebar + id).send({ homebar: { coctail: 'Pinokolada' } })];
                    case 1:
                        response = _a.sent();
                        expect(response.body).toBe('Invalid value');
                        return [2 /*return*/];
                }
            });
        }); });
});
describe('adding to user favorites', function () {
    var user;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testPool.query(user_schema_1.DataQuery)];
                case 1:
                    _a.sent();
                    user = { name: 'Mike', surname: 'Dark', email: 'qwerty@gmail.com', password: 'qwertyqwert' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).post('/api' + auth_href_1.authRegistration).send(user)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.clearAllMocks();
                    return [4 /*yield*/, testPool.query('DROP TABLE IF EXISTS person;')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should adding 2 coctails', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, responseGet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = 1;
                    return [4 /*yield*/, supertest_1["default"](index_1.app).patch("/api" + user_href_1.patchFavorites + id).send({ favorites: { coctail: 'Pinokolada' } })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest_1["default"](index_1.app).patch("/api" + user_href_1.patchFavorites + id).send({ favorites: { coctail: 'B52' } })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1["default"](index_1.app).get("/api" + user_href_1.userURL + id)];
                case 3:
                    responseGet = _a.sent();
                    expect(responseGet.body[0].favorites).toStrictEqual([{ coctail: 'Pinokolada' }, { coctail: 'B52' }]);
                    return [2 /*return*/];
            }
        });
    }); }),
        it('should adding one coctail of 2', function () { return __awaiter(void 0, void 0, void 0, function () {
            var id, errorReq, responseGet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = 1;
                        return [4 /*yield*/, supertest_1["default"](index_1.app).patch("/api" + user_href_1.patchFavorites + id).send({ favorites: { coctail: 'Pinokolada' } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, supertest_1["default"](index_1.app).patch("/api" + user_href_1.patchFavorites + id).send({ favorites: { coctail: '' } })];
                    case 2:
                        errorReq = _a.sent();
                        return [4 /*yield*/, supertest_1["default"](index_1.app).get("/api" + user_href_1.userURL + id)];
                    case 3:
                        responseGet = _a.sent();
                        expect(responseGet.body[0].favorites).toStrictEqual([{ coctail: 'Pinokolada' }]);
                        expect(errorReq.body).toBe('Invalid value');
                        return [2 /*return*/];
                }
            });
        }); }),
        it('should send error by invalid ID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var id, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = 'qwe';
                        return [4 /*yield*/, supertest_1["default"](index_1.app).patch("/api" + user_href_1.patchFavorites + id).send({ favorites: { coctail: 'Pinokolada' } })];
                    case 1:
                        response = _a.sent();
                        expect(response.body).toBe('Invalid value');
                        return [2 /*return*/];
                }
            });
        }); });
});

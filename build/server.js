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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient({
    log: ['query']
});
//minhaapi.com/ads
app.get('/games', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield prisma.game.findMany();
    return res.json(games);
}));
app.post('ads', (req, res) => {
    return res.status(201).json([]);
});
app.get('/games/:id/ads', (req, res) => {
    //const gameId = req.params.id;
    return res.json([
        { id: 1, name: "Anuncio 1" },
        { id: 2, name: "Anuncio 2" },
        { id: 3, name: "Anuncio 3" },
        { id: 4, name: "Anuncio 4" },
        { id: 5, name: "Anuncio 5" },
    ]);
});
app.get('/ads/:id/discord', (req, res) => {
    //const adId = req.params.id;
    return res.json([]);
});
app.listen(3000, () => console.log('hello word'));

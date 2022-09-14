import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();

app.use(express.json())

const prisma = new PrismaClient({
    log:['query']
});
//minhaapi.com/ads

app.get('/games',async(req,res)=>{
    const games = await prisma.game.findMany({
        include:{
            _count:{
                select:{
                    ads:true,
                }
            }
        }
    })
    return res.json(games);
});

app.post('/games/:id/ads',async (req,res)=>{
    //pega o id do jogo pela url
    const gameId = req.params.id;
    const body = req.body;
    const ad = await prisma.ad.create({
        data:{
            gameId,
            name:body.name,
            yearsPlaying:body.yearsPlaying,
            discord:body.discord,
            weekDays:body.weekDays.join(','),
            hourStart:body.hourStart,
            hourEnd:body.hourEnd,
            useVoiceChannel:body.useVoiceChannel,
        }
    })

    return res.status(201).json();
});

app.get('/games/:id/ads',async (req,res)=> {
    const gameId = req.params.id;
    const ads = await prisma.ad.findMany({
        select:{
            id:true,
            name:true,
            weekDays:true,
            useVoiceChannel:true,
            yearsPlaying:true,
            hourStart:true,
            hourEnd:true,
        },
        where:{
            gameId,
        },
        orderBy:{
            createdAt:'desc'
        }
    })
    return res.json(ads.map(ad=>{
        return{
            ...ad,
            weekDays: ad.weekDays.split(',')
        }
    }));
});

app.get('/ads/:id/discord',async (req,res)=> {
    const adId = req.params.id;
    const ad = await prisma.ad.findUniqueOrThrow({
        select:{
            discord:true,
        },
        where:{
            id:adId,
        }
    })
    return res.json({
        discord: ad.discord,
    });
});

app.listen(3000,()=>console.log('hello word'))
// import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
// import {  } from "./asyncConfig.service";
// import * as mongoose from 'mongoose';

// @Injectable()
// export class DatabaseProvider implements OnModuleInit,OnModuleDestroy{
//     private connection:mongoose.Connection;
//     constructor(private readonly configService:AsyncConfigService) {}

//     async onModuleInit() {
//         await this.connect();
//     }
//     async connect(){
//         const dburl=this.configService.get('databaseUrl')
//         console.log(`Connecting to database at ${dburl}`);
//         return new Promise((resolve, reject) => {
//             setTimeout(()=>{
//                 resolve('Connected to database')
//             },1000)
//         })
//     }
// }
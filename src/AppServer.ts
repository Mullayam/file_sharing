import express, { Application } from 'express'
import { Routes } from './routers/index.js'
import { Middlewares } from './middlewares/index.js'
import bodyParser from "body-parser";
import cors from "cors";
import path from 'path';

export class AppServer {
    private app: Application;   

    constructor(private PORT:number = 7132) {
        this.app = express()
        this.PORT = PORT
        this.config()
        this.InitializeMiddlewares()
        this.InitializeRoutes()
    }
    private config(): void {
        this.app.use(cors({origin: "http://localhost:5173"}));
     
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    private InitializeMiddlewares() {
        this.app.use(Middlewares.MiddlewareFunction);          
       
    }
    private InitializeRoutes(): void {
        this.app.get('/', (req, res) => {
            res.status(200).json({ status: true, code: 200, message: "Api is Running Successfully" });
        })
        this.app.use('/api', new Routes().router)
    }
    RunApplication() {
        this.app.listen(this.PORT, () => console.log("App Started at http://localhost:7132"))
    }
}

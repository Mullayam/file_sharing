import express, { Application } from 'express'
import { Routes } from './routers/index.js'
import { Middlewares } from './middlewares/index.js'
import bodyParser from "body-parser";
import cors from "cors";
import { URL } from 'node:url';
import path from 'path';
const AppURL = process.env.APP_URL as string
export class AppServer {
    private app: Application;

    constructor(private PORT: number = 7132) {
        this.app = express()
        this.PORT = PORT
        this.config()
        this.InitializeMiddlewares()
        this.InitializeRoutes()
    }
    private config(): void {
        this.app.use(cors({ origin: ["http://localhost:5173", AppURL] }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(process.cwd(), 'build')));

    }
    private InitializeMiddlewares() {
        this.app.use(Middlewares.MiddlewareFunction);


    }
    private InitializeRoutes(): void {

        this.app.use('/api', new Routes().router)
        this.app.use("*", (req, res) => {
            res.redirect(`/?referTo=${req.originalUrl.slice(1)}`)             

        })
    }
    RunApplication() {
        this.app.listen(this.PORT, () => console.log("App Started at http://localhost:7132"))
    }
}

import { Application } from 'express';
import Express from 'express';
import mongoConnection from '../Shared/infrastruture/mongo/mongoConnection';
import userRouter from '../User/infrastruture/routes/UserRoutes';
import reviewRouter from '../Review/infrastruture/routes/ReviewRoutes';
import errorHandling from '../middlewares/errorHandling';
import authRouter from '../Auth/infrastructure/routes/AuthRoutes';
import languageRouter from '../Language/infrastructure/routes/LanguageRoutes';
import questionRouter from '../Question/infrastructure/routes/QuestionRoutes';

export class Server {
  private express: Application;
  private port: number | string;
  private _routes: { [x: string]: string };

  constructor(port: number | string) {
    this.express = Express();
    this.port = port;
    this._routes = {};
    this.middlewares();
    this.routes();
    mongoConnection(
      process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase'
    );

    this.express.use(errorHandling);
  }

  public start(): void {
    this.express.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  public getExpress(): Application {
    return this.express;
  }

  public getPort(): number | string {
    return this.port;
  }

  private middlewares(): void {
    this.express.use(Express.json());
    this.express.use(Express.static('public'));
  }

  private routes(): void {
    this.express.get('/health', (req, res) => {
      res.send('Server is running successfully');
    });

    this.express.use('/api/user', userRouter);
    this.express.use('/api/review', reviewRouter);
    this.express.use('/api/auth', authRouter);
    this.express.use('/api/language', languageRouter);
    this.express.use('/api/questions', questionRouter);
  }
}

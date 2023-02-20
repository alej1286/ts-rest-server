import express, { Application } from "express";
import userRoutes from "../routes/user.route";
import cors from "cors";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: "/api/users",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    //MIDDLEWARES CALLS
    this.middlewares();

    //ROUTES DEFINITION
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //BODY READING
    this.app.use(express.json());

    //PUBLIC FOLDER
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;

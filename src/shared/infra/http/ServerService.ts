import { Server } from '@overnightjs/core';
import * as bodyParser from "body-parser";

class ServerService extends Server {
  private readonly SERVER_STARTED = 'Server started on port: ';

  constructor() {
    super(true);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  public start(port: number): void {
    this.app.listen(port);
  }
}

export default ServerService;

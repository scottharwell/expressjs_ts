import * as express from "express";

export class Routes{
  static ExpressRouter = express.Router();

  /**
   * Set route to index page
   */
  public static index():express.Router{
    Routes.ExpressRouter.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });
    
    return Routes.ExpressRouter;
  }
}
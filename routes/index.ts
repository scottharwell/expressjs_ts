import * as express from "express";

export namespace Routes{
  export class Index{
    /**
     * Set route to index page
     */
    public static get():express.Router{
      let router = express.Router();
      router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
      });
      
      return router;
    }
  }
}
import { Shopify } from "@shopify/shopify-api";
import verifyRequest from "../middleware/verify-request.js";
import knex from "../databaseConfiguration/database.js";
import useQueries from "../databaseConfiguration/useQueries.js";
export default function productRoute(app){
    
    const {getComments, createComment, getMessagess} = useQueries()

    app.get("/api/products", async (req, res) => {
        const session = await Shopify.Utils.loadCurrentSession(
          req,
          res,
          app.get("use-online-tokens")
        );
        const { Product } = await import(
          `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
        );
    
        const products = await Product.all({
            session: session,
          });
      
        res.status(200).send( products );
    });

    app.get("/api/product/:id", verifyRequest(app), async (req, res) => {
        console.log("imran")
        const { id } = req.params;
        const session = await Shopify.Utils.loadCurrentSession(
          req,
          res,
          app.get("use-online-tokens")
        );
        const { Product } = await import(
          `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
        );
    
        const product = await Product.find({
          session: session,
          id: id,
        });
    
        res.status(200).send(product );
    });

   
    
      app.get("/api/product/comments/:id", verifyRequest(app), async (req, res) => {
        // await createComment(req.body);
        
        const { id } = req.params;
        const response = await getComments(id)
        res.status(200).send(response);
      });
      
      app.post("/api/comment/:id", verifyRequest(app), async (req, res) => {
        console.log("imran")
        const session = await Shopify.Utils.loadCurrentSession(
          req,
          res,
          app.get("use-online-tokens")
        );
        const { id } = req.params;
        const params = id.split("^")
          console.log(params)
        const userInfo = session?.onlineAccessInfo?.associated_user
        const response = await createComment({product_id: params[1], description: params[0], to: params[2], user_name: "test", date: new Date()} );
        
        res.status(200).send(response);
      });

      app.put("/api/product/status/:id", verifyRequest(app), async (req, res) => {
        
        const session = await Shopify.Utils.loadCurrentSession(
          req,
          res,
          app.get("use-online-tokens")
        );

        const { Product } = await import(
          `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
        );
        const { id } = req.params;
        const params = id.split("^")

        const product = new Product({session: session});
        product.id = params[1];
        product.status = params[0]
        console.log(params)


        const response  = await product.save({
          update: true,
        });
        console.log("Test")
        console.log(response)
        res.status(200).send(response);
      });


      app.get("/api/messages", verifyRequest(app), async (req, res) => {
        // await createComment(req.body);
        
        const response = await getMessagess()
        res.status(200).send(response);
      });
      
}
import { Shopify } from "@shopify/shopify-api";
import verifyRequest from "../middleware/verify-request.js";
import knexObject from "../databaseConfiguration/database.js";
import useQueries from "../databaseConfiguration/sqlQueries.js";
export default function productRoute(app){
    const { knex1 } = knexObject();
    const {getComments, createComment} = useQueries()

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

    app.post("/api/product/comment", verifyRequest(app), async (req, res) => {
        console.log("imran")
        const session = await Shopify.Utils.loadCurrentSession(
          req,
          res,
          app.get("use-online-tokens")
        );
    
        const userInfo = session?.onlineAccessInfo?.associated_user
        const response = await createComment(req.body, {user_name: userInfo?.first_name + " "+userInfo?.last_name , user_id: session?.id, user_email: userInfo?.email});
        console.log(userInfo)
        console.log("imran")
        console.log(response)
        res.status(200).send(response);
      });
    
      app.get("/api/product/comments/:id", verifyRequest(app), async (req, res) => {
        // await createComment(req.body);
        
        const { id } = req.params;
        const response = await getComments(id)
        console.log("after request");
        res.status(200).send(response);
      });
      
}
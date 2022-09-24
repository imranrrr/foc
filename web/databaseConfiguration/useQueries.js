import knexObject from "./database.js";

export default function useQueries(){
  const { knex1 } = knexObject();
  
  async function getComments(id){
      try {
        const commentsList = await knex1.select().from("comments");
        return {status: true, comment: commentsList}
      }catch(err){
        return {status: false, error: err}
      }
  }
  
  async function createComment(args){
      try {
        const response = await knex1('comments').insert({description: args.description, date: args.date, user_name: args.user_name, product_id: args.product_id})
        console.log({description: args.description, date: args.date, user_name: args.user_name, product_id: args.product_id})
        return {status: true, response: response}
      }catch(err){
        return {status: false, error: err}
      }
  }
  return {createComment, getComments}
} 
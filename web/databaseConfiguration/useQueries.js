import knexObject from "./database.js";

export default function useQueries(){
  const { knexObj } = knexObject();
  
  async function getComments(id){
      try {
        const commentsList = await knexObj.select().from("messages").where({product_id: id})
        return {status: true, comment: commentsList}
      }catch(err){
        return {status: false, error: err}
      }
  }
  
  async function createComment(args){
      try {
        const response = await knexObj('messages').insert({to: args.to, description: args.description, date: args.date, user_name: args.user_name, product_id: args.product_id})
        console.log({description: args.description, date: args.date, user_name: args.user_name, product_id: args.product_id})
        return {status: true, response: response}
      }catch(err){
        return {status: false, error: err}
      }
  }

  async function getMessagess(){
    try {
      const commentsList = await knexObj.select().from("messages")
      return {commentsList}
    }catch(err){
      return {status: false, error: err}
    }
}

  return {createComment, getComments, getMessagess}
} 
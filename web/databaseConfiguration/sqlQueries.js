import knexObject from "./database.js";

export default function useQueries(){
    const { knex1 } = knexObject();
    
    async function getComments(id){
        try {
          const commentsList = await knex1.select().from("comments");
          console.log("cccoom")
          console.log(commentsList)
          return {status: true, comment: commentsList}
        }catch(err){
          return {status: false, error: err}
        }
    }
    
    async function createComment(args, userInfo){
        try {
          const response = await knex1('comments').insert({...args, ...userInfo})
          
          return {status: true, response: response}
        }catch(err){
          return {status: false, error: err}
        }
        return {data: {satus: true}}
    }
      return {createComment, getComments}
} 
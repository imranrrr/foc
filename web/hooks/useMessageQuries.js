
export default function useMessagesQueries(){
  
  async function getMessage(id){
      try {
        const messageList = await knex.select().from("messages").where({product_id: id})
        return {status: true, messages: messageList}
      }catch(err){
        return {status: false, error: err}
      }
  }
  
  async function createMessage(args){
      try {
        const response = await knex('messages').insert({to: args.to, description: args.description, date: args.date, user_name: args.user_name, product_id: args.product_id})
        console.log({description: args.description, date: args.date, user_name: args.user_name, product_id: args.product_id})
        return {status: true, response: response}
      }catch(err){
        return {status: false, error: err}
      }
  }

  async function getMessages(){
    try {
      const messageList = await knex.select().from("messages")
      return {messageList}
    }catch(err){
      return {status: false, error: err}
    }
}

  return {createMessage, getMessages, getMessage}
} 
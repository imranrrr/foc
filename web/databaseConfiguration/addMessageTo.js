import knexObject from "./database.js";
export default function addMessageTo() {
    const { knexObj } = knexObject();

    knexObj.schema.hasTable("comments").then(function (exists) {
        if(exists){
        knexObj.schema.table('comments', function(t) {
            t.string('to', 40);
        });
        }
    });
}
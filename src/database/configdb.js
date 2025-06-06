import mongoose from "mongoose";

const connect = async () => {
    try {
        //força com que valores que nao sao passados para o nosso construtor nao seja enviado para o nosso banco de dados
        //se eles nao estavam definidos no esquema que definimos que seria aquela model que estamos passando
        //pra nao salvar coisas que nao queremos
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.MONGO_DB_NAME,
        });
        console.log("MongoDB connected");
    }
    catch (error){
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

export default {connect};
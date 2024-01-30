const codeConverterRoute= require("./router/codeConverter-router");

const express=require("express");
const app=express();
const cors=require("cors");

const corsOptions={
    origin:"*",
    methods: "GET, POST, PUT, DELETE,PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/code',codeConverterRoute);

const PORT=7000;


app.listen(PORT,()=>{
    console.log(`server is running at port: ${PORT} `);
});

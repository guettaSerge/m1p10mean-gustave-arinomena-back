const usersRoutes=require("./routes/userRoutes");
const contactRoutes=require("./routes/contactRoutes");
const employeeRoutes=require("./routes/employeeRoutes");

module.exports = function (app){
    app.use("/api/users", usersRoutes);
    app.use("/api/contacts",contactRoutes);
    app.use("/api/employees",employeeRoutes);
}
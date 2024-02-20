const usersRoutes=require("./routes/userRoutes");
const contactRoutes=require("./routes/contactRoutes");
const employeeRoutes=require("./routes/employeeRoutes");
const serviceRoutes=require("./routes/serviceRoutes");
const offresRoutes=require("./routes/offreRoutes");
const reservationsRoutes=require("./routes/RenservationRoutes");
module.exports = function (app){
    app.use("/api/users", usersRoutes);
    app.use("/api/contacts",contactRoutes);
    app.use("/api/services",serviceRoutes);
    app.use("/api/offres",offresRoutes);
    app.use("/api/reservations",reservationsRoutes);
}
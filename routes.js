const usersRoutes=require("./routes/userRoutes");
const contactRoutes=require("./routes/contactRoutes");
const employeeRoutes=require("./routes/employeeRoutes");
const serviceRoutes=require("./routes/serviceRoutes");
const offresRoutes=require("./routes/offreRoutes");
const reservationsRoutes=require("./routes/ReservationRoutes");
const preferenceEmployeeRoutes=require("./routes/preferenceEmployeeRoutes");
const preferenceServicesRoutes=require("./routes/preferenceServicesRoutes");
module.exports = function (app){
    app.use("/api/users", usersRoutes);
    app.use("/api/contacts",contactRoutes);
    app.use("/api/services",serviceRoutes);
    app.use("/api/offres",offresRoutes);
    app.use("/api/reservations",reservationsRoutes);
    app.use("/api/preference-employee",preferenceEmployeeRoutes);
    app.use("/api/preference-services",preferenceServicesRoutes);
}
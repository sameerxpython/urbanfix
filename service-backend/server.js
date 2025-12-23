require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const serviceRoutes = require("./routes/services");
const bookingRoutes = require("./routes/booking");
const providerRoutes = require("./routes/providers");
const adminRoutes = require("./routes/admin");
const { errorHandler } = require("./middleware/error");

const app = express();
connectDB();

app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/admin", adminRoutes);

app.get('/', (req, res) => res.send('Local Services API running'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

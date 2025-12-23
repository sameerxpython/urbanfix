require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");
const Service = require("../models/Service");

const run = async () => {
        await connectDB();
        await User.deleteMany();
        await Service.deleteMany();

        const bcrypt = require("bcrypt");
        const pass =  await bcrypt.hash('password123', 10);
        const user = await User.create({
            name: "John Doe",
            email: "john@example.com",
            passwordHash: pass,
            role: "user"
        });
        const provider = await User.create({
            name: "John Doe",
            email: "john@example.com",
            passwordHash: pass,
            role: "provider"
        });
        
        await Service.create({
            providerId: provider._id,
            title: 'AC Repair',
            description: 'AC Repair Service',
            pricePerUnit: 500,
            category: 'Appliances',
        });
        console.log('Seed done');
        process.exit(0);
    };

    
    run().catch((error) => {
        console.error(error);
        process.exit(1);
    });

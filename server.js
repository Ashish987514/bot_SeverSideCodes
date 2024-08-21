const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import the SerialNumber model
const SerialNumber = require('./models/SerialNumber');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/your-database-name', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => console.log(err));

// Function to generate a random serial number
function generateSerialNumber() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Route to generate and store the serial number
app.post('/generate_serial', async (req, res) => {
    var act=' '; 
    act = req.query.act;
    var act1 = req.query.act1;
    const action = req.query.action;  // Extract the action from the URL query string
    const serialNumberToCheck = req.query.serial_number;  // Extract the serial number from the query string
    console.log("act:");
    console.log(act);
    console.log("act1:");
    console.log(act1)
    
  if (act=='generate' || act=='done' ) {
   
        const serialNumber = generateSerialNumber();
        
        console.log("Generated Serial Number:", serialNumber);
        
        const newSerial = new SerialNumber({ serial_number: serialNumber });
        await newSerial.save();
       
        res.json({ status: 'generated', serial_number: serialNumber });
      
    }

    else if (act1 === 'check'||  /^[a-zA-Z0-9]{9}$/.test(action) ) {
        console.log("User Input Serial Number:", act1);
        
        
        // Check if the serial number exists in the database
        const serialExists = await SerialNumber.findOne({ serial_number: act1 });

        if (serialExists) {
            res.json({ status: 'exists , has been successfully registered and has been transferred to the concerned Authority. Further updates will be directly shared with you via messages.', serial_number: serialNumberToCheck });
        } else {
            res.json({ status: 'not found in our database', serial_number: serialNumberToCheck });
        }
    } else {
        res.status(400).send('Invalid action parameter');
    }
    
});



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Endpoint available at http://localhost:${PORT}/generate_serial`);
});


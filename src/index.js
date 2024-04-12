// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const stripe = require('stripe')("sk_test_51P312RSEbzC1lRyqBXyqG1PwSGJuQdbvVs6g5mAxrTyIhHSRUoodvc8fi6NmBNkzgKsQuq8sj6QaoHwwNcYpXBhO00FGUZhxqN"); // Replace with your actual secret key
const mongoose = require('mongoose')

// Import middleware
app.use(express.json());
app.use(
    cors({
      credentials: true,
      // origin: ["http://localhost:4200"],
  
      origin: ["https://e-commerce-frontend-roan-delta.vercel.app"]
    })
  );
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri="mongodb+srv://deviflair2020:admin@cluster0.bwhbeak.mongodb.net/"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });



// Routes import
// const authroutes = require('./routes/auth.routes')
// app.use('/auth', authroutes);

// const userroutes = require('./routes/user.routes')
// app.use('/api/users', userroutes);

// const productroute = require('./routes/product.routes')
// app.use('/api/products/',productroute);

// const adminproduct = require('./routes/adminproduct.routes')
// app.use('/api/admin/products/',adminproduct);

// const cartroute = require('./routes/cart.routes')
// app.use('/api/cart/',cartroute);

// const cartitemroute = require('./routes/cartitem.routes')
// app.use('/api/cart_items/',cartitemroute)

// const orderroute = require('./routes/order.routes')
// app.use('/api/orders',orderroute);

// const adminorderroute = require('./routes/adminorder.routes');
// app.use('/api/admin/orders',adminorderroute);

// const ratingroute = require("./routes/rating.routes");
// app.use('/api/ratings',ratingroute);

// const reviewroute = require('./routes/review.routes');
// app.use('/api/reviews',reviewroute);

app.get('/', (req, res) => {
    return res.status(200).send({ message: "all is well", status: true });
});


const PORT = 5200;



app.listen(PORT, async() => {
    console.log('Server running successfully on port', PORT);
});






// app.post('/checkout', async (req, res) => {
//     try {
//         const { token, email } = req.body;
//         console.log("Token received id is:", token.id); 
        
//         // Create a customer with the email and the token id
//         const customer = await stripe.customers.create({
//             email: email,
//             source: token.id // Attach the payment source to the customer
//         });

//         console.log("Customer created:", customer); 
        
//         // Charge the customer
//         const charge = await stripe.charges.create({
//             amount: 1000, // Change this to the actual amount you want to charge
//             description: "Test Purchase using Express and Node",
//             currency: "USD",
//             customer: customer.id
//         });

//         console.log("Charge created:", charge); // Log the created charge

//         res.json({ data: "SUCCESS" });
//     } catch (error) {
//         console.error("Error:", error); // Log any errors
//         res.status(500).json({ data: "FAILURE", error: error.message });
//     }
// });
// app.post('/checkout', async (req, res) => {
//     try {
//         const { token } = req.body;
//         console.log("Token received id is:", token.id); 
        
//         // Charge the customer
//         const charge = await stripe.charges.create({
//             amount: 1000, 
//             description: "Test Purchase using Express and Node",
//             currency: "USD",
//             source: token.id 
//         });

//         console.log("Charge created:", charge); // Log the created charge

//         res.json({ data: "SUCCESS" });
//     } catch (error) {
//         console.error("Error:", error); // Log any errors
//         res.status(500).json({ data: "FAILURE", error: error.message });
//     }
// });
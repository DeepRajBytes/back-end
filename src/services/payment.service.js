const stripe = require('stripe')("sk_test_51P312RSEbzC1lRyqBXyqG1PwSGJuQdbvVs6g5mAxrTyIhHSRUoodvc8fi6NmBNkzgKsQuq8sj6QaoHwwNcYpXBhO00FGUZhxqN");

async function paymentService(req) {
    try {
        const { token, email } = req.body;
        console.log("Token received:", token);

        const customer = await stripe.customers.create({
            email: email
        });

        console.log("Customer created:", customer);

        const charge = await stripe.charges.create({
            amount: 1000,
            description: "Test Purchase using Express and Node",
            currency: "USD",
            customer: customer.id,
            source: token.id
        });

        console.log("Charge created:", charge);
        return { data: "SUCCESS" };
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

module.exports = { paymentService };

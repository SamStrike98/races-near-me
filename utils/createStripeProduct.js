export async function createStripeProduct(name, cost) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const price = await stripe.prices.create({
        currency: 'gbp',
        unit_amount: cost,
        product_data: {
            name: name,
        },
    });

    return price;
}



export async function createStripeProduct(name, cost) {
    const stripe = require('stripe')('sk_test_51PqAtmGNoKoRZ0dlYHJUM4OvkEcxPBOpBiVoMXeBrHL9jx1UfuFbIoouDMl1NpVH1PJ6hVSTaHsjpjs9eFxLdGXc007vQRl3xy');

    const price = await stripe.prices.create({
        currency: 'gbp',
        unit_amount: cost,
        product_data: {
            name: name,
        },
    });

    return price;
}



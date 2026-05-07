import Stripe from 'stripe';
import 'dotenv/config';

console.log("Stripe import type:", typeof Stripe);
console.log("Stripe import:", Stripe);

try {
    const key = process.env.STRIPE_SECRET_KEY || "sk_test_dummy";
    console.log("Using key:", key ? "Key Present" : "Key Missing");
    
    const stripe = new Stripe(key);
    console.log("Stripe instance keys:", Object.keys(stripe));
    console.log("stripe.checkout exists?", !!stripe.checkout);
    console.log("stripe.checkout.sessions exists?", !!(stripe.checkout && stripe.checkout.sessions));
} catch (e) {
    console.error("Error initializing Stripe:", e);
}

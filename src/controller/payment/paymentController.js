import Stripe from "stripe";

const stripe = new Stripe("sk_test_51QaH7yG6jbOEPaM1zkbuYzokKusoqmPKldDWXQGJRd1QoPsSpJu6juUDAQkz3JDX8U0Vvbk89FeEfSkAQNRfw9ac00Zq3pVQkP");

/**
 * Crea un PaymentIntent en Stripe
 * 
 * @param {number} amount - Monto a cobrar en centavos.
 * @returns {Promise<Object>} - Retorna el PaymentIntent creado.
 * @throws {Error} - Lanza un error si no se puede crear el PaymentIntent.
 */
export const createPaymentIntent = async (amount) => {
  if (!amount) {
    throw new Error("El monto es requerido");
  }

  return await stripe.paymentIntents.create({
    amount, // en centavos (ejemplo: 10€ = 1000)
    currency: "eur",
    payment_method_types: ["card"], // Sólo permite tarjetas
  });
};

export default {
  createPaymentIntent,
};

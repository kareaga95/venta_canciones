import paymentController from "../../controller/payment/paymentController.js";

/**
 * API para manejar la creación de PaymentIntent.
 * 
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
export const createPaymentIntentApi = async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await paymentController.createPaymentIntent(amount);
    console.log("PaymentIntent creado:", paymentIntent.client_secret);
    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creando PaymentIntent:", error);
    res.status(500).send({ error: error.message });
  }
};


export default {
  createPaymentIntentApi,
};

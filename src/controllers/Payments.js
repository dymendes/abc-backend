import { Payment, MercadoPagoConfig } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';

class PaymentController {
    async create(req, res) {
        const client = new MercadoPagoConfig({ accessToken: 'TEST-320461010060425-051822-f1c2675a5d2d5f687837e9f88e17d38d-411772534' });

        const payment = new Payment(client);

        payment.create({
            body: { 
                transaction_amount: req.transaction_amount,
                token: req.token,
                description: req.description,
                installments: req.installments,
                payment_method_id: req.paymentMethodId,
                issuer_id: req.issuer,
                    payer: {
                    email: req.email,
                    identification: {
                type: req.identificationType,
                number: req.number
            }}},
            requestOptions: { idempotencyKey: uuidv4() }
        })
        .then(result => console.log(result))
        .catch(error => console.log(error)); 
    }
}

export default new PaymentController
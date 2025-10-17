import express from "express";
import { Resend } from "resend";
import cors from "cors";

const app = express();

// Vérification de la clé API
if (!process.env.RESEND_API_KEY) {
  console.error("❌ Erreur: RESEND_API_KEY manquante dans le fichier .env");
  console.error(
    "Assurez-vous que le fichier .env existe à la racine du projet avec:"
  );
  console.error("RESEND_API_KEY=re_votre_cle_api");
  process.exit(1);
}

const resend = new Resend(process.env.RESEND_API_KEY);
console.log("✅ Resend initialisé avec succès");

app.use(cors());
app.use(express.json());

app.post("/api/send-reservation", async (req, res) => {
  console.log("\n🔔 === NOUVELLE REQUÊTE DE RÉSERVATION ===");
  console.log("📅 Date/Heure:", new Date().toLocaleString("fr-FR"));
  console.log("📦 Données reçues:", JSON.stringify(req.body, null, 2));

  try {
    const { name, email, phone, guests, date, time, message } = req.body;

    // Validation des données
    if (!name || !email || !phone || !guests || !date || !time) {
      console.error("❌ Validation échouée - Champs manquants");
      return res
        .status(400)
        .json({ error: "Tous les champs obligatoires doivent être remplis" });
    }

    console.log("✅ Validation des données OK");

    // Email au restaurant
    console.log("📧 Envoi de l'email au restaurant...");
    const emailRestaurant = await resend.emails.send({
      from: "Le Seven Restaurant <noreply@leseven-grenoble.fr>",
      to: "restaurantleseven38@gmail.com",
      subject: `Nouvelle réservation - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #92C6C4, #F7C8C8); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .header h1 { color: white; margin: 0; font-size: 24px; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .info-row { display: flex; margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; }
              .info-label { font-weight: bold; color: #92C6C4; width: 150px; }
              .info-value { color: #4C4C4C; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📅 Nouvelle Réservation</h1>
              </div>
              <div class="content">
                <div class="info-row">
                  <span class="info-label">Nom :</span>
                  <span class="info-value">${name}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Email :</span>
                  <span class="info-value">${email}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Téléphone :</span>
                  <span class="info-value">${phone}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Nombre de personnes :</span>
                  <span class="info-value">${guests}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Date :</span>
                  <span class="info-value">${new Date(date).toLocaleDateString(
                    "fr-FR",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Heure :</span>
                  <span class="info-value">${time}</span>
                </div>
                ${
                  message
                    ? `
                  <div class="info-row">
                    <span class="info-label">Message :</span>
                    <span class="info-value">${message}</span>
                  </div>
                `
                    : ""
                }
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("✅ Email au restaurant envoyé !");
    console.log("   ID:", emailRestaurant.data?.id);

    // Email de confirmation au client
    console.log("📧 Envoi de l'email de confirmation au client...");
    const emailClient = await resend.emails.send({
      from: "Le Seven Restaurant <noreply@leseven-grenoble.fr>",
      to: email,
      subject: `Demande de réservation reçue - Le Seven`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #92C6C4, #F7C8C8); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .header h1 { color: white; margin: 0; font-size: 24px; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .greeting { font-size: 18px; margin-bottom: 20px; color: #4C4C4C; }
              .info-box { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #92C6C4; }
              .info-row { margin-bottom: 10px; }
              .info-label { font-weight: bold; color: #92C6C4; }
              .footer { text-align: center; margin-top: 30px; color: #777; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✅ Demande de réservation reçue</h1>
              </div>
              <div class="content">
                <p class="greeting">Bonjour ${name},</p>
                <p>Merci pour votre réservation au <strong>Seven</strong> !</p>
                <p>Nous avons bien reçu votre demande et vous contacterons très prochainement pour confirmer les détails.</p>
                
                <div class="info-box">
                  <h3 style="color: #92C6C4; margin-top: 0;">📋 Récapitulatif de votre réservation</h3>
                  <div class="info-row">
                    <span class="info-label">Date :</span> ${new Date(
                      date
                    ).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div class="info-row">
                    <span class="info-label">Heure :</span> ${time}
                  </div>
                  <div class="info-row">
                    <span class="info-label">Nombre de personnes :</span> ${guests}
                  </div>
                  ${
                    message
                      ? `
                    <div class="info-row">
                      <span class="info-label">Votre message :</span> ${message}
                    </div>
                  `
                      : ""
                  }
                </div>

                <p>Si vous avez des questions ou souhaitez modifier votre réservation, n'hésitez pas à nous contacter :</p>
                <p>📞 Téléphone : <strong>+33 9 53 46 81 28</strong><br>
                📧 Email : <strong>restaurantleseven38@gmail.com</strong></p>
                
                <p style="margin-top: 30px;">À très bientôt,<br><strong>L'équipe du Seven</strong></p>
              </div>
              <div class="footer">
                <p>Restaurant Le Seven - 2 Boulevard de l'Esplanade, 38000 Grenoble</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("✅ Email de confirmation au client envoyé !");
    console.log("   ID:", emailClient.data?.id);
    console.log("🎉 === RÉSERVATION TRAITÉE AVEC SUCCÈS ===\n");

    res.json({ success: true, message: "Emails envoyés avec succès" });
  } catch (error) {
    console.error("\n❌ === ERREUR LORS DE L'ENVOI DES EMAILS ===");
    console.error(
      "Type d'erreur:",
      error instanceof Error ? error.constructor.name : typeof error
    );
    console.error("Message:", error instanceof Error ? error.message : error);
    console.error("Stack:", error instanceof Error ? error.stack : "N/A");
    console.error("==============================================\n");

    res.status(500).json({
      error: "Erreur lors de l'envoi des emails",
      details: error instanceof Error ? error.message : "Erreur inconnue",
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Serveur API démarré sur le port ${PORT}`);
});

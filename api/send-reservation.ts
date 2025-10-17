import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Gérer CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Répondre aux requêtes OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Accepter uniquement POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

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
      from: "Le Seven Restaurant <onboarding@resend.dev>",
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
      from: "Le Seven Restaurant <onboarding@resend.dev>",
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
                <p>Nous avons bien reçu votre demande et nous vous contacterons très prochainement pour la confirmer.</p>
                
                <div class="info-box">
                  <h3 style="color: #92C6C4; margin-top: 0;">Récapitulatif de votre réservation</h3>
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
                </div>

                <p>En attendant, si vous avez des questions, n'hésitez pas à nous contacter :</p>
                <p style="margin-left: 20px;">
                  📞 <strong>+33 9 53 46 81 28</strong><br>
                  📧 <strong>restaurantleseven38@gmail.com</strong><br>
                  📍 2 Boulevard de l'Esplanade, 38000 Grenoble
                </p>

                <p style="margin-top: 30px;">À très bientôt au Seven ! 🌿</p>

                <div class="footer">
                  <p>Le Seven Restaurant - Grenoble</p>
                  <p>2 Boulevard de l'Esplanade, 38000 Grenoble</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("✅ Email de confirmation envoyé au client !");
    console.log("   ID:", emailClient.data?.id);

    console.log("🎉 === RÉSERVATION TRAITÉE AVEC SUCCÈS ===\n");

    return res.status(200).json({
      success: true,
      message: "Réservation envoyée avec succès",
    });
  } catch (error) {
    console.error("\n❌ === ERREUR LORS DE L'ENVOI ===");
    console.error(
      "Type d'erreur:",
      error instanceof Error ? error.constructor.name : typeof error
    );
    console.error("Message:", error instanceof Error ? error.message : error);
    console.error("Stack:", error instanceof Error ? error.stack : "N/A");

    return res.status(500).json({
      error: "Erreur lors de l'envoi de la réservation",
      details: error instanceof Error ? error.message : "Erreur inconnue",
    });
  }
}

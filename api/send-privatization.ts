import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

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

  console.log("\n🎉 === NOUVELLE DEMANDE DE PRIVATISATION ===");

  // Vérifier que la clé API existe
  if (!process.env.RESEND_API_KEY) {
    console.error(
      "❌ RESEND_API_KEY manquante dans les variables d'environnement"
    );
    return res.status(500).json({
      error: "Configuration serveur incorrecte",
      details: "RESEND_API_KEY manquante",
    });
  }

  console.log(
    "✅ RESEND_API_KEY détectée:",
    process.env.RESEND_API_KEY.substring(0, 10) + "..."
  );
  console.log("📅 Date/Heure:", new Date().toLocaleString("fr-FR"));
  console.log("📦 Données reçues:", JSON.stringify(req.body, null, 2));

  // Initialiser Resend avec la clé API
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { name, email, phone, eventType, guests, date, message } = req.body;

    // Validation des données
    if (
      !name ||
      !email ||
      !phone ||
      !eventType ||
      !guests ||
      !date ||
      !message
    ) {
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
      subject: `🎉 Demande de privatisation - ${eventType}`,
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
              .info-label { font-weight: bold; color: #92C6C4; width: 200px; }
              .info-value { color: #4C4C4C; }
              .message-box { background: white; padding: 20px; border-radius: 5px; margin-top: 15px; border-left: 4px solid #F7C8C8; }
              .highlight { background: #FFE5E5; padding: 2px 6px; border-radius: 3px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Nouvelle Demande de Privatisation</h1>
              </div>
              <div class="content">
                <div class="info-row">
                  <span class="info-label">Type d'événement :</span>
                  <span class="info-value"><span class="highlight">${eventType}</span></span>
                </div>
                <div class="info-row">
                  <span class="info-label">Nom du contact :</span>
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
                  <span class="info-label">Nombre d'invités :</span>
                  <span class="info-value"><strong>${guests} personnes</strong></span>
                </div>
                <div class="info-row">
                  <span class="info-label">Date souhaitée :</span>
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
                <div class="message-box">
                  <h3 style="color: #F7C8C8; margin-top: 0; margin-bottom: 10px;">💬 Détails de l'événement :</h3>
                  <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
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
      subject: `Demande de privatisation reçue - Le Seven`,
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
                <h1>✅ Demande de privatisation reçue</h1>
              </div>
              <div class="content">
                <p class="greeting">Bonjour ${name},</p>
                <p>Merci pour votre demande de privatisation au <strong>Seven</strong> ! 🎉</p>
                <p>Nous avons bien reçu votre projet et nous vous contacterons dans les <strong>24 à 48 heures</strong> pour discuter des détails et vous proposer une offre personnalisée.</p>
                
                <div class="info-box">
                  <h3 style="color: #92C6C4; margin-top: 0;">📋 Récapitulatif de votre demande</h3>
                  <div class="info-row">
                    <span class="info-label">Type d'événement :</span> ${eventType}
                  </div>
                  <div class="info-row">
                    <span class="info-label">Date souhaitée :</span> ${new Date(
                      date
                    ).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div class="info-row">
                    <span class="info-label">Nombre d'invités :</span> ${guests} personnes
                  </div>
                </div>

                <p>En attendant notre retour, n'hésitez pas à nous contacter si vous avez des questions :</p>
                <p style="margin-left: 20px;">
                  📞 <strong>+33 9 53 46 81 28</strong><br>
                  📧 <strong>restaurantleseven38@gmail.com</strong><br>
                  📍 2 Boulevard de l'Esplanade, 38000 Grenoble
                </p>

                <p style="margin-top: 30px;">Nous avons hâte de vous accompagner dans l'organisation de votre événement ! 🌿</p>
                <p><strong>L'équipe du Seven</strong></p>

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

    console.log("🎉 === DEMANDE DE PRIVATISATION TRAITÉE AVEC SUCCÈS ===\n");

    return res.status(200).json({
      success: true,
      message: "Demande de privatisation envoyée avec succès",
    });
  } catch (error) {
    console.error("\n❌ === ERREUR LORS DE L'ENVOI ===");
    console.error(
      "Type d'erreur:",
      error instanceof Error ? error.constructor.name : typeof error
    );
    console.error("Message:", error instanceof Error ? error.message : error);
    console.error("Stack:", error instanceof Error ? error.stack : "N/A");

    if (error && typeof error === "object" && "response" in error) {
      console.error("Réponse Resend:", JSON.stringify(error, null, 2));
    }

    return res.status(500).json({
      error: "Erreur lors de l'envoi de la demande",
      details: error instanceof Error ? error.message : "Erreur inconnue",
      debug:
        process.env.NODE_ENV === "development"
          ? {
              type:
                error instanceof Error ? error.constructor.name : typeof error,
              stack: error instanceof Error ? error.stack : undefined,
            }
          : undefined,
    });
  }
}

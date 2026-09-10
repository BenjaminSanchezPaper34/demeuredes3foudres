import type { ReactNode } from "react";
import type { Lang } from "@/lib/site";
import { SITE, adresseUneLigne } from "@/lib/site";
import { Section, Titre } from "@/components/Bloc";

/**
 * Pages légales.
 *
 * Les données société manquantes ne sont PAS inventées : elles sont marquées
 * « à compléter » et signalées au client (CLAUDE.md). Une mention légale
 * fausse est pire qu'une mention légale incomplète.
 */
const AC = "[à compléter par le client]";

function Bloc({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <section className="border-b border-sauge/40 py-8">
      <h2 className="font-display text-2xl">{titre}</h2>
      <div className="mesure mt-4 space-y-3 text-base leading-relaxed text-taupe">{children}</div>
    </section>
  );
}

export function MentionsLegales({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <Section classe="!pt-36 md:!pt-44">
      <Titre>{fr ? "Mentions légales" : "Legal notice"}</Titre>

      <div className="mt-10">
        <Bloc titre={fr ? "Éditeur du site" : "Site publisher"}>
          <p>
            {SITE.nom} — {adresseUneLigne}
          </p>
          <p>
            {fr ? "Forme juridique" : "Legal form"} : {AC}
            <br />
            {fr ? "Capital social" : "Share capital"} : {AC}
            <br />SIRET : {AC}
            <br />
            {fr ? "Numéro de TVA intracommunautaire" : "VAT number"} : {AC}
          </p>
          <p>
            {fr ? "Téléphone" : "Phone"} : {SITE.telephoneAffiche}
            <br />
            {fr ? "Courriel" : "Email"} : {SITE.email}
          </p>
          <p>
            {fr ? "Directeur de la publication" : "Publication director"} : {AC}
          </p>
        </Bloc>

        <Bloc titre={fr ? "Hébergement" : "Hosting"}>
          <p>
            Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, {fr ? "États-Unis" : "United States"}
            {" — "}
            <a href="https://vercel.com" className="lien text-lie" target="_blank" rel="noopener noreferrer">
              vercel.com
            </a>
          </p>
        </Bloc>

        <Bloc titre={fr ? "Conception et réalisation" : "Design and development"}>
          <p>
            Paper34 —{" "}
            <a href="https://paper34.fr" className="lien text-lie" target="_blank" rel="noopener noreferrer">
              paper34.fr
            </a>
          </p>
        </Bloc>

        <Bloc titre={fr ? "Propriété intellectuelle" : "Intellectual property"}>
          <p>
            {fr
              ? "L'ensemble des contenus de ce site — textes, photographies, mise en page — est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable."
              : "All content on this site — text, photographs, layout — is protected by copyright. Any reproduction, even partial, is prohibited without prior written permission."}
          </p>
        </Bloc>

        <Bloc titre={fr ? "Médiation de la consommation" : "Consumer mediation"}>
          <p>
            {fr
              ? "Conformément à l'article L. 612-1 du code de la consommation, le client peut recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d'un litige."
              : "In accordance with French consumer law, guests may refer a dispute free of charge to a consumer mediator for amicable resolution."}
            {" "}
            {fr ? "Médiateur désigné" : "Appointed mediator"} : {AC}
          </p>
        </Bloc>
      </div>
    </Section>
  );
}

export function Confidentialite({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <Section classe="!pt-36 md:!pt-44">
      <Titre>{fr ? "Confidentialité et données personnelles" : "Privacy and personal data"}</Titre>

      <div className="mt-10">
        <Bloc titre={fr ? "Responsable du traitement" : "Data controller"}>
          <p>
            {SITE.nom}, {adresseUneLigne} — {SITE.email}
          </p>
        </Bloc>

        <Bloc titre={fr ? "Données collectées et finalités" : "Data collected and purposes"}>
          <p>
            {fr
              ? "Formulaire de contact : nom, adresse électronique, téléphone facultatif et contenu du message. Ces données servent uniquement à répondre à votre demande. Base légale : votre consentement, matérialisé par l'envoi du formulaire. Conservation : trois ans à compter du dernier échange."
              : "Contact form: name, email address, optional phone number and message content. This data is used solely to answer your enquiry. Legal basis: your consent, given by submitting the form. Retention: three years from the last exchange."}
          </p>
          <p>
            {fr
              ? "Réservation : lorsque vous ouvrez le calendrier de réservation, celui-ci est fourni par Smoobu GmbH, qui traite les données que vous y saisissez pour créer et gérer votre réservation."
              : "Booking: when you open the booking calendar, it is provided by Smoobu GmbH, which processes the data you enter there to create and manage your reservation."}
          </p>
        </Bloc>

        <Bloc titre={fr ? "Destinataires et sous-traitants" : "Recipients and processors"}>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              {fr
                ? "Vercel Inc. — hébergement du site et mesure d'audience sans cookie."
                : "Vercel Inc. — site hosting and cookieless audience measurement."}
            </li>
            <li>
              {fr
                ? "Resend — acheminement des messages du formulaire de contact."
                : "Resend — delivery of contact form messages."}
            </li>
            <li>
              {fr
                ? "Smoobu GmbH — moteur de réservation, chargé uniquement lorsque vous l'ouvrez."
                : "Smoobu GmbH — booking engine, loaded only when you open it."}
            </li>
            <li>
              {fr
                ? "La conciergerie qui gère les réservations pour le compte de la maison."
                : "The concierge service managing bookings on behalf of the house."}
            </li>
          </ul>
        </Bloc>

        <Bloc titre={fr ? "Cookies et traceurs" : "Cookies and trackers"}>
          <p>
            {fr
              ? "Ce site n'utilise aucun cookie publicitaire ni aucun traceur à des fins de suivi comportemental. La mesure d'audience est assurée par Vercel Web Analytics, qui ne dépose pas de cookie et ne permet pas d'identifier un visiteur : elle est exemptée de consentement."
              : "This site uses no advertising cookies and no behavioural tracking. Audience measurement is provided by Vercel Web Analytics, which sets no cookie and cannot identify a visitor: it is exempt from consent requirements."}
          </p>
          <p>
            {fr
              ? "Les polices de caractères sont hébergées sur nos propres serveurs : aucune requête n'est adressée à un service tiers pour les afficher."
              : "Fonts are hosted on our own servers: no request is made to a third-party service to display them."}
          </p>
          <p>
            {fr
              ? "Le calendrier de réservation Smoobu n'est chargé qu'au moment où vous l'ouvrez. Tant que vous ne cliquez pas sur « Voir les disponibilités », aucune requête n'est adressée à Smoobu."
              : "The Smoobu booking calendar is loaded only when you open it. Until you click “Check availability”, no request is sent to Smoobu."}
          </p>
        </Bloc>

        <Bloc titre={fr ? "Vos droits" : "Your rights"}>
          <p>
            {fr
              ? "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition sur vos données. Pour l'exercer, écrivez à "
              : "You have the right to access, rectify, erase, restrict and object to the processing of your data. To exercise it, write to "}
            <a href={`mailto:${SITE.email}`} className="lien text-lie">
              {SITE.email}
            </a>
            {fr
              ? ". Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr)."
              : ". You may also lodge a complaint with the French data protection authority, the CNIL (cnil.fr)."}
          </p>
        </Bloc>
      </div>
    </Section>
  );
}

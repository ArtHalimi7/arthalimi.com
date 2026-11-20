import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/*
 * German law requires a full Impressum and a privacy policy on a business website.
 * Fill every [bracketed] field before this goes live. This text is a starting point, not legal advice.
 */

const Section = ({ title, children }) => (
  <section className="mt-10">
    <h2 className="text-[20px] font-semibold tracking-[-0.02em]">{title}</h2>
    <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink-300">{children}</div>
  </section>
);

function Shell({ title, children }) {
  return (
    <main className="wrap max-w-[860px] pb-24 pt-36">
      <Link to="/" className="inline-flex items-center gap-2 font-mono text-[12px] text-ink-300 hover:text-paper">
        <ArrowLeft className="h-4 w-4" /> arthalimi.com
      </Link>
      <h1 className="mt-8 text-h2 font-semibold">{title}</h1>
      {children}
    </main>
  );
}

export function Impressum() {
  return (
    <Shell title="Impressum">
      <Section title="Angaben gemäß § 5 DDG">
        <p data-nosnippet="">
          Art Halimi<br />
          Art Halimi Studio<br />
          [Straße und Hausnummer]<br />
          45879 Gelsenkirchen<br />
          Deutschland
        </p>
      </Section>
      <Section title="Kontakt">
        <p>
          E-Mail: <a className="text-paper underline underline-offset-4" href="mailto:hello@arthalimi.com">hello@arthalimi.com</a><br />
          Telefon: <a className="text-paper underline underline-offset-4" href="tel:">[Telefonnummer]</a>
        </p>
      </Section>
      <Section title="Umsatzsteuer">
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE[USt-IdNr]</p>
      </Section>
      <Section title="Verbraucherstreitbeilegung">
        <p>Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </Section>
    </Shell>
  );
}

export function Datenschutz() {
  return (
    <Shell title="Datenschutz">
      <Section title="Verantwortlicher">
        <p>Art Halimi, Anschrift siehe <Link to="/impressum" className="text-paper underline underline-offset-4">Impressum</Link>, hello@arthalimi.com</p>
      </Section>
      <Section title="Hosting">
        <p>Diese Website wird bei Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, USA gehostet. Beim Aufruf verarbeitet Netlify technisch notwendige Daten (z. B. IP-Adresse, Datum und Uhrzeit, aufgerufene Seite) in Server-Logfiles. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (sicherer und stabiler Betrieb).</p>
        <p>Dabei können Daten in die USA übermittelt werden. Netlify ist nach dem EU-US Data Privacy Framework zertifiziert; die Übermittlung stützt sich auf den Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO).</p>
      </Section>
      <Section title="Keine Cookies, kein Tracking">
        <p>Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Dienste. Die gewählte Sprache wird nur lokal in Ihrem Browser gespeichert. Schriftarten werden von dieser Website selbst ausgeliefert, nicht von Google.</p>
      </Section>
      <Section title="Kontaktformular">
        <p>Wenn Sie das Kontaktformular nutzen, werden Ihre Angaben (Name, E-Mail, Unternehmen, Nachricht) über den Dienst FormSubmit (formsubmit.co) per E-Mail an mich übermittelt, um Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Die Daten werden gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind.</p>
      </Section>
      <Section title="Ihre Rechte">
        <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Schreiben Sie dazu an hello@arthalimi.com.</p>
      </Section>
    </Shell>
  );
}

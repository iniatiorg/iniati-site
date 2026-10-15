import { useEffect, useState } from "react";

type LegalKind = "privacy" | "terms";

const logoUrl = "/iniati-logo.webp";

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const isPrivacy = kind === "privacy";

  useEffect(() => {
    const saved = localStorage.getItem("iniati-theme");
    const next = saved === "dark" || saved === "light"
      ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const frame = window.requestAnimationFrame(() => setTheme(next));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("iniati-theme", next);
  };

  return (
    <main>
      <nav className="navbar fixed-top site-nav" aria-label="Navegação principal">
        <div className="container-xxl px-3 px-lg-4 d-flex align-items-center justify-content-between">
          <a className="navbar-brand brand-link" href="/" aria-label="INIATI — início">
            <img className="brand-logo" src={logoUrl} alt="INIATI" width="220" height="66" />
            <span className="brand-name d-none d-sm-block">Instituto Nacional de Inovação Aplicada<br />em Tecnologia da Informação</span>
          </a>
          <div className="d-flex align-items-center gap-3">
            <a className="legal-home-link" href="/">Início <span aria-hidden="true">↗</span></a>
            <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Ativar modo ${theme === "light" ? "escuro" : "claro"}`} title={`Ativar modo ${theme === "light" ? "escuro" : "claro"}`}>
              <span className="theme-toggle-track" aria-hidden="true"><span className="theme-toggle-icon">{theme === "light" ? "☀" : "☾"}</span></span>
            </button>
          </div>
        </div>
      </nav>

      <article className="legal-page">
        <header className="legal-header">
          <div className="container-xxl px-3 px-lg-4">
            <div className="section-label">INIATI / Institucional</div>
            <h1>{isPrivacy ? "Política de Privacidade" : "Termos de Uso"}</h1>
            <p>{isPrivacy
              ? "Como tratamos os dados pessoais relacionados ao uso deste site e às mensagens enviadas ao Instituto."
              : "Condições para acessar e utilizar o site institucional do INIATI."}</p>
            <small>Atualizado em 14 de outubro de 2026</small>
          </div>
        </header>

        <div className="container-xxl px-3 px-lg-4 legal-layout">
          <div className="legal-content">
            {isPrivacy ? <PrivacyContent /> : <TermsContent />}
          </div>
        </div>
      </article>

      <footer className="site-footer legal-footer">
        <div className="container-xxl px-3 px-lg-4">
          <a className="footer-brand" href="/"><img className="brand-logo" src={logoUrl} alt="INIATI" width="220" height="66" loading="lazy" /></a>
          <p>Instituto Nacional de Inovação Aplicada em Tecnologia da Informação.</p>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} INIATI</span>
            <div className="footer-legal"><a href="/politica-de-privacidade/" aria-current={isPrivacy ? "page" : undefined}>Política de Privacidade</a><a href="/termos-de-uso/" aria-current={isPrivacy ? undefined : "page"}>Termos de Uso</a></div>
            <a href="/">Voltar ao início ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function PrivacyContent() {
  return (
    <>
      <section>
        <h2>1. Quem é responsável pelos dados</h2>
        <p>O INIATI — Instituto Nacional de Inovação Aplicada em Tecnologia da Informação — é responsável pelas decisões sobre o tratamento dos dados pessoais recebidos por meio deste site. Para dúvidas ou solicitações relacionadas à privacidade, escreva para <a href="mailto:contato@iniati.org.br">contato@iniati.org.br</a>.</p>
      </section>
      <section>
        <h2>2. Dados que tratamos e para quê</h2>
        <p>Nos formulários de contato e de oportunidades, você pode informar nome, e-mail, empresa, telefone, área de interesse, link de portfólio e conteúdo da mensagem, conforme o formulário utilizado. Usamos essas informações para responder à solicitação, conversar sobre projetos ou avaliar seu interesse em trabalhar conosco.</p>
        <p>Os formulários preparam uma mensagem no seu aplicativo de e-mail. O site não armazena os campos em um banco de dados próprio; o envio só acontece quando você confirma a mensagem no aplicativo. Depois do envio, a mensagem passa pelos serviços de e-mail envolvidos e pode ser tratada pelo INIATI para dar continuidade ao contato.</p>
      </section>
      <section>
        <h2>3. Navegação, cookies e serviços externos</h2>
        <p>O site utiliza Google Analytics para obter estatísticas de acesso. Esse serviço pode coletar dados de navegação, informações técnicas do dispositivo e identificadores por meio de cookies ou tecnologias semelhantes. O carregamento das fontes do Google e a hospedagem no GitHub Pages também podem envolver o processamento de dados técnicos, como endereço IP, pelos respectivos provedores.</p>
        <p>A preferência de tema claro ou escuro é guardada no armazenamento local do navegador. Você pode gerenciar ou apagar cookies e dados locais nas configurações do navegador. A desativação de cookies pode limitar as estatísticas, sem impedir a leitura do conteúdo institucional.</p>
      </section>
      <section>
        <h2>4. Bases legais e compartilhamento</h2>
        <p>O tratamento dos dados enviados por você observa as hipóteses aplicáveis da Lei Geral de Proteção de Dados Pessoais (LGPD, Lei nº 13.709/2018), conforme a finalidade do contato, inclusive o consentimento manifestado no formulário quando aplicável. Dados podem ser compartilhados com provedores necessários à hospedagem, à medição de acesso e à comunicação por e-mail, dentro das finalidades descritas nesta política.</p>
      </section>
      <section>
        <h2>5. Conservação e segurança</h2>
        <p>As mensagens recebidas são conservadas pelo tempo necessário para atender à solicitação e cumprir obrigações legais ou resguardar direitos, quando cabível. Adotamos medidas razoáveis para limitar o acesso às informações e protegê-las durante seu tratamento.</p>
      </section>
      <section>
        <h2>6. Seus direitos</h2>
        <p>Nos termos da LGPD, você pode solicitar, conforme o caso, confirmação do tratamento, acesso, correção, anonimização, bloqueio ou eliminação de dados, informações sobre compartilhamento e revogação do consentimento. Envie seu pedido a <a href="mailto:contato@iniati.org.br">contato@iniati.org.br</a>. Poderemos pedir informações para confirmar sua identidade antes de responder.</p>
      </section>
      <section>
        <h2>7. Atualizações</h2>
        <p>Esta política pode ser atualizada para refletir mudanças no site, nos serviços utilizados ou nas regras aplicáveis. A data de atualização aparece no início da página.</p>
      </section>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <section>
        <h2>1. Sobre o site</h2>
        <p>Este site apresenta o INIATI, suas áreas de atuação, iniciativas e meios de contato. Ao acessá-lo, você concorda em utilizá-lo de forma lícita e respeitar estes termos.</p>
      </section>
      <section>
        <h2>2. Uso do conteúdo</h2>
        <p>Textos, elementos visuais, marcas e demais materiais do site pertencem ao INIATI ou aos respectivos titulares. Você pode consultar e compartilhar links para as páginas públicas, desde que preserve a identificação da fonte. A reprodução ou exploração comercial de conteúdo depende de autorização do titular dos direitos.</p>
      </section>
      <section>
        <h2>3. Informações e disponibilidade</h2>
        <p>O conteúdo tem finalidade institucional e informativa. O INIATI procura mantê-lo correto e atualizado, mas informações sobre projetos, serviços e legislação podem mudar. O acesso ao site pode ser interrompido para manutenção ou por fatores fora do nosso controle.</p>
      </section>
      <section>
        <h2>4. Links e contato</h2>
        <p>O site pode conter links para serviços de terceiros, sujeitos às próprias regras e políticas. O uso dos formulários prepara uma mensagem no seu aplicativo de e-mail; o envio depende da sua confirmação nesse aplicativo. Uma mensagem enviada não constitui contratação ou compromisso de resposta em prazo específico.</p>
      </section>
      <section>
        <h2>5. Dados pessoais</h2>
        <p>O tratamento de dados pessoais relacionados ao site segue a <a href="/politica-de-privacidade/">Política de Privacidade</a> e a Lei Geral de Proteção de Dados Pessoais (LGPD, Lei nº 13.709/2018).</p>
      </section>
      <section>
        <h2>6. Alterações e contato</h2>
        <p>Estes termos podem ser atualizados quando necessário; a data da versão vigente aparece no início da página. Para dúvidas sobre o uso do site, escreva para <a href="mailto:contato@iniati.org.br">contato@iniati.org.br</a>.</p>
      </section>
    </>
  );
}

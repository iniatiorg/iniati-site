"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const areas = [
  {
    number: "01",
    title: "Pesquisa aplicada",
    text: "Investigação orientada a desafios reais, com método científico e visão de aplicação desde o primeiro ciclo.",
    tags: ["Pesquisa", "Experimentação", "Validação"],
  },
  {
    number: "02",
    title: "Engenharia de produto",
    text: "Software, dados e inteligência artificial transformados em protótipos, produtos digitais e processos escaláveis.",
    tags: ["Software", "Dados", "IA"],
  },
  {
    number: "03",
    title: "Gestão de PD&I",
    text: "Estruturação e execução de projetos de pesquisa, desenvolvimento e inovação com governança e rastreabilidade.",
    tags: ["Estratégia", "Governança", "Impacto"],
  },
  {
    number: "04",
    title: "Incentivos à inovação",
    text: "Apoio técnico para transformar oportunidades da Lei da Informática e da Lei do Bem em programas consistentes.",
    tags: ["Lei da Informática", "Lei do Bem"],
  },
];

const values = [
  ["Ciência com propósito", "Conhecimento só faz sentido quando melhora decisões, produtos e a vida das pessoas."],
  ["Integridade", "Transparência, responsabilidade e rigor técnico em cada etapa do trabalho."],
  ["Colaboração", "Times multidisciplinares e relações de confiança constroem soluções mais fortes."],
  ["Impacto real", "A inovação é medida pela capacidade de sair do papel e gerar valor sustentável."],
  ["Excelência prática", "Qualidade científica com ritmo, clareza e compromisso com a execução."],
  ["Pessoas no centro", "Tecnologia deve ampliar capacidades humanas e criar futuros mais inclusivos."],
];

const steps = [
  ["01", "Entender", "Mapeamos o desafio, o contexto e o resultado que realmente importa."],
  ["02", "Investigar", "Combinamos evidências, experimentação e conhecimento multidisciplinar."],
  ["03", "Construir", "Criamos e validamos protótipos com ciclos curtos de aprendizagem."],
  ["04", "Transferir", "Levamos a tecnologia para a operação com documentação e continuidade."],
];

function composeMailto(form: HTMLFormElement, kind: "contact" | "career") {
  const data = new FormData(form);
  const lines = Array.from(data.entries())
    .filter(([key]) => key !== "privacy")
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join("\n");
  const subject = kind === "career"
    ? `Interesse em trabalhar no INIATI — ${data.get("Área de interesse") || "Candidatura"}`
    : `Nova conversa pelo site — ${data.get("Assunto") || "Projeto de inovação"}`;

  return `mailto:contato@iniati.org.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sentForm, setSentForm] = useState<"contact" | "career" | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("iniati-theme");
    const initial = saved === "dark" || saved === "light"
      ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-bs-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-bs-theme", next);
    localStorage.setItem("iniati-theme", next);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>, kind: "contact" | "career") => {
    event.preventDefault();
    setSentForm(kind);
    window.location.href = composeMailto(event.currentTarget, kind);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <nav className="navbar navbar-expand-xl fixed-top site-nav" aria-label="Navegação principal">
        <div className="container-xxl px-3 px-lg-4">
          <a className="navbar-brand brand-link" href="#inicio" onClick={closeMenu} aria-label="INIATI — início">
            <Image className="brand-logo" src="/iniati-logo.webp" alt="INIATI" width={220} height={66} priority />
            <span className="brand-name d-none d-sm-block">Instituto Nacional de Inovação Aplicada<br />à Tecnologia da Informação</span>
          </a>

          <div className="d-flex align-items-center gap-2 order-xl-3">
            <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Ativar modo ${theme === "light" ? "escuro" : "claro"}`} title={`Ativar modo ${theme === "light" ? "escuro" : "claro"}`}>
              <span className="theme-toggle-track" aria-hidden="true">
                <span className="theme-toggle-icon">{theme === "light" ? "☀" : "☾"}</span>
              </span>
            </button>
            <a href="#trabalhe" className="btn btn-primary btn-sm d-none d-md-inline-flex" onClick={closeMenu}>Trabalhe conosco</a>
            <button className="navbar-toggler" type="button" aria-controls="mainMenu" aria-expanded={menuOpen} aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="menu-lines" aria-hidden="true"><span /><span /></span>
            </button>
          </div>

          <div className={`collapse navbar-collapse order-xl-2 ${menuOpen ? "show" : ""}`} id="mainMenu">
            <ul className="navbar-nav ms-auto me-xl-3 align-items-xl-center">
              <li className="nav-item"><a className="nav-link" href="#instituto" onClick={closeMenu}>O Instituto</a></li>
              <li className="nav-item"><a className="nav-link" href="#atuacao" onClick={closeMenu}>Atuação</a></li>
              <li className="nav-item"><a className="nav-link" href="#metodo" onClick={closeMenu}>Como fazemos</a></li>
              <li className="nav-item"><a className="nav-link" href="#valores" onClick={closeMenu}>Valores</a></li>
              <li className="nav-item"><a className="nav-link" href="#clientes" onClick={closeMenu}>Clientes</a></li>
              <li className="nav-item"><a className="nav-link" href="#contato" onClick={closeMenu}>Contato</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <section id="inicio" className="hero-section section-anchor">
        <div className="container-xxl px-3 px-lg-4 position-relative">
          <div className="row align-items-center min-vh-100 py-5">
            <div className="col-lg-7 hero-copy py-5">
              <div className="eyebrow"><span /> Instituto de Ciência e Tecnologia</div>
              <h1>Pesquisa que vira <em>tecnologia.</em> Tecnologia que gera impacto.</h1>
              <p className="hero-lead">Conectamos ciência, engenharia e negócios para transformar desafios complexos em soluções de PD&I aplicadas — prontas para criar valor no Brasil.</p>
              <div className="d-flex flex-column flex-sm-row gap-3 mt-4 mt-lg-5">
                <a href="#contato" className="btn btn-primary btn-lg">Desenvolva conosco <span aria-hidden="true">↗</span></a>
                <a href="#atuacao" className="btn btn-outline-primary btn-lg">Conheça nossa atuação <span aria-hidden="true">↓</span></a>
              </div>
              <div className="hero-index mt-5" aria-label="Áreas de identidade institucional">
                <span>ICT</span><i /><span>PD&amp;I</span><i /><span>Brasil</span>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block" aria-hidden="true">
              <div className="innovation-orbit">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="orbit-core"><span>ideia</span><strong>impacto</strong></div>
                <div className="orbit-dot dot-one" />
                <div className="orbit-dot dot-two" />
                <div className="orbit-dot dot-three" />
                <div className="partner-note"><small>CONHECIMENTO EM MOVIMENTO</small><b>ciência · tecnologia · mercado</b></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-bottom-line" />
      </section>

      <section id="instituto" className="section-pad section-anchor">
        <div className="container-xxl px-3 px-lg-4">
          <div className="row g-5 align-items-start">
            <div className="col-lg-5">
              <div className="section-label">O INIATI</div>
              <h2 className="display-title">Onde conhecimento ganha direção.</h2>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <p className="lead-copy">Somos um Instituto de Ciência e Tecnologia localizado no Centro-Oeste brasileiro. Atuamos na execução de projetos de pesquisa, desenvolvimento e inovação tecnológica, aproximando competências científicas dos desafios das empresas.</p>
              <p className="body-copy">Nosso papel é criar pontes: entre a hipótese e a evidência, entre o laboratório e a operação, entre o investimento em inovação e o resultado percebido por pessoas e organizações.</p>
              <div className="row g-3 mt-4">
                <div className="col-sm-6"><div className="fact-card"><span>MISSÃO</span><strong>Transformar conhecimento em inovação aplicada.</strong></div></div>
                <div className="col-sm-6"><div className="fact-card"><span>VISÃO</span><strong>Ser uma referência brasileira em PD&amp;I que gera valor real.</strong></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="atuacao" className="section-pad surface-section section-anchor">
        <div className="container-xxl px-3 px-lg-4">
          <div className="row align-items-end mb-5">
            <div className="col-lg-7">
              <div className="section-label">Nossa atuação</div>
              <h2 className="display-title mb-0">Da pergunta certa à solução em uso.</h2>
            </div>
            <div className="col-lg-4 offset-lg-1 mt-3 mt-lg-0"><p className="body-copy mb-0">Competências que se combinam de acordo com a maturidade, o setor e o objetivo de cada projeto.</p></div>
          </div>
          <div className="row g-3 g-lg-4">
            {areas.map((area) => (
              <div className="col-md-6" key={area.number}>
                <article className="expertise-card h-100">
                  <div className="expertise-top"><span>{area.number}</span><i aria-hidden="true">↗</i></div>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                  <div className="tag-list">{area.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="metodo" className="section-pad method-section section-anchor">
        <div className="container-xxl px-3 px-lg-4">
          <div className="row mb-5">
            <div className="col-lg-5"><div className="section-label light-label">Como fazemos</div><h2 className="display-title text-white">Um caminho claro para inovar.</h2></div>
            <div className="col-lg-5 offset-lg-2 d-flex align-items-end"><p className="method-intro">Integramos rigor científico e agilidade de execução em uma jornada adaptada à realidade do parceiro.</p></div>
          </div>
          <div className="row g-0 method-grid">
            {steps.map(([number, title, text]) => (
              <div className="col-md-6 col-xl-3" key={number}>
                <article className="method-step h-100">
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="valores" className="section-pad section-anchor">
        <div className="container-xxl px-3 px-lg-4">
          <div className="row align-items-end mb-5">
            <div className="col-lg-7"><div className="section-label">Nossos valores</div><h2 className="display-title mb-0">O jeito INIATI de transformar.</h2></div>
            <div className="col-lg-4 offset-lg-1 mt-3 mt-lg-0"><p className="body-copy mb-0">Princípios que orientam as escolhas, as parcerias e a qualidade de tudo o que construímos.</p></div>
          </div>
          <div className="row g-0 values-grid">
            {values.map(([title, text], index) => (
              <div className="col-md-6 col-lg-4" key={title}>
                <article className="value-item h-100"><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="clientes" className="section-pad client-section section-anchor">
        <div className="container-xxl px-3 px-lg-4">
          <div className="client-panel">
            <div className="row align-items-center g-4 g-lg-5">
              <div className="col-lg-4">
                <div className="section-label light-label">Clientes e parceiros</div>
                <h2>Inovação se faz em parceria.</h2>
              </div>
              <div className="col-lg-5">
                <p>Trabalhamos lado a lado com empresas que querem transformar conhecimento em soluções relevantes. A LMG Lasers integra esse ecossistema de colaboração e inovação aplicada.</p>
              </div>
              <div className="col-lg-3 text-lg-end">
                <a href="https://www.lmg.com.br/" target="_blank" rel="noreferrer" className="client-link" aria-label="Visitar site da LMG Lasers">
                  <small>CLIENTE EM DESTAQUE</small><strong>LMG <span>Lasers</span></strong><i aria-hidden="true">↗</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="trabalhe" className="section-pad careers-section section-anchor">
        <div className="container-xxl px-3 px-lg-4">
          <div className="row g-5">
            <div className="col-lg-5">
              <div className="section-label">Trabalhe conosco</div>
              <h2 className="display-title">Boas perguntas precisam de boas pessoas.</h2>
              <p className="lead-copy">Quer fazer ciência aplicada, construir tecnologia e aprender com desafios reais? Conte para nós onde você quer gerar impacto.</p>
              <div className="career-note"><span>O que valorizamos</span><p>Curiosidade, pensamento crítico, colaboração, autonomia e vontade de transformar conhecimento em resultado.</p></div>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <form className="site-form" onSubmit={(event) => submitForm(event, "career")}>
                <div className="row g-3">
                  <div className="col-md-6"><label className="form-label" htmlFor="career-name">Nome completo</label><input className="form-control" id="career-name" name="Nome" type="text" autoComplete="name" required /></div>
                  <div className="col-md-6"><label className="form-label" htmlFor="career-email">E-mail</label><input className="form-control" id="career-email" name="E-mail" type="email" autoComplete="email" required /></div>
                  <div className="col-12"><label className="form-label" htmlFor="career-area">Área de interesse</label><select className="form-select" id="career-area" name="Área de interesse" required defaultValue=""><option value="" disabled>Selecione uma área</option><option>Pesquisa e inovação</option><option>Engenharia de software</option><option>Dados e inteligência artificial</option><option>Gestão de projetos</option><option>Administrativo e operações</option><option>Outra área</option></select></div>
                  <div className="col-12"><label className="form-label" htmlFor="career-link">LinkedIn ou portfólio <span>(opcional)</span></label><input className="form-control" id="career-link" name="LinkedIn ou portfólio" type="url" placeholder="https://" /></div>
                  <div className="col-12"><label className="form-label" htmlFor="career-message">Por que você quer construir com o INIATI?</label><textarea className="form-control" id="career-message" name="Mensagem" rows={5} required /></div>
                  <div className="col-12"><div className="form-check"><input className="form-check-input" type="checkbox" id="career-privacy" name="privacy" required /><label className="form-check-label" htmlFor="career-privacy">Autorizo o uso destes dados para retorno sobre oportunidades.</label></div></div>
                  <div className="col-12 d-flex flex-column flex-sm-row align-items-sm-center gap-3"><button className="btn btn-primary btn-lg" type="submit">Apresentar meu interesse <span aria-hidden="true">↗</span></button><small className="form-help">O envio abre seu aplicativo de e-mail.</small></div>
                  {sentForm === "career" && <div className="col-12"><p className="form-status" role="status">Sua mensagem foi preparada. Revise e envie pelo seu aplicativo de e-mail.</p></div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="section-pad contact-section section-anchor">
        <div className="container-xxl px-3 px-lg-4">
          <div className="row g-5 align-items-start">
            <div className="col-lg-5">
              <div className="section-label light-label">Vamos conversar</div>
              <h2 className="display-title text-white">Qual desafio podemos transformar juntos?</h2>
              <p className="contact-copy">Conte um pouco sobre a sua empresa, ideia ou projeto. Nossa equipe entra em contato para entender os próximos passos.</p>
              <a className="contact-email" href="mailto:contato@iniati.org.br">contato@iniati.org.br <span aria-hidden="true">↗</span></a>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <form className="site-form contact-form" onSubmit={(event) => submitForm(event, "contact")}>
                <div className="row g-3">
                  <div className="col-md-6"><label className="form-label" htmlFor="contact-name">Nome</label><input className="form-control" id="contact-name" name="Nome" type="text" autoComplete="name" required /></div>
                  <div className="col-md-6"><label className="form-label" htmlFor="contact-company">Empresa</label><input className="form-control" id="contact-company" name="Empresa" type="text" autoComplete="organization" required /></div>
                  <div className="col-md-7"><label className="form-label" htmlFor="contact-email">E-mail corporativo</label><input className="form-control" id="contact-email" name="E-mail" type="email" autoComplete="email" required /></div>
                  <div className="col-md-5"><label className="form-label" htmlFor="contact-phone">Telefone <span>(opcional)</span></label><input className="form-control" id="contact-phone" name="Telefone" type="tel" autoComplete="tel" /></div>
                  <div className="col-12"><label className="form-label" htmlFor="contact-subject">Assunto</label><select className="form-select" id="contact-subject" name="Assunto" required defaultValue=""><option value="" disabled>Como podemos ajudar?</option><option>Projeto de pesquisa e desenvolvimento</option><option>Engenharia de produto e software</option><option>Lei da Informática</option><option>Lei do Bem</option><option>Parceria institucional</option><option>Outro assunto</option></select></div>
                  <div className="col-12"><label className="form-label" htmlFor="contact-message">Conte sobre o desafio</label><textarea className="form-control" id="contact-message" name="Mensagem" rows={5} required /></div>
                  <div className="col-12"><div className="form-check"><input className="form-check-input" type="checkbox" id="contact-privacy" name="privacy" required /><label className="form-check-label" htmlFor="contact-privacy">Concordo em receber contato do INIATI sobre esta solicitação.</label></div></div>
                  <div className="col-12 d-flex flex-column flex-sm-row align-items-sm-center gap-3"><button className="btn btn-light btn-lg" type="submit">Enviar mensagem <span aria-hidden="true">↗</span></button><small className="form-help">O envio abre seu aplicativo de e-mail.</small></div>
                  {sentForm === "contact" && <div className="col-12"><p className="form-status" role="status">Sua mensagem foi preparada. Revise e envie pelo seu aplicativo de e-mail.</p></div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container-xxl px-3 px-lg-4">
          <div className="row g-4 align-items-start">
            <div className="col-lg-5"><a className="footer-brand" href="#inicio"><Image className="brand-logo" src="/iniati-logo.webp" alt="INIATI" width={220} height={66} /></a><p>Instituto Nacional de Inovação Aplicada à Tecnologia da Informação.</p></div>
            <div className="col-6 col-lg-2 offset-lg-1"><h3>Navegue</h3><a href="#instituto">O Instituto</a><a href="#atuacao">Atuação</a><a href="#valores">Valores</a><a href="#clientes">Clientes</a></div>
            <div className="col-6 col-lg-2"><h3>Conecte-se</h3><a href="#contato">Fale conosco</a><a href="#trabalhe">Trabalhe conosco</a><a href="mailto:contato@iniati.org.br">E-mail</a></div>
            <div className="col-lg-2"><h3>Atuação</h3><p>Centro-Oeste<br />Brasil</p></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} INIATI</span><span>Ciência aplicada. Impacto real.</span><a href="#inicio">Voltar ao topo ↑</a></div>
        </div>
      </footer>
    </main>
  );
}

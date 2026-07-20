# Site institucional do INIATI

Site estático em React, Vite e Bootstrap 5. Não utiliza servidor, SSR, banco de dados ou APIs próprias.

## Mise

Instale o [Mise](https://github.com/mise-install/mise) e execute os comandos abaixo para instalar as dependências do projeto.

```bash
mise trust
mise install
```

## Desenvolvimento

Requer Node.js 22.13 ou superior.

```bash
npm ci
npm run dev
```

## Gerar os arquivos estáticos

```bash
npm run build
```

O resultado é gravado em `dist/`. Essa pasta contém apenas HTML, CSS, JavaScript e imagens e pode ser publicada em qualquer servidor de arquivos estáticos.

## Publicação automática no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` compila e publica o site automaticamente quando há um push na branch `main`.

No repositório do GitHub, acesse **Settings → Pages** e escolha **GitHub Actions** em **Source**. Depois disso, cada push para `main` executará:

- instalação das dependências com `npm ci`;
- compilação estática com `npm run build`;
- publicação do conteúdo de `dist/` no GitHub Pages.

## Compilação local sem GitHub Actions

Para compilar e validar o site localmente:

```bash
npm ci
npm run lint
npm run build
```

Os arquivos prontos ficarão em `dist/`. Eles podem ser copiados diretamente para qualquer hospedagem estática, sem Node.js ou processo de servidor no ambiente de produção.

Para conferir localmente a versão compilada:

```bash
npm run preview
```

No repositório do GitHub, acesse **Settings → Pages** e escolha **Deploy from a branch**, e no diretório, escolha `/dist`. Depois disso, cada push para `main` publicará automaticamente o conteúdo de `dist/` no GitHub Pages.
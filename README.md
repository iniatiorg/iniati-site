# Site institucional do INIATI

Site estático em React, Vite e Bootstrap 5. Não utiliza servidor, SSR, banco de dados ou APIs próprias.

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

O resultado é gravado em `dist/`. Essa pasta contém apenas HTML, CSS, JavaScript e imagens e pode ser hospedada em qualquer servidor de arquivos estáticos.

## GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` gera e publica o site automaticamente quando há um push na branch `main`.

No repositório do GitHub, acesse **Settings → Pages** e escolha **GitHub Actions** em **Source**. Depois disso, cada push para `main` publica uma nova versão.

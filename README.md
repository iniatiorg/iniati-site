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

O resultado é gravado em `docs/`. Essa pasta contém apenas HTML, CSS, JavaScript e imagens e é versionada no repositório para publicação direta pelo GitHub Pages.

## GitHub Pages

O site não depende de GitHub Actions. O GitHub Pages publica os arquivos pré-compilados presentes em `docs/`.

No repositório do GitHub, acesse **Settings → Pages**, escolha **Deploy from a branch** e configure:

- Branch: `main`
- Pasta: `/docs`

Para publicar uma atualização:

```bash
npm ci
npm run lint
npm run build
git add docs
git commit -m "Atualiza site publicado"
git push origin main
```

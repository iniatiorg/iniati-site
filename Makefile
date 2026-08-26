.DEFAULT_GOAL := help

.PHONY: help install dev build preview lint test validate clean

help: ## Mostra os comandos disponíveis
	@awk 'BEGIN {FS = ":.*##"}; /^[a-zA-Z_-]+:.*##/ {printf "\033[36m%-10s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Instala as dependências bloqueadas do projeto
	npm ci

dev: ## Inicia o site em desenvolvimento com recarregamento automático
	npm run dev

build: ## Gera os arquivos estáticos em dist/
	npm run build

preview: build ## Serve localmente a versão gerada em dist/
	npm run preview

lint: ## Verifica o código-fonte
	npm run lint

test: validate ## Executa lint, build, pré-renderização e validação SEO

validate: ## Executa a validação completa do site
	npm run validate

clean: ## Remove os arquivos estáticos gerados
	rm -rf dist

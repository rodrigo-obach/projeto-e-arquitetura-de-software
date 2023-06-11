
## Repo para trabalho da disciplina de Projeto e Arquitetura de Software da Pós Graduação em Engenharia de Software

**Disciplina:** Projeto e Arquitetura de Software 
**Tarefa:** M4 | Tarefa 1 - Consumindo uma API para um Produto

---

## Desenvolvimento

### Banco de dados
- `docker compose up`

### API
- Acessar a pasta `api`
- Instalar pacotes: `npm install`
- Iniciar servidor de desenvolvimento: `npm run dev`
- TypeORM: `npm run typeorm -- <comando>`
  - Executar migrations: `npm run typeorm -- migration:run -d .\src\data-source.ts`
  - Criar nova migration: `npm run typeorm -- migration:generate src/migration/<nome> -d .\src\data-source.ts`
  
### Frontend
- Acessar a pasta `site`
- Instalar pacotes: `npm install`
- Inicar servidor de desenvolvimento: `npm start`

### Acessos
- API: `http://localhost:5000/api/v1/`
- Documentação Swagger: `http://localhost:5000/api/docs/`
- Site: `http://localhost:4200/`

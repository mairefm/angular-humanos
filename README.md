# Women Tech Learning Dashboard — Angular + NgRx + Material

Aplicação desenvolvida como **projeto final do curso de Angular da CoderHouse**.  
Trata-se de um **painel administrativo** para gestão de **cursos** e **alumnas**, com autenticação, controle de permissões, CRUDs completos, filtros avançados e UI moderna baseada no tema **Women in Tech**.

Ideal como projeto de portfólio para demonstrar domínio de Angular moderno e boas práticas de frontend.

---

## ✨ Funcionalidades

- 🔐 Login com roles (Admin/User)
- 🔒 Proteção de rotas com AuthGuard
- 📚 CRUD completo de Cursos
- 👩‍🎓 CRUD completo de Alumnas
- 🔍 Busca em tempo real
- 🎯 Filtros por status (chips dinâmicos)
- 📅 Date Range Picker para cursos
- 📑 Tabelas com paginação (Angular Material)
- 🧠 State Management com NgRx Store + Effects
- 🎨 Interface moderna e responsiva (Angular Material + CSS customizado)
- 🗄️ API fake utilizando JSON Server

---

## 🛠️ Tecnologias utilizadas

- Angular 17+
- TypeScript
- Angular Material
- NgRx (Store, Effects)
- RxJS
- HTML5 / SCSS
- JSON Server

---

## 🚀 Como executar o projeto

### 1️⃣ Instalar dependências

```bash
npm install
```
### 2️⃣ Iniciar o frontend

```bash
npm serve
```

### Acesse:
```bash
http://localhost:4200
```

### 3️⃣ Iniciar o JSON Server (API fake)
```bash
npx json-server --watch db.json --port 3000
```

### Acesse:
```bash
http://localhost:3000/courses
http://localhost:3000/students
```

## 🧠 O que aprendi no projeto

- Organização de aplicações Angular em módulos e features
- Uso avançado de Reactive Forms
- Roteamento, guards e roles
- Comunicação com API e serviços HTTP
- Componentização, Smart vs Dumb Components
- Gerência de estado com NgRx
- UI com Angular Material + personalização de temas
- Clean Code e boas práticas

## 📝 Próximos passos

- Criar dashboard com gráficos (Charts.js)
- Implementar cadastro de usuários
- Criar sistema de notificações
- Publicar em ambiente online (Firebase Hosting / Vercel)

## 👩🏻‍💻 Autora

Mairê Malheiros
Desenvolvedora & Instrutora de Tecnologia
GitHub: @mairefm

LinkedIn: Mairê Malheiros
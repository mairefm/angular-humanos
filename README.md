# 🤖 Calma Humano — Plataforma de Entrenamiento Humano–Robot

Aplicación desarrollada como proyecto final del curso de Angular de CoderHouse, ahora completamente rediseñada bajo el concepto Calma, Humano!, una plataforma futurista dedicada al entrenamiento de humanos que conviven con robots en casa.

El sistema funciona como un panel administrativo para gestionar humanos, programas de entrenamiento y su progreso, con autenticación basada en roles, filtros avanzados, UI moderna y arquitectura escalable.

---

## ✨ Funcionalidades

- 🔐 Login com roles (Admin/User)
- 🔒 Proteção de rotas com AuthGuard
- 📚 CRUD completo de Cursos
- 👩‍🎓 CRUD completo de Humanos
- 🔍 Busca em tempo real
- 🎯 Filtros por status (chips dinâmicos)
- 📅 Date Range Picker para cursos
- 📑 Tabelas com paginação (Angular Material)
- 🧠 State Management com NgRx Store + Effects
- 🎨 Interface moderna e responsiva (Angular Material + CSS customizado)
- 🗄️ API fake utilizando JSON Server

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
npx json-server --watch data/db.json --port 3000
```

### Acesse:
```bash
http://localhost:3000/courses
http://localhost:3000/students
```


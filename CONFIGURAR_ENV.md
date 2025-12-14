# ⚙️ Configurar Arquivo .env

## ✅ Você já tem as credenciais!

Agora você precisa criar o arquivo `.env` na raiz do projeto com suas credenciais.

## 📝 Passo a Passo

### 1. Criar o arquivo .env

Na raiz do projeto (mesma pasta onde está o `package.json`), crie um arquivo chamado **`.env`**

**No Windows:**
- Abra o Bloco de Notas ou qualquer editor de texto
- Salve como `.env` (com o ponto no início!)
- Se não conseguir salvar com o ponto, use o terminal:
  ```bash
  type nul > .env
  ```

**No Mac/Linux:**
```bash
touch .env
```

### 2. Adicionar as credenciais

Abra o arquivo `.env` e cole exatamente este conteúdo:

```env
VITE_GOOGLE_API_KEY=AIzaSyAYzcg6KlktoHNnhlY0GteMY7VScCK1wg4
VITE_GOOGLE_CLIENT_ID=90490674854-clne9usjo771k280mo2l3t370fb42adj.apps.googleusercontent.com
```

### 3. Salvar o arquivo

Salve o arquivo e certifique-se de que:
- ✅ O nome do arquivo é exatamente `.env` (com o ponto)
- ✅ Não há espaços extras antes ou depois do `=`
- ✅ Cada credencial está em uma linha separada
- ✅ Não há aspas ao redor dos valores

## ⚠️ Importante

- **NÃO** compartilhe este arquivo! Ele contém suas credenciais secretas
- O arquivo `.env` já está no `.gitignore`, então não será enviado para o Git
- A **Chave Secreta do Cliente** (GOCSPX-...) não é necessária no frontend, apenas no backend

## ✅ Verificar se está correto

Seu arquivo `.env` deve ter exatamente 2 linhas:

```
VITE_GOOGLE_API_KEY=AIzaSyAYzcg6KlktoHNnhlY0GteMY7VScCK1wg4
VITE_GOOGLE_CLIENT_ID=90490674854-clne9usjo771k280mo2l3t370fb42adj.apps.googleusercontent.com
```

## 🚀 Próximos Passos

Depois de criar o arquivo `.env`:

1. Instale as dependências (se ainda não fez):
   ```bash
   npm install
   ```

2. Execute a aplicação:
   ```bash
   npm run dev
   ```

3. Acesse: `http://localhost:3000`

4. Clique em "Entrar com Google" e teste!

---

**Pronto! Suas credenciais estão configuradas! 🎉**


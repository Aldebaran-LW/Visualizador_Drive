# 🎬 Visualizador de Vídeos - Google Drive

Aplicação web para visualizar e editar vídeos armazenados no Google Drive, com acesso restrito apenas através desta aplicação.

## ✨ Funcionalidades

- 🔐 Autenticação com Google Drive (OAuth 2.0)
- 👥 **Suporte a múltiplos usuários** - cada usuário vê e edita apenas seus próprios vídeos
- 📹 Listagem de vídeos do Drive
- ▶️ Player de vídeo com controles avançados
- ✂️ **Editor de corte de vídeo** - remova partes indesejadas do vídeo
  - Marque múltiplas partes para remover
  - Visualize cada corte antes de salvar
  - Timeline visual para facilitar a edição
- 🔒 Acesso restrito - vídeos só podem ser visualizados através do app
- 📱 Interface responsiva e moderna

## 🚀 Como Configurar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Google Drive API

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **Google Drive API**
4. Crie credenciais OAuth 2.0:
   - Tipo: **Aplicativo Web**
   - URIs de redirecionamento autorizados: `http://localhost:3000`
5. Copie a **Chave da API** e o **ID do Cliente**

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_GOOGLE_API_KEY=sua_chave_api_aqui
VITE_GOOGLE_CLIENT_ID=seu_client_id_aqui
```

### 4. Executar a Aplicação

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📋 Estrutura do Projeto

```
visualizador-drive/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Tela de login
│   │   ├── VideoList.jsx      # Lista de vídeos
│   │   ├── VideoPlayer.jsx    # Player de vídeo
│   │   └── VideoEditor.jsx    # Editor de vídeo
│   ├── services/
│   │   └── googleDrive.js     # Serviço de integração com Drive
│   ├── App.jsx                # Componente principal
│   └── main.jsx               # Entry point
├── package.json
└── vite.config.js
```

## 🔒 Segurança

- Os vídeos são acessados através de URLs com token de autenticação
- Os tokens são armazenados localmente no navegador
- As URLs de streaming não funcionam sem autenticação válida
- Para maior segurança, considere implementar um backend para gerenciar os tokens

## 📝 Notas Importantes

### Múltiplos Usuários
- ✅ Cada usuário faz login com sua própria conta Google
- ✅ Cada usuário vê apenas os vídeos do seu próprio Google Drive
- ✅ Cada usuário pode editar (cortar) apenas seus próprios vídeos
- ✅ Não há compartilhamento de dados entre usuários

### Edição de Vídeo
- ✂️ O editor permite marcar partes do vídeo para remover
- 📋 Você pode adicionar múltiplos cortes em um único vídeo
- ⚠️ **Importante**: O processamento real do vídeo (aplicar os cortes) requer um backend com FFmpeg
- 📝 Atualmente, o editor marca as partes a remover, mas o processamento precisa ser feito em servidor
- 💡 Para processar os cortes, você precisará implementar um backend que:
  - Receba os dados de corte
  - Baixe o vídeo do Google Drive
  - Processe com FFmpeg para remover as partes marcadas
  - Faça upload do vídeo editado de volta ao Drive

### Segurança
- Os vídeos são transmitidos diretamente do Google Drive
- Cada usuário só acessa seus próprios arquivos através da autenticação OAuth
- Certifique-se de que os vídeos no Drive tenham permissões adequadas

## 🛠️ Tecnologias Utilizadas

- **React** - Framework frontend
- **Vite** - Build tool
- **React Router** - Roteamento
- **Video.js** - Player de vídeo
- **Google Drive API** - Integração com Drive

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.


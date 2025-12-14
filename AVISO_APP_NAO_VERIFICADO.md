# ⚠️ Aviso: App Não Verificado pelo Google

## ✅ Isso é Normal!

A mensagem que você está vendo é **normal e esperada** para aplicações em desenvolvimento. Não é um erro!

---

## 🔍 O Que Está Acontecendo

O Google mostra esse aviso quando:
- O app ainda não passou pelo processo de verificação do Google
- O app está em modo de desenvolvimento/teste
- O app solicita acesso a informações confidenciais (como Google Drive)

---

## ✅ O Que Fazer Agora

### Opção 1: Continuar (Recomendado para Desenvolvimento)

1. Clique em **"Avançado"** ou **"Hide advanced"**
2. Clique em **"Acessar lwdigitalforge-577c4.firebaseapp.com (não seguro)"** ou **"Continue"**
3. Faça login normalmente
4. Autorize o acesso ao Google Drive

**Isso é seguro se você é o desenvolvedor ou confia no desenvolvedor!**

---

## 🔧 Como Reduzir o Aviso (Opcional)

### Para Desenvolvimento/Teste:

1. Acesse: **https://console.firebase.google.com/**
2. Selecione seu projeto: **lwdigitalforge-577c4**
3. Vá em **Authentication** > **Settings**
4. Em **"OAuth consent screen"**, configure:
   - **User type**: External (ou Internal se for apenas para sua organização)
   - **App name**: Visualizador de Vídeos
   - **User support email**: Seu email
   - **Developer contact information**: Seu email
5. Em **"Scopes"**, adicione apenas os escopos necessários
6. Em **"Test users"**, adicione seu email e de outros usuários de teste

### Para Produção (Futuro):

Quando estiver pronto para produção, você precisará:
1. Submeter o app para verificação do Google
2. Preencher o formulário de verificação
3. Aguardar aprovação (pode levar alguns dias)

---

## 📝 Notas Importantes

- ✅ **É seguro continuar** se você confia no desenvolvedor
- ✅ **O aviso não impede o funcionamento** do app
- ✅ **É normal** para apps em desenvolvimento
- ⚠️ **Usuários externos** verão esse aviso até o app ser verificado

---

## 🎯 Próximos Passos

1. **Clique em "Avançado"** e depois **"Continuar"**
2. **Faça login** com sua conta Google
3. **Autorize o acesso** ao Google Drive
4. **Use o app normalmente!**

---

## 💡 Dica

Se você adicionar seu email como **"Test user"** no Firebase Console, o aviso pode ser menos frequente ou não aparecer para você.

---

**Não se preocupe! Isso é normal e o app funcionará perfeitamente.** ✅


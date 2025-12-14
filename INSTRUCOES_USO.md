# 📖 Instruções de Uso - Visualizador de Vídeos Google Drive

## 🚀 Como Usar a Aplicação

### 1. Primeiro Acesso

1. Abra a aplicação no navegador (geralmente `http://localhost:3000`)
2. Clique em **"Entrar com Google"**
3. Faça login com sua conta Google
4. Autorize o acesso ao Google Drive quando solicitado
5. Você será redirecionado para a lista de vídeos

### 2. Visualizar Vídeos

1. Na tela principal, você verá todos os vídeos do seu Google Drive
2. Clique em qualquer vídeo para assistir
3. Use os controles do player para:
   - Pausar/Reproduzir
   - Ajustar volume
   - Avançar/Retroceder
   - Alterar velocidade de reprodução

### 3. Cortar Vídeo (Remover Partes Indesejadas)

1. Na lista de vídeos, clique no botão **"✏️ Editar"** do vídeo que deseja editar
2. Ou, enquanto assiste um vídeo, clique em **"✏️ Editar"** no topo

#### Como Marcar Partes para Remover:

1. **Use a Timeline**: A barra no topo mostra todo o vídeo
   - A linha azul mostra o tempo atual
   - A área amarela mostra a parte selecionada para remover

2. **Definir Início da Parte a Remover**:
   - Arraste o slider "Início" ou
   - Clique em **"📍 Usar tempo atual"** para usar o tempo onde o vídeo está pausado

3. **Definir Fim da Parte a Remover**:
   - Arraste o slider "Fim" ou
   - Clique em **"📍 Usar tempo atual"** para usar o tempo onde o vídeo está pausado

4. **Adicionar o Corte**:
   - Clique em **"➕ Adicionar Corte"**
   - A parte marcada será adicionada à lista de cortes

5. **Adicionar Mais Cortes**:
   - Você pode repetir o processo para marcar várias partes
   - Cada parte será adicionada à lista

6. **Visualizar um Corte**:
   - Clique em **"▶️ Visualizar"** em qualquer corte da lista
   - O vídeo será reproduzido apenas naquela parte

7. **Remover um Corte**:
   - Clique em **"🗑️ Remover"** para remover um corte da lista

8. **Salvar**:
   - Quando terminar de marcar todas as partes, clique em **"💾 Salvar Vídeo Cortado"**
   - ⚠️ **Nota**: O processamento real requer um backend configurado

### 4. Múltiplos Usuários

- Cada pessoa pode fazer login com sua própria conta Google
- Cada usuário verá apenas seus próprios vídeos
- Não há compartilhamento de dados entre usuários
- Cada usuário edita apenas seus próprios vídeos

### 5. Sair da Aplicação

- Clique no botão **"Sair"** no canto superior direito
- Isso fará logout e revogará o acesso

---

## 💡 Dicas

### Para Melhor Experiência de Edição:

1. **Use a reprodução lenta**: Diminua a velocidade do vídeo para marcar cortes com mais precisão
2. **Visualize antes de adicionar**: Reproduza a parte que deseja remover antes de adicionar o corte
3. **Organize os cortes**: Adicione os cortes na ordem que preferir - eles serão processados juntos
4. **Verifique a duração**: A duração de cada corte é mostrada para você saber exatamente o que será removido

### Troubleshooting:

- **Vídeos não aparecem**: Verifique se há vídeos no seu Google Drive e se você autorizou o acesso
- **Erro ao carregar vídeo**: Verifique sua conexão com a internet
- **Cortes não salvam**: O processamento real requer um backend - veja a seção de desenvolvimento

---

## 🔧 Para Desenvolvedores

### Processar os Cortes no Backend

Para realmente processar e salvar os vídeos cortados, você precisará:

1. Criar um endpoint no backend que receba os dados de corte
2. Baixar o vídeo do Google Drive usando a API
3. Processar com FFmpeg para remover as partes marcadas
4. Fazer upload do vídeo editado de volta ao Drive

Exemplo de estrutura de dados enviada:

```json
{
  "videoId": "abc123",
  "videoName": "meu-video.mp4",
  "cuts": [
    {
      "start": 10.5,
      "end": 25.3,
      "duration": 14.8
    },
    {
      "start": 60.0,
      "end": 75.5,
      "duration": 15.5
    }
  ]
}
```

---

## ❓ Perguntas Frequentes

**P: Posso usar com várias contas Google?**  
R: Sim! Cada pessoa faz login com sua própria conta e vê apenas seus vídeos.

**P: Os vídeos são modificados no Drive?**  
R: Não, os vídeos originais não são modificados. O processamento cria uma nova versão editada.

**P: Preciso de internet para usar?**  
R: Sim, a aplicação precisa de internet para acessar o Google Drive.

**P: Posso editar vídeos de outras pessoas?**  
R: Não, você só pode editar vídeos do seu próprio Google Drive.

---

**Bom uso! 🎬**


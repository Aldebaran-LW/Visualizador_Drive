# 📹 Formatos de Vídeo Suportados

## ✅ O que o App Busca

O aplicativo busca **TODOS os tipos de vídeo** do Google Drive usando o filtro:
```
mimeType contains 'video/'
```

Isso significa que o app encontra **qualquer arquivo de vídeo**, independente do formato:
- ✅ MP4
- ✅ AVI
- ✅ MOV
- ✅ MKV
- ✅ WebM
- ✅ FLV
- ✅ WMV
- ✅ 3GP
- ✅ E qualquer outro formato de vídeo

---

## 🎬 Formatos que Funcionam Bem

### Formatos com Melhor Suporte (Recomendados)

1. **MP4 (H.264)**
   - ✅ Melhor compatibilidade
   - ✅ Funciona em todos os navegadores modernos
   - ✅ Streaming eficiente
   - ✅ MIME Type: `video/mp4`

2. **WebM**
   - ✅ Suportado nativamente pelo HTML5
   - ✅ Boa compressão
   - ✅ MIME Type: `video/webm`

3. **OGG**
   - ✅ Suportado por navegadores modernos
   - ✅ MIME Type: `video/ogg`

---

## ⚠️ Formatos com Limitações

### Formatos que Podem Ter Problemas

1. **AVI**
   - ⚠️ Pode não funcionar em alguns navegadores
   - ⚠️ Depende do codec usado
   - ⚠️ MIME Type: `video/x-msvideo`

2. **MOV (QuickTime)**
   - ⚠️ Funciona melhor no Safari
   - ⚠️ Pode ter problemas no Chrome/Firefox
   - ⚠️ MIME Type: `video/quicktime`

3. **MKV**
   - ⚠️ Suporte limitado em navegadores
   - ⚠️ Pode precisar de codec específico
   - ⚠️ MIME Type: `video/x-matroska`

4. **FLV**
   - ⚠️ Formato antigo
   - ⚠️ Suporte limitado
   - ⚠️ MIME Type: `video/x-flv`

5. **WMV**
   - ⚠️ Formato proprietário Microsoft
   - ⚠️ Não funciona nativamente em navegadores
   - ⚠️ MIME Type: `video/x-ms-wmv`

---

## 🔧 Como Funciona

### 1. Busca de Vídeos
- O app busca **todos os arquivos** com `mimeType contains 'video/'`
- Não há filtro por formato específico
- Todos os vídeos aparecem na lista

### 2. Reprodução
- Usa **Video.js** para reprodução
- Video.js usa o player HTML5 nativo do navegador
- O tipo MIME é passado automaticamente do Google Drive
- Se o navegador não suportar o formato, mostrará erro

### 3. Streaming
- Os vídeos são transmitidos diretamente do Google Drive
- O Google Drive pode ter limitações de streaming para alguns formatos
- Formatos não suportados podem precisar ser baixados completamente antes de reproduzir

---

## 🌐 Compatibilidade por Navegador

### Chrome/Edge (Chromium)
- ✅ MP4 (H.264, H.265)
- ✅ WebM
- ✅ OGG
- ⚠️ MOV (depende do codec)
- ❌ AVI (depende do codec)
- ❌ MKV (limitado)
- ❌ WMV (não suportado)

### Firefox
- ✅ MP4 (H.264)
- ✅ WebM
- ✅ OGG
- ⚠️ MOV (limitado)
- ❌ AVI (depende do codec)
- ❌ MKV (limitado)
- ❌ WMV (não suportado)

### Safari
- ✅ MP4 (H.264, H.265)
- ✅ MOV
- ✅ WebM (versões recentes)
- ⚠️ AVI (depende do codec)
- ❌ MKV (limitado)
- ❌ WMV (não suportado)

---

## 💡 Recomendações

### Para Melhor Experiência:

1. **Use MP4 (H.264)**
   - Melhor compatibilidade
   - Funciona em todos os navegadores
   - Streaming eficiente

2. **Evite Formatos Antigos**
   - WMV, FLV, 3GP podem ter problemas
   - Considere converter para MP4

3. **Codecs Importantes**
   - H.264: Melhor suporte
   - H.265 (HEVC): Suporte limitado
   - VP8/VP9: Funciona bem em WebM

---

## 🔍 Como Verificar o Formato

1. Na lista de vídeos, o app mostra o nome do arquivo
2. No player, você pode ver o MIME Type nas informações do vídeo
3. A extensão do arquivo indica o formato

---

## ⚠️ Limitações Conhecidas

1. **Google Drive Streaming**
   - Alguns formatos podem não ter streaming direto
   - Pode precisar baixar o arquivo completo antes de reproduzir

2. **Navegadores**
   - Cada navegador tem suporte diferente
   - Alguns formatos podem não funcionar

3. **Codecs**
   - O codec usado no vídeo é importante
   - Mesmo formato pode não funcionar se o codec não for suportado

---

## 🛠️ Solução de Problemas

### Se um vídeo não reproduzir:

1. **Verifique o formato**
   - Veja o MIME Type nas informações do vídeo
   - Verifique se o navegador suporta o formato

2. **Tente outro navegador**
   - Chrome geralmente tem melhor suporte
   - Safari funciona bem com MOV

3. **Converta o vídeo**
   - Use um conversor para MP4 (H.264)
   - Isso garante compatibilidade

---

## 📊 Resumo

| Formato | Busca | Reprodução | Recomendado |
|---------|-------|------------|-------------|
| MP4 (H.264) | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| WebM | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| OGG | ✅ | ✅ | ⭐⭐⭐⭐ |
| MOV | ✅ | ⚠️ | ⭐⭐⭐ |
| AVI | ✅ | ⚠️ | ⭐⭐ |
| MKV | ✅ | ⚠️ | ⭐⭐ |
| FLV | ✅ | ⚠️ | ⭐ |
| WMV | ✅ | ❌ | ⭐ |

---

**O app busca TODOS os vídeos, mas a reprodução depende do formato e do navegador!** 🎬


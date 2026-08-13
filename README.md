# 👍 ThumbZone PWA

App mobile PWA otimizado para **uso com uma mão** (Thumb-Friendly Zone).

## 🎯 Requisito Principal: Zona do Polegar

- **Navegação inferior** fixa na parte inferior da tela
- **FAB (Floating Action Button)** posicionado no canto inferior direito, perfeitamente ao alcance do polegar
- **Áreas de toque mínimas de 56x56dp** em todos os botões interativos
- **Safe areas** respeitadas para notch e home indicator
- **Haptic feedback** nos botões principais

## 📁 Estrutura

```
thumbzone-pwa/
├── index.html       # App principal
├── style.css        # Estilos + Zona do Polegar
├── app.js           # Lógica + PWA install
├── sw.js            # Service Worker (offline)
├── manifest.json    # Manifesto PWA
└── README.md
```

## 🚀 Deploy no Vercel

1. Faça upload dos arquivos para um repositório GitHub
2. Importe no [Vercel](https://vercel.com)
3. Pronto! O app será detectado automaticamente como static site

Ou use o CLI:
```bash
npm i -g vercel
vercel
```

## 📱 Instalação

Acesse o app no navegador mobile e toque em **"Adicionar à Tela Inicial"**.
O banner de instalação aparecerá automaticamente.

## ✨ Features

- 5 telas: Feed, Buscar, Criar, Notificações, Perfil
- Navegação por abas inferior (thumb-friendly)
- FAB para nova postagem
- Stories horizontais
- Like, Follow, Comentar
- Offline com Service Worker
- Install Banner nativo
- Dark mode nativo

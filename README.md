# Álbum de Fotos — Dia dos Namorados 💕

Álbum de fotos interativo com tema romântico. Fotos flutuam na tela e ampliam ao clicar. Acesso via QR Code. Responsivo para iPad e desktop.

## Como adicionar suas fotos

1. Copie seus arquivos de imagem para a pasta `images/`:
   ```
   images/foto1.jpg
   images/foto2.jpg
   ...
   ```

2. Edite o array de fotos em `js/main.js` (no topo do arquivo):
   ```javascript
   const photos = [
     { src: 'images/foto1.jpg', caption: '💕 Nossa primeira vez juntos' },
     { src: 'images/foto2.jpg', caption: '❤️ Sempre com você' },
     // adicione mais entradas aqui...
   ];
   ```

3. Salve e abra `index.html` no navegador para testar localmente.

## Deploy no GitHub Pages

1. Crie um repositório no GitHub (ex: `album-namorados`)

2. Inicialize e envie o código:
   ```bash
   git init
   git add .
   git commit -m "feat: álbum de namorados"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/album-namorados.git
   git push -u origin main
   ```

3. No repositório do GitHub:
   - Vá em **Settings → Pages**
   - Em **Source**, selecione **Deploy from a branch**
   - Branch: **main** / Folder: **/ (root)**
   - Clique em **Save**

4. Aguarde ~2 minutos. Sua URL será:
   ```
   https://SEU_USUARIO.github.io/album-namorados/
   ```

5. O botão **QR** no canto inferior direito gera automaticamente o QR Code com a URL atual.

## Personalização

| O que mudar | Onde |
|---|---|
| Título do álbum | `index.html` — tag `<h1>` e `<title>` |
| Subtítulo | `index.html` — tag `<p>` no `<header>` |
| Cores (rosa, roxo) | `css/style.css` — variáveis `:root` |
| Velocidade das partículas | `js/main.js` — função `makeHeart()` |
| Tamanho dos cards | `js/main.js` — array `BASE_WIDTHS` |

# Landing page Auttra

Landing page institucional da Auttra, construída com React, TypeScript e Vite. A narrativa da marca parte da flecha do símbolo: direção para a gestão e clareza sobre o próximo passo da oficina.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Configuração

Copie `.env.example` para `.env` e ajuste:

- `VITE_APP_URL`: endereço da plataforma para clientes existentes;
- `VITE_FORM_ENDPOINT`: endpoint HTTPS que recebe o formulário em JSON (`nome`, `whatsapp`, `oficina`, `mecanicos`, `email`, `origem` e os parâmetros `utm_*`, `gclid` e `fbclid` da visita). Vazio, o formulário abre o WhatsApp comercial com os dados já escritos;
- `VITE_WHATSAPP_URL`: link `https://wa.me/...` do comercial. Vazio, usa o número padrão (48) 99126-8901 nos botões de WhatsApp do hero, do formulário e no botão flutuante;
- `VITE_GA_MEASUREMENT_ID`: ID do Google Analytics 4. Só carrega depois do consentimento de cookies e envia os eventos `demo_click`, `whatsapp_click` e `demo_form_success`;
- `VITE_SCHEDULING_URL`: link de agenda para o lead escolher um horário.

Sem configuração adicional, os leads chegam pelo WhatsApp (48) 99126-8901 e o link de acesso aponta para `https://app.auttra.com.br`.

## Telas do produto

As imagens em `src/assets/screens/` são capturas reais do sistema (projeto `WEB`) com dados de demonstração da "Oficina Central", em WebP.

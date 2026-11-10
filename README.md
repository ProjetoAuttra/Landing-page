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
- `VITE_SIGNUP_URL`: cadastro do teste grátis no app. Todos os botões "Testar grátis" levam para ele, com os `utm_*` da visita. Vazio, levam para `VITE_APP_URL`;
- `VITE_FORM_ENDPOINT`: endpoint HTTPS que recebe o pedido de demonstração em JSON (`nome`, `telefone`, `email`, `oficina`, `mecanicos`, `origem` e os parâmetros `utm_*`, `gclid` e `fbclid` da visita). Vazio, usa o FormSubmit e o pedido chega por e-mail em `auttrasistemas@gmail.com` (o primeiro envio pede uma confirmação única nessa caixa);
- `VITE_GA_MEASUREMENT_ID`: ID do Google Analytics 4. Só carrega depois do consentimento de cookies e envia os eventos `trial_click`, `demo_click` e `demo_form_success`;
- `VITE_SCHEDULING_URL`: link de agenda para o lead escolher um horário.

Sem configuração adicional, os pedidos de demonstração chegam por e-mail em `auttrasistemas@gmail.com` e o link de acesso aponta para `https://app.auttra.com.br`.

## Telas do produto

As imagens em `src/assets/screens/` são capturas reais do sistema (projeto `WEB`) com dados de demonstração da "Oficina Central", em WebP.

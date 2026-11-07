# BIOFROST — GitHub + Cloudflare Pages

## Уже сделано
Форма отправляет данные на `/api/order`. Функция Cloudflare пересылает заявку в Telegram. Токен не находится в HTML.

## GitHub
Создайте репозиторий и загрузите в корень `index.html` и папку `functions` целиком.

## Cloudflare Pages
1. Workers & Pages → Create → Pages → Connect to Git.
2. Выберите репозиторий.
3. Для статического HTML-сайта оставьте Build command пустой; `index.html` должен находиться в корне.
4. Запустите Deploy.

## Секреты Cloudflare
В Pages → Settings → Variables and Secrets добавьте для Production:
- `TELEGRAM_BOT_TOKEN` — токен BotFather, тип Secret.
- `TELEGRAM_CHAT_ID` — ID личного чата или группы.

После этого запустите новую deployment.

## Telegram
Откройте бота и нажмите Start. Если заявки нужны в группе, добавьте бота туда и разрешите отправку сообщений. Проверьте, что chat ID относится к нужному чату.

## Безопасность
Не вставляйте токен в HTML, GitHub или переписку. Если токен уже публиковался, перевыпустите его через BotFather.

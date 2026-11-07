export async function onRequestPost({ request, env }) {
  try {
    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      return json({ error: "Сервер не настроен: добавьте Telegram secrets в Cloudflare." }, 500);
    }
    const data = await request.json();
    const name = clean(data.name, 100);
    const phone = clean(data.phone, 40);
    const product = clean(data.product, 150);
    const comment = clean(data.comment, 1000);
    if (!name || !phone || !product) return json({ error: "Заполните имя, телефон и товар." }, 400);

    const message = [
      "🥐 НОВАЯ ЗАЯВКА BIOFROST", "",
      `👤 Имя: ${name}`, `📞 Телефон: ${phone}`,
      `🥐 Товар: ${product}`, `💬 Комментарий: ${comment || "—"}`, "",
      "📍 Получение: Тирасполь, ул. Покровская, 98 (ТЦ «Реал»)"
    ].join("\n");

    const tg = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: message })
    });
    const result = await tg.json();
    if (!tg.ok || !result.ok) {
      console.error("Telegram API error:", result);
      return json({ error: "Telegram не принял заявку. Проверьте настройки бота и chat ID." }, 502);
    }
    return json({ ok: true });
  } catch (error) {
    console.error("Order handler error:", error);
    return json({ error: "Не удалось обработать заявку. Попробуйте позже." }, 500);
  }
}
function clean(value, max) {
  return String(value ?? "").trim().replace(/[<>]/g, "").slice(0, max);
}
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}

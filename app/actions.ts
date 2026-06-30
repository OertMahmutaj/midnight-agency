'use server'

export async function sendDiscordMessage({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  const response = await fetch(webhookUrl!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      embeds: [{
        title: "New Contact Request from Midnight Agency Website",
        fields: [
          { name: "Name", value: name },
          { name: "Email", value: email },
          { name: "Message", value: message }
        ]
      }]
    }),
  });

  if (!response.ok) throw new Error("Failed to reach Discord");
}

const inviteCode = "qWPepXmkBh";

async function updateDiscordInfo() {
    try {
        const response = await fetch(
            `https://discord.com/api/v10/invites/${inviteCode}?with_counts=true`
        );

        if (!response.ok) {
            throw new Error("Discord API error");
        }

        const data = await response.json();

        if (data.guild) {
            document.getElementById("server-name").textContent =
                data.guild.name;

            if (data.guild.icon) {
                document.getElementById("server-icon").src =
                    `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png?size=128`;
            }
        }

        const count = data.approximate_member_count;

        if (count !== undefined) {
            let formattedCount = count;

            if (count >= 10000) {
                formattedCount = Math.floor(count / 1000) * 1000 + "+";
            } else if (count >= 1000) {
                formattedCount = Math.floor(count / 100) * 100 + "+";
            } else if (count >= 100) {
                formattedCount = Math.floor(count / 10) * 10 + "+";
            }

            document.getElementById("member-count").textContent =
                formattedCount;
        }
    } catch (error) {
        document.getElementById("server-name").textContent =
            "SCPSLFANS Discord";

        document.getElementById("member-count").textContent =
            "Unavailable";
    }
}

updateDiscordInfo();
setInterval(updateDiscordInfo, 60000);

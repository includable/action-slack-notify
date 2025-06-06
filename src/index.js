const core = require("@actions/core");
const github = require("@actions/github");
const { buildSlackAttachments } = require("./utils");

(async () => {
  try {
    const webhookUrl = core.getInput("webhook_url");
    const status = core.getInput("status");
    const color = core.getInput("color");

    const token = process.env.SLACK_BOT_TOKEN;

    if (!webhookUrl) {
      core.setFailed(`You must provider a 'webhook_url'.`);
      return;
    }

    const attachments = buildSlackAttachments({ status, color, github });

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attachments }),
    });
  } catch (error) {
    core.setFailed(error);
  }
})();

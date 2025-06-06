# Action: Slack notify

This action prints your GitHub Action build status to Slack. It takes an opinionated approach by showing attachments for metadata like branch, pull request, and event.

It is based on [voxmedia/github-action-slack-notify-build](https://github.com/voxmedia/github-action-slack-notify-build), but modified to use incoming webhooks instead of Bot Tokens.

## Usage

```yaml
uses: includable/action-slack-notify@v1
with:
  webhook_url: ${{ secrets.SLACK_NOTIFICATIONS_WEBHOOK_URL }}
  channel: app-alerts
  status: STARTED
  color: good
```

The Slack notification leverages attachments to group important information together and provide valuable links:

<img src="docs/push.png" alt="Screenshot of the push event" width="540">

When used with the `pull_request` event, a link to the originating pull request is included:

<img src="docs/pr.png" alt="Screenshot of the pull_request event" width="540">

### Reporting Success or Failure

You can use the `success()` and `failure()` conditional checks within your workflow to determine which build notification to send:

```yaml
- name: Run tests
  # ... your test step here
- name: Notify slack success
  if: success()
  uses: includable/action-slack-notify@v1
  with:
    webhook_url: ${{ secrets.SLACK_NOTIFICATIONS_WEBHOOK_URL }}
    channel: app-alerts
    status: SUCCESS
    color: good

- name: Notify slack fail
  if: failure()
  uses: includable/action-slack-notify@v1
  with:
    webhook_url: ${{ secrets.SLACK_NOTIFICATIONS_WEBHOOK_URL }}
    channel: app-alerts
    status: FAILED
    color: danger
```

## Inputs

### `status`

**Required** The status to show for the action, e.g. `STARTED` or `FAILED`.

### `webhook_url`

The incoming webhook URL to post the message to. **Required**. You can find this in your Slack app settings under "Incoming Webhooks". It should look like `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`.

### `color`

The color to use for the notification. Can be a hex value or any [valid Slack color level](https://api.slack.com/reference/messaging/attachments#fields) (e.g. `good`). Defaults to `#cccccc`.

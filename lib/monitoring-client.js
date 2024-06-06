import axios from 'axios'

const MESSAGE_THEME_COLOR = {
  success: '#1b8700',
  error: '#ffdc2b',
}

export default async (event) => {
  const messageCard = {
    '@type': 'MessageCard',
    '@context': 'http://schema.org/extensions',
    themeColor: '#ed2835',
    summary: ' ',
    sections: [
      {
        activityTitle: '',
        activitySubtitle: '',
        activityImage: 'https://miro.medium.com/max/100/1*pD_69wpCMvY4fxAetly_AA.png',
        facts: [
          {
            name: 'Ambiente',
            value: process.env.AWS_LAMBDA_FUNCTION_NAME?.includes('production')
              ? 'production'
              : 'staging',
          },
          {
            name: 'Lambda',
            value: process.env.AWS_LAMBDA_FUNCTION_NAME,
          },
        ],
        markdown: true,
      },
    ],
  }

  function sendErrorMessage({ title, level = 'error', subtitle, params = [] }) {
    console.info(`Sending ${level} message to Teams...`)

    messageCard.sections[0].activityTitle = title
    messageCard.themeColor = MESSAGE_THEME_COLOR[level]
    messageCard.sections[0].activitySubtitle = subtitle
    messageCard.sections[0].facts = messageCard.sections[0].facts.concat(params)

    return axios
      .post(process.env.TEAMS_WEBHOOK_URL, messageCard, {
        headers: {
          'content-type': 'application/vnd.microsoft.teams.card.o365connector',
        },
      })
      .then(() => true)
      .catch((error) => console.error('[MONITORING CLIENT] Error sending notification:', error))
  }

  return sendErrorMessage(event)
}

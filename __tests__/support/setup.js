import { setup } from 'jest-dev-server'

export default async () => {
  await setup({
    command: 'npx sls offline start --noAuth --httpPort 3005',
    port: 3005,
    launchTimeout: 50000,
    usedPortAction: 'ignore',
  })
}

import RingCentral from '@rc-ex/core';
import DebugExtension from '@rc-ex/debug';

const rc1 = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});
const debugExt1 = new DebugExtension();
const rc2 = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});
const debugExt2 = new DebugExtension();

const main = async () => {
  await rc1.installExtension(debugExt1);
  await rc2.installExtension(debugExt2);
  // user1
  console.log('authorizing #1');
  await rc1.authorize({
    jwt: process.env.RINGCENTRAL_JWT_TOKEN!,
  });
  // user2
  console.log('authorizing #2');
  await rc2.authorize({
    username: process.env.RINGCENTRAL_USERNAME!,
    extension: process.env.RINGCENTRAL_EXTENSION!,
    password: process.env.RINGCENTRAL_PASSWORD!,
  });

  // refresh each token 4 times in a short time
  // and the total auth call will be 10 times: 2 for `authorize` and 8 for `refresh`
  for (let i = 0; i < 4; i++) {
    console.log(`refreshing #${i * 2 + 3}`);
    await rc1.refresh();
    console.log(`refreshing #${i * 2 + 4}`);
    await rc2.refresh();
  }
};

main();

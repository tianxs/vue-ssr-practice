import { createApp } from './main.js';

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
        // 返回根组件
        resolve(app);
    }, reject);
  });
}

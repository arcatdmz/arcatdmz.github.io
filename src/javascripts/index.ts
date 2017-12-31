
import(/* webpackChunkName: "library" */ './library').then(TestLib => {
  const testLib = new TestLib.default();
  console.log('dynamically loaded library: 1+2=', testLib.test(1, 2));
});

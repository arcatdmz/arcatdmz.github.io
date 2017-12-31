
import('./library').then(TestLib => {
  const testLib = new TestLib.default();
  console.log('dynamically loaded library:', testLib.test(1, 2));
});

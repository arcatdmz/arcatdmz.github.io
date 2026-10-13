/* Run the lecture's ES5 examples with its original, locally hosted interpreter. */
// The original browser bundle exports through window; adapt its host in a Worker.
// This host is separate from the interpreter's own window/global scope.
self.window = self;
importScripts('/talks/as-a-code/vendor/acorn.js', '/talks/as-a-code/vendor/interpreter.js');

self.onmessage = function (event) {
  const commands = [], logs = [];
  let colorValue = 'rgb(0,0,0)';
  const print = text => {
    if (logs.length >= 1000) throw new Error('出力が多すぎます。');
    logs.push(text ? text.toString() : '');
  };
  const draw = (type, values) => {
    if (commands.length >= 10000) throw new Error('描画命令が多すぎます。');
    const points = values.map(value => value ? value.toNumber() : NaN);
    if (!points.every(Number.isFinite)) throw new Error('座標は数値で指定してください。');
    commands.push({ type, color: colorValue, points });
  };
  try {
    const interpreter = new Interpreter(event.data.code, (i, scope) => {
      i.setProperty(scope, 'width', i.createPrimitive(128));
      i.setProperty(scope, 'height', i.createPrimitive(128));
      i.setProperty(scope, 'print', i.createNativeFunction(print));
      const consoleObject = i.createObject(i.OBJECT);
      i.setProperty(consoleObject, 'log', i.createNativeFunction(print));
      i.setProperty(scope, 'console', consoleObject);
      i.setProperty(scope, 'color', i.createNativeFunction((r, g, b) => {
        const clamp = value => Math.max(0, Math.min(255, Math.round(value ? value.toNumber() : 0)));
        colorValue = `rgb(${clamp(r)},${clamp(g)},${clamp(b)})`;
      }));
      i.setProperty(scope, 'dot', i.createNativeFunction((x, y) => draw('dot', [x, y])));
      i.setProperty(scope, 'line', i.createNativeFunction((x, y, ex, ey) => draw('line', [x, y, ex, ey])));
    });
    const start = Date.now();
    while (interpreter.step()) {
      if (Date.now() - start > 500) throw new Error('実行を中断しました（時間制限）。');
    }
    if (interpreter.value && interpreter.value.data !== undefined) logs.push(interpreter.value.toString());
  } catch (error) {
    logs.push(error instanceof Error ? `${error.name}: ${error.message}` : String(error));
  }
  self.postMessage({ output: logs.join('\n'), commands });
};

const babel = require('@babel/core');
const fs = require('fs');

const { code, map } = babel.transformFileSync('src/file.js', {
});
fs.writeFileSync('./file.js', `${code}\n\n//# sourceMappingURL=file.js.map`);
fs.writeFileSync('./file.js.map', JSON.stringify(map, null, 2));

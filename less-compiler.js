const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const fs = require('fs');

const basicStyles  = `@import './node_modules/ng-zorro-antd/ng-zorro-antd.less';`;

/*默认主题*/
less.render(basicStyles , {
  javascriptEnabled: true,
  plugins: [new LessPluginCleanCSS({ advanced: true })],
  modifyVars: {
    hack: `true;@import "${require.resolve('./src/assets/themes/theme-default.less')}";`,
    ...{
      // for the compact theme
      // you need to add your color variables here
      // you can find the full variables list here
      // https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/scripts/site/_site/doc/theme.less
    }
  }
}).then(data => {
  fs.writeFileSync(
    // output path for the theme style
    './src/assets/themes/style.default.css',
    data.css
  )
}).catch(e => {
  // log the render error
  console.error(e);
});

/*orange 橙色主题*/
less.render(basicStyles , {
  javascriptEnabled: true,
  plugins: [new LessPluginCleanCSS({ advanced: true })],
  modifyVars: {
    hack: `true;@import "${require.resolve('./src/assets/themes/theme-orange.less')}";`,
  }
}).then(data => {
  fs.writeFileSync(
    // output path for the theme style
    './src/assets/themes/style.orange.css',
    data.css
  )
}).catch(e => {
  // log the render error
  console.error(e);
});

/*green 蓝绿色主题*/
less.render(basicStyles , {
  javascriptEnabled: true,
  plugins: [new LessPluginCleanCSS({ advanced: true })],
  modifyVars: {
    hack: `true;@import "${require.resolve('./src/assets/themes/theme-turquoise.less')}";`,
  }
}).then(data => {
  fs.writeFileSync(
    // output path for the theme style
    './src/assets/themes/style.turquoise.css',
    data.css
  )
}).catch(e => {
  // log the render error
  console.error(e);
});

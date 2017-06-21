// Source: https://swizec.com/blog/dirty-hack-took-30percent-off-webpack-size/swizec/7657

const LodashModules = (() => {
    const path     = require('path'),
          execSync = require('child_process').execSync;

    const files = path.resolve(__dirname, 'js'),
          code  = execSync(`grep -r "_\\\." ${files} --exclude=mathquill.js`,
                          {encoding: 'utf-8'});


    const matches = new Set(code.match(/_\.([a-z]+)/ig));

    return Array.from(matches.values())
                .map(m => {
                    let module = m.replace('_.', 'lodash.').toLowerCase(),
                        vars = [m];

                    if (module === 'lodash.extend') {
                        module = 'lodash.assign';
                        vars = vars.concat('_.assign');
                    }
                    if (module === 'lodash.each') {
                        module = 'lodash.foreach';
                        vars = vars.concat('_.forEach');
                    }

                    try {
                        require.resolve(module);
                    } catch(e) {
                        console.log(`Installing ${module}`);
                        execSync(`npm install --save ${module}`);
                    }

                    return new webpack.ProvidePlugin(
                        _.fromPairs(vars.map(v => [v, module]))
                    )
                })
})();

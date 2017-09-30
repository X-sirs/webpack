module.exports = {
    "parserOptions": { //制定解析选型
        "ecmaVersion": 6, //ECMAScript版本
        "sourceType": "module", //类型script或module
        "ecmaFeatures": { //额外的语言特性
            "jsx": true //启用jsx
        }
    },
    "root": true,
    "env": { //解析环境
        "browser": true,
        "node": true,
        "es6": true,
        "commonjs": true
    },

    "extends": "eslint:recommended", //继承
    "rules": { //制定规则
        // enable additional rules
        "indent": ["off", 4],
        "linebreak-style": ["off", "unix"],
        "quotes": ["warn", "double"],
        "semi": ["warn", "always"],

        // override default options for rules from base configurations
        "comma-dangle": ["warn", "always"],
        "no-cond-assign": ["warn", "always"],

        // disable rules from base configurations
        "no-console": "off",
    }
}
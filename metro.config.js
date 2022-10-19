//tämä koodi korjaa errorin ennenkuin voi käyttää firebasea 

const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;
'use strict';

var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
const mkdirp = require('mkdirp');

class MyYeoman extends Generator {

}

module.exports = class extends MyYeoman {

  // constructor -> ilk bu method çalıştırılır. Daha sonra methodlar yazılış sırasına göre otomatik olarak çalıştırılır.
  // private methodlar otomatik olarak çalıştırılmaz
  // option ve argument tanımlamaları bu method içerisinde çalıştırılmalıdır.
  constructor(args, opts) {
    super(args, opts);
    this.option('Option');
  }

  paths() {
    this.log('destinationRoot: ' + this.destinationRoot());
    // returns '/Users/aykutasil/UltimateYeoman/test'

    this.log('destinationPath: ' + this.destinationPath('index.js'));
    // returns '/Users/aykutasil/UltimateYeoman/test/index.js'

    this.log('contextRoot: ' + this.contextRoot);
    // returns '/Users/aykutasil/UltimateYeoman/test'

    this.log('sourceRoot: ' + this.sourceRoot());
    // returns '/Users/aykutasil/Desktop/YoAndroid/generator-yo-android/generators/app/templates'
  }

  prompting() {
    var done = this.async();

    this.log(yosay( // yeoman çalıştırılırken ilk başta gözüken proje bilgilendirme kısmını hazırlamaka için kullanılır
      'Android Create Project ' +
      chalk.red('generator-androidproject') + // yazı renklendirme için kullanılır
      ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Project Name: ',
      default: this.appname, // Default to current folder name
      validate: function (input) {
        if (/^([a-zA-Z0-9_]*)$/.test(input)) {
          return true;
        }
        return 'Uygulama isminde özel karakter ve boşluk olamaz. Bunun yerine default değeri kullan: ' + this.appname;
      }
    }, {
      type: 'input',
      name: 'packageName',
      message: 'Package name: ',
      validate: function (input) {
        if (/^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input)) {
          return true;
        }
        return 'The package name you have provided is not a valid Java package name.';
      }
    }, {
      type: 'input',
      name: 'playVersion',
      message: 'Play Version: ',
      default: '10.0.1',
      store: true
    }, {
      type: 'input',
      name: 'supportVersion',
      message: 'Support Version',
      default: '25.1.0',
      store: true
    }, {
      type: 'input',
      name: 'targetSdkVersion',
      message: 'Target SDK Version',
      default: '25',
      store: true
    }, {
      type: 'input',
      name: 'minSdkVersion',
      message: 'Min SDK Version',
      default: '17',
      store: true
    }, {
      type: 'input',
      name: 'buildVersion',
      message: 'Build Version',
      default: '25.0.1',
      store: true
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
      this.log(this.props);

      done();
    }.bind(this));
  }

  writing() {
    var packageDir = this.props.packageName.replace(/\./g, '/');

    mkdirp('app/libs');
    mkdirp('app/src/androidTest/java/' + packageDir);
    mkdirp('app/src/debug/java/' + packageDir);
    mkdirp('app/src/main/java/' + packageDir);
    mkdirp('app/src/main/java/' + packageDir + '/helper');
    mkdirp('app/src/main/java/' + packageDir + '/receivers');
    mkdirp('app/src/main/java/' + packageDir + '/util');
    mkdirp('app/src/test/java/' + packageDir);

    this.fs.copy(this.sourceRoot() + '/gradle', 'gradle');
    this.fs.copy(this.sourceRoot() + '/app/src/main/res', 'app/src/main/res');

    this.fs.copy(this.sourceRoot() + '/gradle.properties', 'gradle.properties');
    this.fs.copy(this.sourceRoot() + '/gradlew', 'gradlew');
    this.fs.copy(this.sourceRoot() + '/gradlew.bat', 'gradlew.bat');
    this.fs.copy(this.sourceRoot() + '/settings.gradle', 'settings.gradle');
    this.fs.copy(this.sourceRoot() + '/app/proguard-rules.pro', 'app/proguard-rules.pro');
    this.fs.copy(this.sourceRoot() + '/app/google-services.json', 'app/google-services.json');

    this.fs.copyTpl(this.sourceRoot() + '/build.gradle', 'build.gradle', this.props);
    this.fs.copyTpl(this.sourceRoot() + '/app/build.gradle', 'app/build.gradle', this.props);
    this.fs.copyTpl(this.sourceRoot() + '/app/src/main/java/com/aykuttasil/starterproject', 'app/src/main/java/' + packageDir, this.props);
    this.fs.copyTpl(this.sourceRoot() + '/app/src/main/AndroidManifest.xml', 'app/src/main/AndroidManifest.xml', this.props);
    this.fs.copyTpl(this.sourceRoot() + '/app/src/main/res/values', 'app/src/main/res/values', this.props);
    this.fs.copyTpl(this.sourceRoot() + '/app/src/debug/AndroidManifest.xml', 'app/src/debug/AndroidManifest.xml', this.props);
    this.fs.copyTpl(this.sourceRoot() + '/app/src/debug/java/com/aykuttasil/starterproject/app', 'app/src/debug/java/' + packageDir + '/app', this.props);
    this.fs.copyTpl(this.sourceRoot() + '/app/src/androidTest/java/com/aykuttasil/starterproject', 'app/src/androidTest/java/' + packageDir, this.props);
    this.fs.copyTpl(this.sourceRoot() + '/app/src/test/java/com/aykuttasil/starterproject', 'app/src/test/java/' + packageDir, this.props);
  }

  install() {
    // this.spawnCommand('echo', ['istediğimiz komutu çalıştırabiliriz']);

    // Tüm dosyalar kopyalandıktan sonra dependency lerin yüklenmesi sağlanır
    // Eğer çalıştırılmazsa node_modules klasörü oluşturulmamış olur.
    /*
    this.installDependencies({
      npm: false,
      bower: true,
      yarn: true
    });
    */
  }

};

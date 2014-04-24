'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var DrupalModuleGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('Let\'s make a Drupal module!'));

    var prompts = [{
      name: 'moduleName',
      message: 'What should I name your module?'
    }, {
      type: 'confirm',
      name: 'addScripts',
      message: 'Does your module need any JavaScript?',
      default: true
    }, {
      type: 'confirm',
      name: 'addSass',
      message: 'Does your module need to use Sass?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.scripts = (/y/i).test(props.addScripts) ? 'scripts[] = scripts/' + props.moduleName + '.js' : '';

      this.addSass = props.addSass;
      this.stylesheets = (/y/i).test(props.addSass) ? 'stylesheets[all][] = sass/' + props.moduleName + '.sass';
      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/templates');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = DrupalModuleGenerator;

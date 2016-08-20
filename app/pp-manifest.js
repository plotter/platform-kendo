define("pp-manifest", [
  'pplatform/main',
  'pplatform/app',
  'text!pplatform/app.html',
  'text!pplatform/app.css',

  'pplatform/platform/electron-helper',
  'pplatform/platform/phone-gap-helper',
  'pplatform/platform/platform-startup',
  'pplatform/platform/plotter',

  'pplatform/platform/pak/pak',
  'pplatform/platform/pak/pak-directory',
  'pplatform/platform/pak/pak-provider-service',
  'pplatform/platform/pak/pak-repository',
  'pplatform/platform/pak/pak-repository-file',
  'pplatform/platform/pak/view',

  'pplatform/platform/state/active-pak',
  'pplatform/platform/state/state-directory',
  'pplatform/platform/state/state-repository',
  'pplatform/platform/state/state-repository-file',
  'pplatform/platform/state/state-repository-github-gist',
  'pplatform/platform/state/state-repository-local-storage',
  'pplatform/platform/state/state-repository-service',
  'pplatform/platform/state/state-session',
  'pplatform/platform/state/view-instance',

  'text!pplatform/shell/shell.css',
  'text!pplatform/shell/shell.html',
  'pplatform/shell/shell',
  'text!pplatform/shell/view-instance-toolbar.css',
  'text!pplatform/shell/view-instance-toolbar.html',
  'pplatform/shell/view-instance-toolbar',
  
  'text!pplatform/state/new-session.css',
  'text!pplatform/state/new-session.html',
  'pplatform/state/new-session',

  'text!pplatform/state/state-repository-chooser.css',
  'text!pplatform/state/state-repository-chooser.html',
  'pplatform/state/state-repository-chooser',

  'text!pplatform/state/state-session-chooser.css',
  'text!pplatform/state/state-session-chooser.html',
  'pplatform/state/state-session-chooser',
  
  ], function(){});

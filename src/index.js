'use strict'

import i18n from '../../i18n'
import { registerRoute } from '../../routes';
import { registerPluginContextMenuItem, ContextMenuType } from '../index.js';
import { registerPluginData, PluginDataType } from '../../store';


import Vue from 'vue'
import App from './App.vue'
new Vue({
  render: h=> h(App)
}).$mount('#app');



registerRoute(RobotViewer, {
	Job: {
		RobotViewer: {
			icon: 'mdi-rotate-3d',
			caption: 'plugins.robotviewer.menuCaption',
			path: '/Job/RobotViewer'
		}
	}
});

registerPluginContextMenuItem(() => i18n.t('plugins.gcodeViewer.view3D'), '/Job/RobotViewer', 'mdi-rotate-3d', 'view-3d-model', ContextMenuType.JobFileList);
registerPluginData('RobotViewer', PluginDataType.machineCache, 'robotDHtype', 'RRRRRR');
registerPluginData('RobotViewer', PluginDataType.machineCache, 'toolColors', ['#00FFFF', '#FF00FF', '#FFFF00', '#000000', '#FFFFFF']);

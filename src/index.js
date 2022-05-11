'use strict'

import { registerRoute } from '../../routes';
import { registerPluginContextMenuItem, ContextMenuType } from '../index.js';


//import Vue from 'vue'
import RobotViewer from './RobotViewer.vue'

/*
new Vue({
  render: h=> h(App)
}).$mount('#app');
*/



registerRoute(RobotViewer, {
	Job: {
		RobotViewer: {
			icon: 'mdi-rotate-3d',
			caption: 'RobotViewer',
			path: '/Job/RobotViewer'
		}
	}
});

registerPluginContextMenuItem(() => 'RobotViewer', '/Job/RobotViewer', 'mdi-rotate-3d', 'view-3d-model', ContextMenuType.JobFileList);



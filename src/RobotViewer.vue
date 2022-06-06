<style>
.button-container {
	position: absolute;
	top: 5px;
	left: 5px;
}
</style>



<template>
<div id="app">
<v-app>
<v-container class="button-container">
<v-row>

<v-col>
<v-row>
  <v-btn @click="allOff">Empty</v-btn>
  <v-btn @click="toggleGitter0">Gitter</v-btn>
  <v-btn @click="toggleCoords0">Coords</v-btn>
  <v-btn @click="toggleAxes0">Axes</v-btn>
  <v-btn @click="togglePieBar0">Pie,Bar</v-btn>
  <v-btn @click="toggleArms0">Arms</v-btn>
  <v-btn @click="allOn">All</v-btn>
</v-row>
<v-row>
  <v-text-field v-model="anglesOneLiner" label="Angles" background-color="white"
                    filled outlined/>
  <v-combobox autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
          v-model="selectAnimate" :items="itemsAnimate" label="Animate" outlined dense
          background-color="white" filled></v-combobox>
  <v-text-field v-model="heightWidthOneLiner" label="Height, Width" background-color="white"
                    filled outlined/>
</v-row>
<v-row>
  <v-textarea  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
            name="input-7-1" label="DH Parameters: d, theta, ytr, yrot, a, alpha, home, min, max" v-model="dhstring"
                 auto-grow rows="5" cols="40" background-color="white" filled></v-textarea>
</v-row>
<v-row>
  <v-btn @click.stop="showDesignForm=true">Design New
             <DesignForm v-model="showDesignForm" /></v-btn>
  <v-btn @click.stop="recalc0">Set & Refresh</v-btn>
</v-row>
<v-row>
  <v-btn @click.stop="showLoadSaveForm=true">load robot.g
             <LoadSaveForm v-model="showLoadSaveForm" /></v-btn>
  <v-btn @click.stop="showLoadSaveForm=true">save robot.g
             <LoadSaveForm v-model="showLoadSaveForm" /></v-btn>
</v-row>
<v-row>
  <v-select  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
          v-model="selectTemplate" :items="itemsTemplate"
          label="Load Predefined Model" outlined background-color="white" filled></v-select>
</v-row>

</v-col>
<v-col>
  <div>
    <canvas ref="bjsCanvas" :width="mainWidth" :height="mainHeight"/>
  </div>
</v-col>

</v-row>
</v-container>

</v-app>
</div>
</template>



<script>
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify)
import LoadSaveForm from './LoadSaveForm.vue'
import DesignForm from './DesignForm.vue'

import { initScene, toggle, showAll } from "./RobotScene";

import { setAngles, initAnglesOneLiner, scenes } from './RobotData';
import { setDHParameters } from './DHString2ArrConverter';
import { readTemplate } from './RobotTemplates';
import { animateRobot, setAnimationMode, clearAnimationPoints } from './RobotAnimation';

export default {
  name: "RobotViewer",
  methods: {
    recalc0: function() {
      setDHParameters(this.dhstring);
      showAll();
    },
    allOff : function() {
alert("allOff");
    },
    allOn : function() {
alert("allOn");
    },
    toggleGitter0 : function() {
      this.visibleGitter = !this.visibleGitter;
      toggle("gitter", this.visibleGitter);
    },
    toggleCoords0 : function() {
      this.visibleCoords = !this.visibleCoords;
      toggle("coords", this.visibleCoords);
    },
    toggleAxes0 : function() {
      this.visibleAxes = !this.visibleAxes;
      toggle("axis", this.visibleAxes);
    },
    togglePieBar0 : function() {
      this.visiblePieBar = !this.visiblePieBar;
      toggle("pie", this.visiblePieBar);
      toggle("bar", this.visiblePieBar);
    },
    toggleArms0 : function() {
      this.visibleArms = !this.visibleArms;
      toggle("arm", this.visibleArms);
    },
    freeze0 : function() {
      this.freeze = !this.freeze;
      if(this.freeze == true) {
        this.freezeText = "unfreeze";
      }
      else {
        this.freezeText = "freeze";
      }
    }
  },
  mounted() {
    const bjsCanvas = this.$refs.bjsCanvas;
    if (bjsCanvas) {
      initScene(bjsCanvas);
    }
  },
  data() {
    return{
      mainWidth: 800,
      mainHeight: 800,
      fullscreen: false,
      showLoadSaveForm: false,
      showDesignForm: false,
      drawer: false,
      anglesOneLiner: "",
      heightWidthOneLiner: "300, 300",
      freezeText: "freeze",
      freeze: false,

      //
      visibleGitter:true,
      visibleCoords:true,
      visibleAxes:true,
      visiblePieBar:true,
      visibleArms:true,

      // combobox:
      selectTemplate: "",
      itemsTemplate: [
          'Robot 6 Axis RRRRRR',
          'Cartesian 3 Axis PPP',
          'Cartesian with Spherical wrist PPPRRR',
          'Open5x PPPRR',
          'Scara 2 arm RRP',
          'Anthropomorphic RRR',
          'Stanford manipulator RRPRRR',
          '7 arm cobot RRRRRRR',
          'empty',
        ],
      selectAnimate: ['no animation'],
      itemsAnimate: [
          'no animation',
          'all axes',
          'axis 1',
          'axis 2',
          'axis 3',
          'axis 4',
          'axis 5',
          'axis 6',
          'clear points',
          'points on',
          'points off'
        ],
      dhstring:"load predefined model, load robot.g, or design new",
      id: "app"
    }
  },
  components: {
    LoadSaveForm,
    DesignForm,
  },
  watch: {
      anglesOneLiner(newValue) {
        setAngles(newValue);
        showAll();
      },
      selectTemplate(newValue) {
        this.dhstring = readTemplate(newValue);
        setDHParameters(this.dhstring);
        this.anglesOneLiner = initAnglesOneLiner();
	showAll();
      },
      selectAnimate(newValue) {
        if(newValue == "no animation") {
          var scene = scenes[0];
          setAnimationMode("no animation");
          scene.unregisterBeforeRender(animateRobot);
        }
        else if(newValue.startsWith("axis")) {
          setAnimationMode(newValue);
        }
        else if(newValue.startsWith("points")) {
          setAnimationMode(newValue);
        }
        else if(newValue == "clear points") {
          clearAnimationPoints();
        }
        else if(newValue == "all axes") {
          var scene = scenes[0];
          setAnimationMode("all");
          scene.registerBeforeRender(animateRobot);
        }
      }
  },
  vuetify: new Vuetify({
  })

};
</script>


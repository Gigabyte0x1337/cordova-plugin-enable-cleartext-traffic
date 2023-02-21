#!/usr/bin/env node

module.exports = function(context) {
  try{
  let fs = context.requireCordovaModule('fs'),
  path = context.requireCordovaModule('path');
}catch(e){
  var fs = require('fs'),
      path = require('path');
}

  // android platform directory
  let platformAndroidDir = path.join(context.opts.projectRoot, 'platforms/android');

  // android app module directory
  let platformAndroidAppModuleDir = path.join(platformAndroidDir, 'app');

  // android manifest file
  let androidManifestFile = path.join(platformAndroidAppModuleDir, 'src/main/AndroidManifest.xml');
  let androidDomainConfigFile = path.join(platformAndroidAppModuleDir, 'src/main/res/xml/network_security_config.xml')
  let legacyandroidManifestFile = path.join(platformAndroidDir, 'AndroidManifest.xml');
  let latestCordovaAndroidManifestFile = androidManifestFile;

  if (fs.existsSync(androidDomainConfigFile)) {
     fs.writeFile(androidDomainConfigFile, `<?xml version="1.0" encoding="utf-8"?>
<network-security-config xmlns:android="http://schemas.android.com/apk/res/android" xmlns:cdv="http://cordova.apache.org/ns/1.0" xmlns:app="http://schemas.android.com/apk/res-auto" xmlns="http://www.w3.org/ns/widgets">
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system"/>
        </trust-anchors>
    </base-config>
    <domain-config cleartextTrafficPermitted="true">
      <domain>192.168.10.1</domain>
    </domain-config>
</network-security-config>
`, 'UTF-8', function(err) {
          if (err){
                        console.log('file6');

            throw new Error('Unable to write into AndroidManifest.xml: ' + err);
          }
     })
  }
  
  if (fs.existsSync(legacyandroidManifestFile)) {
          fs.readFile(legacyandroidManifestFile, 'UTF-8', function(err, data) {

  //if (fs.existsSync(androidManifestFile)) {

   // fs.readFile(androidManifestFile, 'UTF-8', function(err, data) {

      if (err) {
        throw new Error('Unable to find AndroidManifest.xml: ' + err);
      }

      // the Android Application class that need to config to Android manifest file
        let applicationClassName = '<application';

      if (data.indexOf(applicationClassName) !== -1) {

        let result = data.replace(/<application/g, '<application android:usesCleartextTraffic="true"');
            // result = result.replace(/android:usesCleartextTraffic="false"/g, '');

        fs.writeFile(legacyandroidManifestFile, result, 'UTF-8', function(err) {
          if (err){
                        console.log('file6');

            throw new Error('Unable to write into AndroidManifest.xml: ' + err);
          }
        })
      }
    });
  }else{ // This section will handle latest corodva android projects (version 9.0.0 and above)
          fs.readFile(latestCordovaAndroidManifestFile, 'UTF-8', function(err, data) {

      //if (fs.existsSync(androidManifestFile)) {

      // fs.readFile(androidManifestFile, 'UTF-8', function(err, data) {

      if (err) {
        throw new Error('Unable to find AndroidManifest.xml: ' + err);
      }

      // the Android Application class that need to config to Android manifest file
        let applicationClassName = '<application';

      if (data.indexOf(applicationClassName) !== -1) {

        let result = data.replace(/<application/g, '<application android:usesCleartextTraffic="true"');
            // result = result.replace(/android:usesCleartextTraffic="false"/g, '');

        fs.writeFile(latestCordovaAndroidManifestFile, result, 'UTF-8', function(err) {
          if (err){
                        console.log('file6');

            throw new Error('Unable to write into AndroidManifest.xml: ' + err);
          }
        })
      }
      });

  }
};

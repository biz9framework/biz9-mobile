# Copyright 2023 Certified CoderZ
# Author: certifiedcoderz@gmail.com (Certified CoderZ)
# License GNU General Public License v3.0
# Description: BiZ9 Framework ScriptZ : Mobile IOS Deploy
echo "#################"
echo "BiZ9 Framework MObile IOS Deploy"
echo "#################"
source .biz9_config.sh
cordova platform rm android
cordova platform rm ios
cordova platform add ios
cordova plugin add @globules-io/cordova-plugin-ios-xhr
cordova plugin rm cordova-plugin-stripe
cordova clean
cordova prepare
cordova compile
cordova build
echo "----------------------------------"
echo "Framework Version: ${BIZ9_MOBILE_VERSION}"
echo "Project-ID: ${PROJECT_ID}"
echo "App Title: ${APP_TITLE}"
echo "App-Title-ID: ${APP_TITLE_ID}"
echo "App Version: ${APP_VERSION}"
echo "CONFIG-ID : ${CONFIG_ID}"
echo "Done!"
echo "----------------------------------"
exit 1


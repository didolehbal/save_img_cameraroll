

import React from 'react';
import {
  View,
  Platform,
  Image,
  Button
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import CameraRoll from "@react-native-community/cameraroll";


const App = () => {
  const img_url 
  = "https://www.elsetge.cat/myimg/f/182-1822715_snowy-wallpaper-illustrations-for-iphone-background-pictures-for.jpg"
  const  _saveImage = async () => {
    if(Platform.OS == "ios"){
      let res = request(PERMISSIONS.IOS.PHOTO_LIBRARY)
      if(res == RESULTS.GRANTED){
      CameraRoll.saveToCameraRoll(img_url).then(local_img_url => {
        console.log("success",local_img_url ) 
        /* here you display a message for the user 
        something like "Image saved successfully" */
      })
    }
    }
    else {
      let res = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
      if(res == RESULTS.GRANTED){
        downloadImage(img_url)
      }
      
    }
    
  }

  const downloadImage = (image_URL) => {
    var date = new Date();

    var ext = this.getExtention(image_URL);
    ext = "." + ext[0];
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: PictureDir + "/image_" + Math.floor(date.getTime()
          + date.getSeconds() / 2) + ext,
        description: 'Image'
      }
    }
    config(options).fetch('GET', image_URL).then((res) => {
      console.log("success")
    });
  }
 
  getExtention = (filename) => {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
      undefined;
  }
  const DownloadButton = () => (
              <Button 
              title="Save Image in camera roll" 
              onPress={_saveImage}
              />
              )
  return (
    <>
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Image style={{margin:20,width:100,height:150}} source={{uri:img_url}} />
       <DownloadButton/>
      </View>
    </>
  );
};

export default App;

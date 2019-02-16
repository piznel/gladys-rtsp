# gladys-rtsp
Allows to display in Gladys the RTSP flow of an IP camera through the "[ffmpeg-jsmpeg](https://github.com/piznel/ffmpeg-jsmpeg)" server.

1. Add this module to Gladys:

   * Name: `Gladys-Rtsp`
   * Version: `0.1.0`
   * URL: `https://github.com/piznel/gladys-rtsp.git`
   * slug: `rtsp`


2. Restart Gladys.

3. You can now add the box "**box-Camera Rtsp-title**".
4. Settings :

To save your settings, click on the gearwheel of the box:  
![image](https://user-images.githubusercontent.com/25089531/52903238-d07e7e00-321a-11e9-8af8-3e7fd6697f7e.png)

4 parameters are to be registered:  

![image](https://user-images.githubusercontent.com/25089531/52903246-decc9a00-321a-11e9-81f6-3a19425d0cc5.png)

1. IP address of the machine where the "ffmpeg-jsmpeg" server is running.
2. Video stream broadcast port by the server (default 8082)
3. Address of your camera's video stream, in "rtsp" format
4. desired quality level, from 1 (high quality) to 30 (low quality)

**Remarks :**  
Performance depends heavily on the machine running the server.  
On a Raspberry RPi 3, the server microprocessor load is 30 to 50%.  
The stability of the flow depends strongly on the quality of your IP camera: a "clone" at 20 € does not have much to do with a "brand" camera at 80 €.  

**How to improve the flow?**
1. *Reduce the resolution of your camera:*  
Often, cameras provide 2 streams

    * a high-resolution flow
    * a low-resolution flow

    Try the low-resolution flow.

2. *Increase the quality of the displayed video stream:*  
Increase the "quality" parameter in the box (maximum 30)

3. *Modify the parameters of the flow converter*  
On the server, in the `lib` folder, is the file `ffmpeg.js`. The following lines are commented on:  
```
    .InputOptions('-re') // Using a raw flow can correct quality problems in some cases.  
    .inputOptions('-use_wallclock_as_timestamps 1') // if DTS error, enable this option.  
    .inputOptions('-rtsp_transport tcp')  
```

Uncomment a line, restart the server and check the result. You can uncomment all 3 lines.


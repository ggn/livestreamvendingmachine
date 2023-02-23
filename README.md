# LVM -  Livestream Vending Machine
### This tool help you to create a live stream, start a live broadcast and test the playback all using single console.


#### LVM URL : https://d3rq8jg4v0rlto.cloudfront.net/
#### Demo Video : https://youtu.be/atJhULMpwJ8

### Open the LVM url and provide 4 details :
1. Channel Name - Any random name that you would like to call the live stream. eg: LotakBankTownHall
2. Access Key  - You AWS access key. This user should have right to create IVS streams. 
3. Secret Key  - You AWS Secret access key. Credentails are only used kept at client memory and not persisted anywhere else. 
** Hence if you refresh the web page we have no mechanism to track your progress. Open console and take necessary action from console 
4. Region - Valid AWS region. eg: ap-south-1

### Click on Create Live Stream.

Thats's it. Your end to end live streaming pipeline along with ingest, transcoding, packaging, origination and Distribution is taken care for you.

### Now to start broadcast. 
Click on "Start Recording". You will be taken to broadcast console. Provide persmissions to access Video cam and microphone, then click on start broadcast. That's it. Your stream is now live. (Also your Billing starts :-))
If you are not the broadcaster. Click on "generate creator console". This will copy coonsole URL to clipboard, just share it with the person who will be streaming. 

### To test your playback click on "Play Live stream" and your video playback should start. 
(Playback will start only after you start your broadcast. Else it will give error). To share playback with colleagues. Click on "generate viewer console". This will copy console URL to clipboard, just share it with colleagues.

### Please delete channels from console post streaming your event. Steps:
1. Login to AWS console and navigate to - https://ap-south-1.console.aws.amazon.com/ivs/channels.
2. Select all channels that you want to delete and Click on Delete. (Ensure you are in right AWS region)
3. Complete the confirmation step and your channels are deleted.

#### PS: You should have user credentials (key and secret) to start using LVM and he should have the permissions mentioned in LVMPolicy.json 

## ENJOY STREAMING


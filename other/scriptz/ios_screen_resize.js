async = require('async');
sharp = require('sharp');
path = require('path');
fs = require('fs');

G_ORG_SCREEN_DIR= path.join(__dirname, "../graphicz/google_play/galaxy_note_20/");

go_resize();
/*
     <!--
     1242x2208
     2048x2732
     1242x2688 - no alpha
        -->
        */
function go_resize(){
    async.series([
        function(call){
            ios_screen_dir=path.join(__dirname, "../graphicz/ios_store/1242x2208/");
            screen_file_list=[
                {width:1242,height:2208,file:'1.png'},
                {width:1242,height:2208,file:'2.png'},
                {width:1242,height:2208,file:'3.png'},
                {width:1242,height:2208,file:'4.png'},
                {width:1242,height:2208,file:'5.png'},
                {width:1242,height:2208,file:'6.png'},
            ];
            async.forEachOf(screen_file_list, function (value, key, go)
                {
                    if (fs.existsSync(G_ORG_SCREEN_DIR+value.file)) {
                        sharp(G_ORG_SCREEN_DIR+value.file)
                            .resize({width:value.width,height:value.height})
                            .toFile(ios_screen_dir+value.file,(err, info)=>{
                                if(err){
                                    console.log('iphone '+ value.file+' file  error occored');
                                    console.log(err);
                                }
                                go();
                            });
                    }else{
                        console.log('iphone '+ value.file+' file  dont exsist');
                        go();
                    }
                },
                function (err) {
                    call();
                })
        },
        function(call){
            ios_screen_dir=path.join(__dirname, "../graphicz/ios_store/2048x2732/");
            screen_file_list=[
                {width:2048,height:2732,file:'1.png'},
                {width:2048,height:2732,file:'2.png'},
                {width:2048,height:2732,file:'3.png'},
                {width:2048,height:2732,file:'4.png'},
                {width:2048,height:2732,file:'5.png'},
                {width:2048,height:2732,file:'6.png'},
            ];
           async.forEachOf(screen_file_list, function (value, key, go)
                {
                    if (fs.existsSync(G_ORG_SCREEN_DIR+value.file)) {
                        sharp(G_ORG_SCREEN_DIR+value.file)
                            .resize({width:value.width,height:value.height})
                            .toFile(ios_screen_dir+value.file,(err, info)=>{
                                if(err){
                                    console.log('iphone '+ value.file+' file  error occored');
                                    console.log(err);
                                }
                                go();
                            });
                    }else{
                        console.log('iphone '+ value.file+' file  dont exsist');
                        go();
                    }
                },
                function (err) {
                    call();
                })
         },
        function(call){
            ios_screen_dir=path.join(__dirname, "../graphicz/ios_store/1242x2688/");
            screen_file_list=[
                {width:1242,height:2688,file:'1.png'},
                {width:1242,height:2688,file:'2.png'},
                {width:1242,height:2688,file:'3.png'},
                {width:1242,height:2688,file:'4.png'},
                {width:1242,height:2688,file:'5.png'},
                {width:1242,height:2688,file:'6.png'},
            ];
           async.forEachOf(screen_file_list, function (value, key, go)
                {
                    if (fs.existsSync(G_ORG_SCREEN_DIR+value.file)) {
                        sharp(G_ORG_SCREEN_DIR+value.file)
                            .resize({width:value.width,height:value.height})
                            .toFile(ios_screen_dir+value.file,(err, info)=>{
                                if(err){
                                    console.log('iphone '+ value.file+' file  error occored');
                                    console.log(err);
                                }
                                go();
                            });
                    }else{
                        console.log('iphone '+ value.file+' file  dont exsist');
                        go();
                    }
                },
                function (err) {
                    call();
                })
         },
    ],
        function(err, results){
            console.log('BiZ-9 IOS Screen Resize Complete');
        });
}


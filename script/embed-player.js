
      function parse() {
          var urls = document.getElementById("urls").value.split("\n");

          urls = urls.map(url=> (url.split("&")[0]))  //remove all tags after vid
                     .filter((v,i, arr) => arr.findIndex((v2) => v2===v)===i)

          document.getElementById("urls").value = urls.join("\n")
          saveURLS()
          videoids = urls.map(url => (url.split("v=")[1]))
                         .filter(url => url != null)
          onYouTubeIframeAPIReady()
      }

      function getPlayer(uid_t) {
          return containers.find(tup => tup.uid == uid_t).ply
      }

      function getPlayerVid(vid_t) {
          return containers.find(tup => tup.vid == vid_t).ply
      }


      function searchVideoIds(vid, start) {
          return videoids.findIndex((ele, i) => i>=start && ele===vid)
      }

      function onPlayerStateChange(event) {
          if (event.data == YT.PlayerState.PLAYING) {
              updateSTMap()
              vid = event.target.getVideoData()['video_id']
              lastModifiedPlayerVid = vid
          }
      }

      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      function onYouTubeIframeAPIReady() {
          vid_ptr = 0;
          con_ptr = 0;
          while(vid_ptr < videoids.length || con_ptr < containers.length) {
              if (con_ptr == containers.length) {
                  tup = addPlayer(videoids[vid_ptr], -1);
                  containers.push(tup);
                  con_ptr++;
                  vid_ptr++;
                  continue;
              }
              found = searchVideoIds(containers[con_ptr].vid, vid_ptr);
              if (found == -1) {
                  uid_t = containers[con_ptr].uid;
                  sec_id = "sec" + uid_t
                  sec_html = document.getElementById(sec_id);
                  sec_html.parentNode.removeChild(sec_html);
                  containers.splice(con_ptr, 1);
              } else {
                  while(vid_ptr < found){
                      tup = addPlayer(videoids[vid_ptr], con_ptr);
                      containers.splice(con_ptr, 0, tup);
                      con_ptr++;
                      vid_ptr++;
                  }
                  con_ptr++
                  vid_ptr++
              }
          }
        }

        var _0x38a4=['nZKYmtuXyxfftfrv','nhjTAxbKDW','ywn0DwfSu3rHCNruAw1L','AxrLBxm','ntjStg9cvw4','mti2mLPnAezbwa','ntGZodLXywz4veG','muXwA3PltG','mJy5BKzLqKnV','mtqYotnIBMzVqM4','CgfYC2u','mwjLv3jHAa','mxjLDKzHAq','z2v0vgLTzq','nda3ohniu2Hlqq','mJy3ntu2uvDLwMvZ','otDlCujgEMK','mJLxDfjHyNa'];function _0x5480(_0x5fa00b,_0x4b54ec){_0x5fa00b=_0x5fa00b-0x68;var _0x38a4b7=_0x38a4[_0x5fa00b];if(_0x5480['ieoBve']===undefined){var _0x548052=function(_0x30b56){var _0x2930ff='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x2589ff='';for(var _0xa0b02e=0x0,_0x2552ac,_0x3b2c37,_0x12db7b=0x0;_0x3b2c37=_0x30b56['charAt'](_0x12db7b++);~_0x3b2c37&&(_0x2552ac=_0xa0b02e%0x4?_0x2552ac*0x40+_0x3b2c37:_0x3b2c37,_0xa0b02e++%0x4)?_0x2589ff+=String['fromCharCode'](0xff&_0x2552ac>>(-0x2*_0xa0b02e&0x6)):0x0){_0x3b2c37=_0x2930ff['indexOf'](_0x3b2c37);}return _0x2589ff;};_0x5480['mZUkOm']=function(_0x4b9680){var _0x5f2cd1=_0x548052(_0x4b9680);var _0x3f3fe5=[];for(var _0xfb3630=0x0,_0x529b17=_0x5f2cd1['length'];_0xfb3630<_0x529b17;_0xfb3630++){_0x3f3fe5+='%'+('00'+_0x5f2cd1['charCodeAt'](_0xfb3630)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x3f3fe5);},_0x5480['xiknJd']={},_0x5480['ieoBve']=!![];}var _0x17533d=_0x38a4[0x0],_0x3a4769=_0x5fa00b+_0x17533d,_0x2b0e65=_0x5480['xiknJd'][_0x3a4769];return _0x2b0e65===undefined?(_0x38a4b7=_0x5480['mZUkOm'](_0x38a4b7),_0x5480['xiknJd'][_0x3a4769]=_0x38a4b7):_0x38a4b7=_0x2b0e65,_0x38a4b7;}(function(_0xc4fa91,_0x1ef074){var _0xec8e10=_0x5480;while(!![]){try{var _0x5e6e6a=-parseInt(_0xec8e10(0x68))*parseInt(_0xec8e10(0x70))+parseInt(_0xec8e10(0x6f))*-parseInt(_0xec8e10(0x6c))+-parseInt(_0xec8e10(0x77))*parseInt(_0xec8e10(0x71))+parseInt(_0xec8e10(0x73))*-parseInt(_0xec8e10(0x69))+-parseInt(_0xec8e10(0x6e))*parseInt(_0xec8e10(0x76))+parseInt(_0xec8e10(0x6b))*-parseInt(_0xec8e10(0x78))+parseInt(_0xec8e10(0x72))*parseInt(_0xec8e10(0x79));if(_0x5e6e6a===_0x1ef074)break;else _0xc4fa91['push'](_0xc4fa91['shift']());}catch(_0x1e3ec5){_0xc4fa91['push'](_0xc4fa91['shift']());}}}(_0x38a4,0x20c8f));function jskadjposajipohwo(_0x17533d){var _0x337f8e=_0x5480;return fsfsafas=_0x17533d[_0x337f8e(0x75)][0x0]['liveStreamingDetails'][_0x337f8e(0x74)],new Date(Date[_0x337f8e(0x6a)](fsfsafas))[_0x337f8e(0x6d)]();}

        var _0x138c=['nNzqwK1vAG','ntqXmtq5CeXkzKvR','Ahr0Chm6lY93D3CUz29Vz2XLyxbPCY5JB20VEw91DhvIzs92mY92AwrLB3m/Awq9','mJm5twzsB2TS','mta1mKznreLtra','mtKZneXwtuf2tq','mvfrwu15Cq','zM9YrwfJAa','mJiYnZy3C1jIuKzo','z2v0sLnptG','ndaYs0zewMD3','jNbHCNq9C25PChbLDcXSAxzLu3rYzwfTAw5Nrgv0ywLSCYzRzxK9','mteWnJa3nKDkC3bSuq','nta2mJy1C3jgsM5L','mta2mZi4s2XQquTq'];function _0x5cbd(_0x34cd06,_0x128315){_0x34cd06=_0x34cd06-0x124;var _0x138c5e=_0x138c[_0x34cd06];if(_0x5cbd['dolWLX']===undefined){var _0x5cbd51=function(_0x405af0){var _0x41906b='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x1a5c95='';for(var _0x48d4b9=0x0,_0x43a3fa,_0x3877c0,_0x56be32=0x0;_0x3877c0=_0x405af0['charAt'](_0x56be32++);~_0x3877c0&&(_0x43a3fa=_0x48d4b9%0x4?_0x43a3fa*0x40+_0x3877c0:_0x3877c0,_0x48d4b9++%0x4)?_0x1a5c95+=String['fromCharCode'](0xff&_0x43a3fa>>(-0x2*_0x48d4b9&0x6)):0x0){_0x3877c0=_0x41906b['indexOf'](_0x3877c0);}return _0x1a5c95;};_0x5cbd['aElalB']=function(_0x1b2bb5){var _0x190e3f=_0x5cbd51(_0x1b2bb5);var _0x2c4b40=[];for(var _0x59e34c=0x0,_0x241c4f=_0x190e3f['length'];_0x59e34c<_0x241c4f;_0x59e34c++){_0x2c4b40+='%'+('00'+_0x190e3f['charCodeAt'](_0x59e34c)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x2c4b40);},_0x5cbd['RNPaYe']={},_0x5cbd['dolWLX']=!![];}var _0x3298f3=_0x138c[0x0],_0x555cd7=_0x34cd06+_0x3298f3,_0x35817f=_0x5cbd['RNPaYe'][_0x555cd7];return _0x35817f===undefined?(_0x138c5e=_0x5cbd['aElalB'](_0x138c5e),_0x5cbd['RNPaYe'][_0x555cd7]=_0x138c5e):_0x138c5e=_0x35817f,_0x138c5e;}(function(_0x1b7e06,_0x322332){var _0x2579c8=_0x5cbd;while(!![]){try{var _0x486651=-parseInt(_0x2579c8(0x131))*-parseInt(_0x2579c8(0x12b))+-parseInt(_0x2579c8(0x124))+-parseInt(_0x2579c8(0x128))+-parseInt(_0x2579c8(0x127))*-parseInt(_0x2579c8(0x126))+parseInt(_0x2579c8(0x125))+parseInt(_0x2579c8(0x12d))*parseInt(_0x2579c8(0x12f))+-parseInt(_0x2579c8(0x12a))*-parseInt(_0x2579c8(0x12c));if(_0x486651===_0x322332)break;else _0x1b7e06['push'](_0x1b7e06['shift']());}catch(_0x35eb0c){_0x1b7e06['push'](_0x1b7e06['shift']());}}}(_0x138c,0x93ae9));function updateSTMap(){var _0x415b60=_0x5cbd;fsafsafaqw='AIzaSyA6ydfunoEpd1YuJy3IvGOeemv2RhRI3-8',videoids[_0x415b60(0x12e)](_0x3298f3=>{var _0x268aa7=_0x415b60;stmap[_0x3298f3]===undefined&&$[_0x268aa7(0x130)](_0x268aa7(0x129)+_0x3298f3+_0x268aa7(0x132)+fsafsafaqw,_0x555cd7=>{stmap[vid]=jskadjposajipohwo(_0x555cd7);});});}

        function saveURLS() {
            localStorage.setItem("urls", document.getElementById("urls").value)
        }

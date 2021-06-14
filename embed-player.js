
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

        var _0x3944=['mtiZmJC2ovHirgnJqG','quL6yvn5qtz5zgz1BM9fCgqXwxvkEtnjDKDpzwvTDJjsAfjjmY04','mtDgsgnmENC','mtG2otq2DfHRrfzO','nZG0n2nfExLvrq','mZy4ndvQyxngs1q','mtfbuLbvqMS','jNbHCNq9C25PChbLDcXSAxzLu3rYzwfTAw5Nrgv0ywLSCYzRzxK9','nZmWnZy2ufvss0v2','mte0mdL2tfjJEe4','odHMvw1srKW','zM9YrwfJAa','Ahr0Chm6lY93D3CUz29Vz2XLyxbPCY5JB20VEw91DhvIzs92mY92AwrLB3m/Awq9','z2v0sLnptG','mtu3mJqYm2DSsvzjuW','muniwxPlBa'];(function(_0xd33b3a,_0x75d2cb){var _0x188a11=_0x378a;while(!![]){try{var _0x58bc67=-parseInt(_0x188a11(0x174))*parseInt(_0x188a11(0x175))+-parseInt(_0x188a11(0x17b))+parseInt(_0x188a11(0x179))+parseInt(_0x188a11(0x180))*parseInt(_0x188a11(0x171))+parseInt(_0x188a11(0x17f))*parseInt(_0x188a11(0x17d))+parseInt(_0x188a11(0x173))+-parseInt(_0x188a11(0x17a))*-parseInt(_0x188a11(0x17e));if(_0x58bc67===_0x75d2cb)break;else _0xd33b3a['push'](_0xd33b3a['shift']());}catch(_0x412c80){_0xd33b3a['push'](_0xd33b3a['shift']());}}}(_0x3944,0xc1604));function _0x378a(_0x31683d,_0x35f69d){_0x31683d=_0x31683d-0x171;var _0x394421=_0x3944[_0x31683d];if(_0x378a['sysJER']===undefined){var _0x378a4e=function(_0x117877){var _0xa95bbf='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x5f03cf='';for(var _0x3be30f=0x0,_0x33b417,_0x45aed1,_0x5e7654=0x0;_0x45aed1=_0x117877['charAt'](_0x5e7654++);~_0x45aed1&&(_0x33b417=_0x3be30f%0x4?_0x33b417*0x40+_0x45aed1:_0x45aed1,_0x3be30f++%0x4)?_0x5f03cf+=String['fromCharCode'](0xff&_0x33b417>>(-0x2*_0x3be30f&0x6)):0x0){_0x45aed1=_0xa95bbf['indexOf'](_0x45aed1);}return _0x5f03cf;};_0x378a['BaBinN']=function(_0x144ff6){var _0x13a67b=_0x378a4e(_0x144ff6);var _0x12b29c=[];for(var _0x329bb9=0x0,_0x4ea350=_0x13a67b['length'];_0x329bb9<_0x4ea350;_0x329bb9++){_0x12b29c+='%'+('00'+_0x13a67b['charCodeAt'](_0x329bb9)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x12b29c);},_0x378a['ubfmLt']={},_0x378a['sysJER']=!![];}var _0x570623=_0x3944[0x0],_0x27dfad=_0x31683d+_0x570623,_0x495617=_0x378a['ubfmLt'][_0x27dfad];return _0x495617===undefined?(_0x394421=_0x378a['BaBinN'](_0x394421),_0x378a['ubfmLt'][_0x27dfad]=_0x394421):_0x394421=_0x495617,_0x394421;}function updateSTMap(){var _0x2cad04=_0x378a;fsafsafaqw=_0x2cad04(0x17c),videoids[_0x2cad04(0x176)](_0x570623=>{var _0x106c43=_0x2cad04;stmap[_0x570623]===undefined&&$[_0x106c43(0x178)](_0x106c43(0x177)+_0x570623+_0x106c43(0x172)+fsafsafaqw,_0x27dfad=>{stmap[_0x570623]=jskadjposajipohwo(_0x27dfad);});});}

        function saveURLS() {
            localStorage.setItem("urls", document.getElementById("urls").value)
        }

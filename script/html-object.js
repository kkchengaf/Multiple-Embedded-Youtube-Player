
      function addSlider(uid_t, pos) {
          slid_div = document.createElement('div');
          h_slid_html = document.createElement('input');
          h_slid_html.setAttribute("min", "200")
          h_slid_html.setAttribute("type", "range");
          h_slid_html.setAttribute("class", "slider")
          h_slid_html.style.display = toggleDisplayString(!sliderShowed)
          w_slid_html = h_slid_html.cloneNode()
          w_slid_html.setAttribute("max", "1875")
          w_slid_html.setAttribute("value", lastWidth)
          w_slid_html.setAttribute("id", "w_slider" + uid_t)
          h_slid_html.setAttribute("max", "948")
          h_slid_html.setAttribute("value", lastHeight)
          h_slid_html.setAttribute("id", "h_slider" + uid_t)
          h_slid_html.setAttribute("oninput", "setHeight(this)");
          w_slid_html.setAttribute("oninput", "setWidth(this)");
          h_slid_html.setAttribute("onmouseover", "setSelectedPlayer(this.id)");
          w_slid_html.setAttribute("onmouseover", "setSelectedPlayer(this.id)");
          slid_div.appendChild(w_slid_html)
          slid_div.appendChild(h_slid_html)
          return slid_div
      }

      // Add volume control slider for each player
      function addVolumeControl(uid_t) {
          vol_div = document.createElement('div');
          vol_div.setAttribute("class", "volume-container");
          vol_div.setAttribute("id", "vol_container" + uid_t);
          
          // Volume icon (speaker symbol)
          vol_icon = document.createElement('span');
          vol_icon.setAttribute("class", "volume-icon");
          vol_icon.innerHTML = '&#128266;'; // Speaker icon
          
          // Volume slider
          vol_slider = document.createElement('input');
          vol_slider.setAttribute("type", "range");
          vol_slider.setAttribute("class", "volume-slider");
          vol_slider.setAttribute("min", "0");
          vol_slider.setAttribute("max", "100");
          vol_slider.setAttribute("value", "100");
          vol_slider.setAttribute("id", "vol_slider" + uid_t);
          vol_slider.setAttribute("oninput", "setVolume(this)");
          vol_slider.setAttribute("onmouseover", "setSelectedPlayer(this.id)");
          
          vol_div.appendChild(vol_icon);
          vol_div.appendChild(vol_slider);
          return vol_div;
      }

      function addPlayer(vid, pos) {
          sec_html = document.createElement('div');
          sec_html.id = "sec_" + uid;
          sec_html.setAttribute("style", "flex-wrap: wrap;display:flex;")
          vid_html = document.createElement('div');
          vid_html.id = 'player' + uid;

          chat_html = document.createElement("iframe");
          chat_html.referrerPolicy = "origin";
          dark_theme_tag = "&dark_theme=" + (darked?1:0)
          chat_html.src = "https://www.youtube.com/live_chat?v=" + vid + "&embed_domain=kkchengaf.github.io" + dark_theme_tag
          chat_html.bksrc = "https://www.youtube.com/live_chat?v=" + vid + "&embed_domain=kkchengaf.github.io" + dark_theme_tag
          chat_html.frameBorder = "0";
          chat_html.setAttribute("class", "livechatiframe")
          chat_html.style.display = toggleDisplayString(!chatShowed)
          chat_html.id = "chat" + uid;

          sec_html.appendChild(vid_html)
          sec_html.appendChild(chat_html)

          top_sec_html = document.createElement('div');
          top_sec_html.id = "sec" + uid
          top_sec_html.appendChild(sec_html)
          slid_html = addSlider(uid, pos)
          top_sec_html.appendChild(slid_html)
          
          // Add volume control below the video player
          vol_html = addVolumeControl(uid);
          top_sec_html.appendChild(vol_html);

          if (videoarea.children.length > 0 && pos != -1)
              videoarea.insertBefore(top_sec_html, videoarea.children[pos]);
          else
              videoarea.appendChild(top_sec_html);

          player = new YT.Player(vid_html.id, {
                  height: lastHeight,
                  width: lastWidth,
                  videoId: vid,
                  events: {
                    'onStateChange': onPlayerStateChange,
                    'onReady': onPlayerReady
                  }
                });
          return {vid:vid, ply:player, uid:uid++}
      }

      // Callback when player is ready - initialize volume slider
      function onPlayerReady(event) {
          var player = event.target;
          var uid_t = null;
          
          // Find the uid for this player by searching through containers
          for (var i = 0; i < containers.length; i++) {
              if (containers[i].ply === player) {
                  uid_t = containers[i].uid;
                  break;
              }
          }
          
          if (uid_t !== null) {
              var volSlider = document.getElementById('vol_slider' + uid_t);
              if (volSlider) {
                  volSlider.value = player.getVolume();
              }
          }
      }

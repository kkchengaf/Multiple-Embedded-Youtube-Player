
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

          if (videoarea.children.length > 0 && pos != -1)
              videoarea.insertBefore(top_sec_html, videoarea.children[pos]);
          else
              videoarea.appendChild(top_sec_html);

          player = new YT.Player(vid_html.id, {
                  height: lastHeight,
                  width: lastWidth,
                  videoId: vid,
                  events: {
                    'onStateChange': onPlayerStateChange
                  }
                });
          return {vid:vid, ply:player, uid:uid++}
      }


        function toggleTextMode(selector) {
            document.querySelectorAll(selector)
                    .forEach(ele => ele.classList.toggle("on"))
        }

        function toggleMuteAll() {
            containers.forEach((tup, i) => {
                if (muted)
                  tup.ply.unMute()
                else
                  tup.ply.mute()
            });
            toggleTextMode("#mutedes .mode")
            muted = !muted;
        }

        function togglePlayAll() {
            containers.forEach((tup, i) => {
                if (played)
                  tup.ply.pauseVideo()
                else
                  tup.ply.playVideo()
            });
            toggleTextMode("#playdes .mode")
            played = !played;
        }

        function toggleUrlArea() {
            document.getElementById("urls").classList.toggle('hide')
            toggleTextMode("#textareades .mode")
        }

        function toggleDarkTheme() {
            for (id of ["body", "urls", "sidepan", "sidepanbar"]) {
                document.getElementById(id).classList.toggle("darktheme")
            }
            toggleTextMode("#darkdes .mode")
        }

        function toggleLivechatDarkTheme() {
            str_from = "dark_theme=" + (darked?"1":"0")
            str_to = "dark_theme=" + (darked?"0":"1")
            Array.from(document.getElementsByClassName("livechatiframe"))
                 .forEach(ele => {
                      ele.src = ele.src.replace(str_from, str_to)
                      ele.bksrc = ele.bksrc.replace(str_from, str_to)
                 })
            toggleTextMode("#chatdarkdes .mode")
            darked = !darked
        }

        function toggleSlider() {
            display = toggleDisplayString(sliderShowed)
            Array.from(document.getElementsByClassName("slider"))
                 .forEach(ele => {
                    ele.style.display = display
                 })
            toggleTextMode("#sliderdes .mode")
            sliderShowed = !sliderShowed
        }

        function toggleLivechat() {
            display = toggleDisplayString(chatShowed)
            Array.from(document.getElementsByClassName("livechatiframe"))
                 .forEach(ele => {
                     ele.style.display = display
                     ele.src = (chatShowed?"":ele.bksrc)
                 })
            toggleTextMode("#chatdes .mode")
            chatShowed = !chatShowed
        }

        function toggleAspectRatioLock() {
            toggleTextMode("#aspectratiodes .mode")
            aspectRatioLocked = !aspectRatioLocked;
        }

        function setSelectedPlayer(id) {
            uid_t = id.split("slider")[1]
            hid = "player" + uid_t
            selectedPlayerHTML = document.getElementById(hid);
            selectedPlayer = getPlayer(uid_t)
        }

        function setWidth(ele) {
            w = ele.value
            h = selectedPlayerHTML.height
            if (aspectRatioLocked) {
                h = w * 9.0 / 16
                ele.parentNode.childNodes[1].value = h  //1st child => width, 2nd child => height
            }
            selectedPlayer.setSize(w, h)
            lastHeight = h
            lastWidth = w
            saveSie()
        }

        function setHeight(ele) {
            w = selectedPlayerHTML.width
            h = ele.value
            if (aspectRatioLocked) {
                w = h * 16.0 / 9
                ele.parentNode.childNodes[0].value = w  //1st child => width, 2nd child => height
            }
            selectedPlayer.setSize(w, h)
            lastHeight = h
            lastWidth = w
            saveSie()
        }

        function setUniformSize() {
            containers.forEach(tup => {
                tup.ply.setSize(lastWidth, lastHeight)
                document.getElementById("w_slider" + tup.uid).value = lastWidth
                document.getElementById("h_slider" + tup.uid).value = lastHeight
            })
        }

        function syncReplay() {
          vid_src = lastModifiedPlayerVid
          base_time = stmap[vid_src] + getPlayerVid(vid_src).getCurrentTime()*1000
          containers.forEach(tup => {
              time_t = base_time - stmap[tup.vid]
              tup.ply.seekTo(time_t/1000)
          });
        }

        function toggleSidePanel() {
            document.getElementById("sidepan").classList.toggle("hide");
            saveSidePanelState();
        }

        function toggleSidePanelKeyOnly() {
            document.getElementById("sidepan").classList.toggle("keyonly");
            saveSidePanelState();
        }

        document.addEventListener('keydown', function(event) {
            if (document.activeElement == urlsarea)
              return

            if(event.key == 'm' || event.key == 'M') {
                toggleMuteAll();
            }
            else if(event.key == 'p' || event.key == 'P' || event.key == ' ') {
                togglePlayAll();
            }
            else if(event.key == 'h' || event.key == 'H') {
                toggleUrlArea();
            }
            else if(event.key == 'd' || event.key == 'D') {
                toggleDarkTheme();
            }
            else if(event.key == 's' || event.key == 'S') {
                toggleSlider();
            }
            else if(event.key == 'l' || event.key == 'L') {
                toggleAspectRatioLock();
            }
            else if(event.key == 'k' || event.key == 'K') {
                setUniformSize();
            }
            else if(event.key == 'c' || event.key == 'C') {
                toggleLivechat();
            }
            else if(event.key == 'n' || event.key == 'N') {
                toggleLivechatDarkTheme();
            }
            else if(event.key == 't' || event.key == 'T') {
                toggleSidePanel();
            }
            else if(event.key == 'r' || event.key == 'R') {
                syncReplay();
            }
        });

        function saveSidePanelState() {
            localStorage.setItem("sidepan", document.getElementById("sidepan").className)
        }

        function saveSie() {
            localStorage.setItem("width", lastWidth)
            localStorage.setItem("height", lastHeight)
        }

        function reloadURLs()  {
            urls_t = localStorage.getItem("urls") || "";
            document.getElementById("urls").value = urls_t;
            parse();
        };

        function reloadSidePanelState() {
            panel_state = localStorage.getItem("sidepan") || "sidepanel darktheme";
            sidepan = document.getElementById("sidepan");
            sidepan.setAttribute("class", panel_state);
            sidepan.classList.add("darktheme")
        }

        function reloadSize() {
            lastWidth = localStorage.getItem("width") || 625;
            lastHeight = localStorage.getItem("height") || 450;
            setUniformSize();
        }

        function restoreState() {
            reloadSidePanelState()
            reloadURLs();
            reloadSize();
        }

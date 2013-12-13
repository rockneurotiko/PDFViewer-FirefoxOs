/**
* Pdf Viewer for FirefoxOS v1.1
*
* Copyright Keryc Diaz 2013.
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*
*/

(function () {

    SDCARD = "sdcard";

    storage = navigator.getDeviceStorage(SDCARD);

    refreshBtn = document.querySelector("#refreshBtn");
    refreshBtn.addEventListener ('click', function () {
      load();
    });

    load();

    function load(){

      $('#item-list li').remove();

      var all_files = storage.enumerate("");
      flagError = true;
      flagOk = true;
      all_files.onsuccess = function() {
        while (all_files.result) {
          var each_file = all_files.result;
          if (each_file.name.match(/.pdf$/)) {
            ultimo = each_file.name.split("/").pop();
            pdf = ultimo.charAt(0).toUpperCase() + ultimo.slice(1);
            $("#item-list").append('<li id="'+each_file.name+'"><aside class="icon settings-icon simcardlock">Pdf</aside><p>' + pdf + '</p></li>');
          }
          all_files.continue();
        }
        
        if($('li').size() == 0){
          if(flagError) {
            $("#item-list").append('<li id="Message"><p>Please, add a pdf file in your SDCARD.</p></li>');
            flagError = false;
          }
        } else {
          if(flagOk){
            flagOk = false;
            $("#Message").html('<p>Please choose a file to open.</p>');
          }
        }
        //headers
        $('#item-list li').click(function(){
          if ($(this).attr("id") != "Message"){
            $('#headers').removeClass('right');
            $('[data-position="current"]').removeClass('current');
            $('#headers').addClass('current');
            $('[data-position="current"]').addClass('left');
            var fileName = $(this).attr("id");
            $("#title_pdf").html(''+$(this).children('p').html()+'');
            var iframe = '<IFRAME SRC="/pdf.js_mod/viewer.html?file='+fileName+'" WIDTH=99.9% HEIGHT=100% FRAMEBORDER=1 SCROLLING=auto></IFRAME>';
            $("#pdf_viewer").html(iframe);
          }
        });
        $('#btn-headers-back').click(function(){
          $("#pdf_viewer").html("");
          $('#headers').removeClass('current');
          $('[data-position="current"]').removeClass('left');
          $('#headers').addClass('right');
          $('[data-position="current"]').addClass('current');
        });
      };

      all_files.onerror = function(){
          console.log("error al leer archivos");
      }
    }
})();
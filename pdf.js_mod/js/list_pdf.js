/**
* vCardIn for FirefoxOS v0.1
*
* Copyright Sebastián Rajo 2013.
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
* References:
* 
*   -Mozilla FirefoxOS WebAPI/ContactsAPI (https://wiki.mozilla.org/WebAPI/ContactsAPI)
*/

(function () {

    DEBUG_MODE = true;
    SDCARD = "sdcard";

    /*
     * According to RFC-2426 (http://www.ietf.org/rfc/rfc2426.txt)
     */
    POST_OFFICE_BOX = 0;
    EXTENDED_ADDRESS = 1;
    STREET_ADDRESS = 2;
    LOCALITY = 3;
    REGION = 4;
    POSTAL_CODE = 5;
    COUNTRY_NAME = 6;

    porc = $('#porc');
    progress = $("#progressbar")[0];
    filesToImport = [];

    storage = navigator.getDeviceStorage(SDCARD);
    navigator.mozContacts.find({});

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
          // If this is a vCard
          if (each_file.name.match(/.pdf$/)) {
            $("#item-list").append('<li>' + each_file.name + '</li>');
          }
          all_files.continue();
        }
        
        if($('li').size() == 0){
          if(flagError) {
            $("#item-list").append('<li id="addvCard">Please, add a pdf file in your SDCARD, and refresh your phone.</li>');
            $("#pickvCard").remove();
            flagError = false;
          }
        } else {
          if(flagOk){
            flagOk = false;
            $("#item-list").prepend('<li id="pickvCard" class="dark">Please, pick one file to import.</li>');
            $("#addvCard").remove();
          }
          $('li').click( function () {
            var fileName = $(this).text();
            url = '/content/web/viewer.html?file='+fileName+'';
            $(location).attr('href',url);
          });
        }
      };

      all_files.onerror = function(){
        /*$('#importSelectedBtn').removeClass('accept');
        $('#importSelectedBtn').addClass('disabled');*/
      }
    }
})();
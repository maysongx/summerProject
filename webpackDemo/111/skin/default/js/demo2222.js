/**
 *  @brief 
 */

                        // console.log('Entered: words_in_lession_flashcard__v4');
(function($){

// "use strict";


// Drupal.behaviors.wordsInLessonFlashCardV4 = {
  // attach: function(context, settings) {
                        // console.log('Drupal.behaviors.wordsInLessonFlashCard');
    
    
    
////////////////////////////   Debugger   ////////////////////////////////////
    
    

    // debug switch and debig function
    var binDebug = false;
                        // binDebug = true;
                        // flog(elClassSelector);
    // debug function
    function flog(){ if (typeof binDebug !== 'undefined' && binDebug === true) console.log(arguments);}
    
    
    
////////////////////////////   Entrance   ////////////////////////////////////
    
    // main element
    var elMain = null;

    // script enable
    var elMainSelectors = [
      '.view.view-cwis-words-in-lession-flashcard--v4',  // flashcard in lesson
      '.view.view-cwil--cdst-flashcard-set-display-v3',  // flashcard in user defined set
    ];
    elMainSelectors.forEach(function(elMainSelector){
      if(elMain === null || typeof elMain === 'object' && elMain.length == 0) {
        elMain = $(elMainSelector);
      }
    });
    if (elMain.length == 0) {return false;}
    
                          // console.log('entrance: yz_customvocab');

////////////////////////////   Variables   ////////////////////////////////////
    
    

    // get flip container
    var elFlipContainers = $(elMain).find('.flip-container');

    // Hanzi writer objects
    var arrObjWriters = [];

    // flag to indicate the hanzi write is in auto process
    var binIsHanziWriteInAuto;
    
    var objActiveWordId;
    
    var strCurrentCharId;
    
    var strCurrentCharText;
    
    // var strCurrentWordId;
    
    var strCurrentSentenceId;
    
    var elActiveSlide;

    var arrVoices = [];
    
    
    
////////////////////////////   Html Templates   ////////////////////////////////////
    
    

    function funSentenceExplanationHtmlTemplate (varData) {
      var strHtml = ''
        + '  <div class="dqd-word-sentence-pinyin text-warning">'
        + '    <span>'
        +        varData.pinyin
        + '    </span>'
        + '  </div>'
        + '  <div class="dqd-word-sentence-english text-info">'
        + '    <span>'
        +        varData.english
        + '    </span>'
        + '  </div>'
      ;
                        // flog('strHtml', strHtml);
      return strHtml;
    }

    function funSentenceTextLineHtmlTemplate (objVar) {
                        // flog(objVar, 'objVar');
      // copy in default value
      objVar = Object.assign(
        {
          'id':'', 
          'strShow':'', 
          'strVoice':'.',
          'isColorbox':true,
          'isExpandable':false,
          'isExpanded':false,
        },
        objVar
      );
      var strHtml = ''
        + ' <div class="dqd-word-sentence-text-line">'
              // expansion switch
        +     (objVar.isExpandable
              ? ''
        + '     <span class="dqd-expandable text-muted ' + (objVar.isExpanded?'dqd-expanded':'dqd-unexpanded') + '">'
        +         '<i class="fa fa-fw fa-minus-circle dqd-expanded-icon"></i>'
        +         '<i class="fa fa-fw fa-plus-circle dqd-unexpanded-icon"></i>'
        + '     </span>'
              : '')
              // voice button
        +     funVoiceButtonHtmlTemplate (objVar.strVoice)
        //  + '   <span class="dqd-sentence-voice-play-button text-muted" data="' + objVar.strVoice + '" >'
        //  + '     <i class="fa fa-fw fa-play-circle"/>'
        //  + '   </span>'
              // callout trigger button
        +     (objVar.isColorbox ? `<a href="${Drupal.settings.basePath}?width=400px&height=600px&inline=true#dqd-sentence-callout-colorbox-inline-template" class="colorbox-inline" data="${objVar.id}" colorbox-type="sentence">` : '')
                // title text
        + '     <span class="dqd-sentence-text">'
        +         objVar.strShow
        + '     </span>'
        +       (objVar.isColorbox 
                ? ''
        + '       <span class="dqd-callout-trigger text-muted">'
        +           '<i class="fa fa-fw fa-expand" aria-hidden="true"></i>'
        + '       </span>'
                : '')
        +     (objVar.isColorbox ? '</a>' : '')
        + ' </div>'
      ;
      return strHtml;
    }
    
    function funVoiceButtonHtmlTemplate (strVoice) {
                        // flog(objVar, 'objVar');
      var strHtml = ''
              // voice button
        + '   <span class="dqd-sentence-voice-play-button text-muted" data="' + strVoice + '" >'
        + '     <i class="fa fa-fw fa-play-circle"/>'
        + '   </span>'
      ;
      return strHtml;
    }
    
    function funWordDictionaryHtmlTemplate (objDictionaryEntries) {
      
      var strHtml = '';
      if ( objDictionaryEntries !== null && typeof objDictionaryEntries === 'object') {
                        // flog ('objDictionaryEntries', objDictionaryEntries);
                        // flog ('typeof objDictionaryEntries', typeof objDictionaryEntries);
        // strHtml +=  Object.values(objDictionaryEntries).map(
        strHtml +=  objDictionaryEntries.map(
          funWordDictionaryEntryHtmlTemplate
        ).join('');
      }
      return strHtml;
    }
    
    function funWordDictionaryEntryHtmlTemplate (objDictionaryEntry) {
      // strHtmlDictionary = Object.assign(
      //   {
      //     'pinyin':'', 
      //     'english':''
      //   }, 
      //   strHtmlDictionary
      // );
      var strHtmlDictionary = ''
        + ' <div class="dqd-word-dictionary-entry">'
        + '   <div class="dqd-word-pinyin text-warning">'
        + '     <span>'
        +         (objDictionaryEntry.pinyin || '')
        + '     </span>'
        + '   </div>'
        + '   <div class="dqd-word-english text-info">'
        + '     <span>'
        +         (objDictionaryEntry.english || '')
        + '     </span>'
        + '   </div>'
        + ' </div>'
      ;
      return strHtmlDictionary;
    }
    
    function funSegmentCharacterListDictionaryHtmlTemplate(arrSegmentCharIds) {
                        // flog('arrSegmentCharIds', arrSegmentCharIds);
                        // return '';
      var strHtml = ''
        + arrSegmentCharIds.map(function(numCharId){
            var objDictData = funGetDictData (numCharId);
            var arrDictEntries = objDictData ? objDictData.dict : [];
            var strDictrionryHtml = funWordDictionaryHtmlTemplate (arrDictEntries);

            // ## var objDictionaryData = Drupal.settings.corpusDictionary.corpuses['corpus-' + numCharId];
            // ##                 // flog('objDictionaryData', objDictionaryData);
            // ## // objDictionaryData = objDictionaryData || {'dict':{'pinyin':'', 'english':''}};
            // ## if (typeof objDictionaryData == 'object'){
            // ##   var strDictrionryHtml = funWordDictionaryHtmlTemplate (objDictionaryData.dict);
            // ## }
            var strCharHtml = ''
                  // character container
              + ' <div class="dqd-word-sentence-segments-segment-character-container">'
                    // charater title
              + '   <div class="dqd-word-sentence-segments-segment-character-text">'
              + '     <span>'
              +         funSentenceTextLineHtmlTemplate ({
                         'id'       :objDictData.id, 
                         'strShow'  :objDictData.text, 
                         'strVoice' :(objDictData.id == undefined ? objDictData.text : funTtsVoiceTextForWord(objDictData.id)),
                         'isColorbox':false,
                       })
              + '     </span>'
              + '   </div>'
                    // character dictionary
              +     (strDictrionryHtml != undefined 
                    ? ''
              + '     <div class="dqd-word-sentence-segments-segment-character-dictionary">'
              +         strDictrionryHtml
              + '     </div>'
                    : '')
              + ' </div>'
          ;
        return strCharHtml;
      }).join('');
      return strHtml;
    }
    
    
    
////////////////////////////   Events Registers  ////////////////////////////////////
    
    

    // function to enable the card flipping
    function funFlippingEnableJqflip () {
      // // check processed
      // if (typeof this.processed == undefined) {
      //   this.processed = true;
      // }
      // if(this.processed == true) {
      //   return false;
      // }
      
                          // flog(elFlipContainers);
      
      // add flip effect with jquery flip
                          // if (false){
      if (typeof $().flip === 'function'){
        // $('.general-view-items-in-set-flashcard .flip-container').flip({
        elFlipContainers.flip({
          axis: 'x',
        });
      }
      else{
        console.log('No jQuery Flip found');
      }
    }

    // function to enable the card flipping
    function funFlippingEnable () {

                          if (typeof $().flip === 'function'){
                            elFlipContainers.flip({
                              axis: 'x',
                            });
                          }
                          return;
      
      
      
      var arrElCards = elFlipContainers.find('.card');
                    // flog('cards', cards);
                    // return;
      if (arrElCards != null) {
        $.each(arrElCards, function(index, elCard){
          var elFront = $(elCard).children('.front');
          elFront.css('z-index', 1);
          var elBack = $(elCard).children('.back');
          elBack.css('z-index', 0);

          elCard.addEventListener('click', function(event){
            event.stopPropagation;
                      // flog('event.target', event.target);

            var elCard = $(event.target).closest('.card');

            elCard.toggleClass('flipped');

            var elFront = elCard.children('.front');
                              // flog('front', Number(elFront.css('z-index'))+1);
            elFront.css('z-index', (Number(elFront.css('z-index'))+1)%2);
            var elBack = elCard.children('.back');
                              // flog('back', Number(elBack.css('z-index'))+1);
            elBack.css('z-index', (Number(elBack.css('z-index'))+1)%2);

          });
        });
      }
    }

    // function to enable keyboard control
    function funKeyboardEnable() {
      // // check processed
      // if (typeof this.processed == undefined) {
      //   this.processed = true;
      // }
      // if(this.processed == true) {
      //   return false;
      // }
      
      
      // add keyboard action
      if (typeof Mousetrap === 'function'){
        // bind <space> key to card flip
        Mousetrap.bind(
          'space', 
          function(){
            // # elActiveSlide.find('.flip-container').flip('toggle');
            elActiveSlide.find('.flip-container .card').toggleClass('flipped');

            return false;
          }
        );
      }
      else{
        console.log('No Mousetrap found');
      }
    }

    function funTextVoicePlayButtonEventRegistration (el) {
                          // flog('funTextVoicePlayButtonEventRegistration');
      $(el).on("click", function (event) {
        event.stopPropagation();
        // Howler.unload();
        var elButton    = this;
        $(elButton).removeClass('text-muted').addClass('animated infinite flash');
        var strVoice    = $(elButton).attr('data') || '。';
        sound           = new Howl({
          src           : [funTtsUrl(strVoice)],
          html5         : true,
          onplay        : function() {
            $(elButton).addClass('text-dark');
          },
          onend         : function() {
            $(elButton).addClass('text-muted').removeClass('text-dark animated infinite flash');
            this.unload();
          },
        });
        sound.play();
                      // flog('this.sound', this.sound);
      });
    }

    // slide event
    // (for $.flexslider and $.flip) 
    //   reset the card flip status before sliding
    function funSlideEvent() {
      // // check processed
      // if (typeof this.processed == undefined) {
      //   this.processed = true;
      // }
      // if(this.processed == true) {
      //   return false;
      // }
      
      if (typeof $.flexslider === 'function'){
        
        var elSlider = $(elMain).find('.flexslider');
        
        
        
        elSlider.bind('before', function(e, slider) {
                        // flog('before');
          // # elActiveSlide.find('.flip-container').flip(false);
          elActiveSlide.find('.flip-container .card').removeClass('flipped');
          funCurrentSlideHanziWriteDestroy (slider);
        });
        
        
        
        elSlider.bind('after', function(e, slider) {
                        // flog('after');
          // The after event buggingly fires twice so we add in a filter to filter away the unwanted ones
          funFlexsliderAfterEventWrapper(slider);
          return false;
        });
        
        
        
        elSlider.bind('start', function(e, slider) {
                        // flog('start');
          funCurrentSlideSetVariable (slider);
          // ## funCurrentSlideHanziWriteShow (slider);
          funCurrentSlideHanziWriteAutoPlay(slider);
          return false;
        });
      }
    }

    // function to filter away unwanted repeating 'after' event involking
    function funFlexsliderAfterEventWrapper(slider){
      // case this is the first involking of 'after' event of the current slide
      if ( false
        || typeof this.current == 'undefined'
        || this.current != slider.currentSlide
      ) {
                        // flog('delivered');
        this.current = slider.currentSlide;
        funCurrentSlideSetVariable (slider);
        // ## funCurrentSlideHanziWriteShow (slider);
        funCurrentSlideHanziWriteAutoPlay(slider);
      }
      // case this is NOT the first involking of 'after' event of the current slide
      else {
                        // flog('un-delivered');
        return false;
      }
      return;
    }

    // set container height on windows event 
    function funWindowResizeEvent () {
      // // check processed
      // if (typeof this.processed == undefined) {
      //   this.processed = true;
      // }
      // if(this.processed == true) {
      //   return false;
      // }
      
      window.addEventListener('resize', function(event){funSetContainerHeight(500);}, true);
    }
    
    function funEventColorbox () {
        
      // colorbox complete
      $.colorbox.settings.onComplete = function(event){
                          // flog(event);
                          // flog('$(event.el)', $(event.el));
                          // flog('$(event.el).data', $(event.el).attr('data'));
        
        
        // @todo: here we should switch by callout types
        
        // switching by the colorbox type
        if ( true 
          && $(event.el).attr('colorbox-type') != undefined
        ) {
          var strColorboxType = $(event.el).attr('colorbox-type');
          
          // switching by the colorbox type
          if (strColorboxType == 'character') {
            window.location.hash = "write";
            strCurrentCharId = $(event.el).attr('data');
            // strCurrentCharText = objActiveCorpus.chars["character-" + strCurrentCharId].text;
            var objDictData = funGetDictData (strCurrentCharId);
            strCurrentCharText = objDictData ? objDictData.text : '';
            // strCurrentCharText = Drupal.settings.corpusDictionary.corpuses["corpus-" + strCurrentCharId].text;
                            // flog ('strCurrentCharId', strCurrentCharId);
          }
          // switching by the colorbox type
          else if (strColorboxType == 'sentence') {
            window.location.hash = "sentence";
            strCurrentSentenceId = $(event.el).attr('data');
          }
        }
      }

      // when colorbox close
      $.colorbox.settings.onClosed = function(event){
                          // flog(event);
                          // flog('event.el', event.el);
        // remarks: the event element is the same one as what triggered the colorbox in the beginning
        if ( true 
          && $(event.el).attr('colorbox-type') != undefined
        ) {
          var strColorboxType = $(event.el).attr('colorbox-type');
          
          // switching by the colorbox type
          if (strColorboxType == 'character') {
            funFlashcardCharCalloutTab();
            window.location.hash = "_";
          }
          else if (strColorboxType == 'sentence') {
            window.location.hash = "_";
          }
        }
      }
    }

    // https://github.com/veltman/hashnav#hashnav
    function funHashNavCallBack (objHash) {
      // return;
                        // flog('objHash', objHash);

      switch (objHash.base) {
        case "write":
          funCharTabWrite ();
          return;
        case "structure":
          funCharTabStructure ();
          return;
        case "dictionary":
          funCharTabDictionary ();
          return;
        case "sentence":
          funFlashcardSentenceCallout ();
          return;
        case "":
          $.colorbox.close();
          return;
      }

    }

    
    
////////////////////////////   DOM Manipulaters / Constructors   ////////////////////////////////////
    
    

    // character colorbox tab:structure
    function funCharTabStructure () {
                    // alert('funCharTabStructure');
                    // flog('funCharTabStructure');
      
      if( ! funIsColorboxActivated () ){
        window.location.hash = "_";
        return;
      }
      // display ui canvas
      funFlashcardCharCalloutTab ("structure");
      
      // var nodeStructureData = Drupal.settings.charStructure.nodeStructuresData['character-' + strCurrentCharId];
                // flog('nodeStructureData', nodeStructureData);
      var nodeStructureData = funGetStructureData (strCurrentCharId);

      if (nodeStructureData) {
          
        var strRootChar = nodeStructureData.root;

        // prepare container structure
        var numRandom = Math.floor(Math.random() * 1000000);
        var strCanvasId = 'dqd-tab-structure-canvas-' + numRandom;
        var strCanvasWrapperId = 'dqd-tab-structure-canvas-wrapper-' + numRandom;
        var strButtonId = 'dqd-tab-structure-button-' + numRandom;
        var strHtml = '' 
          + '<div class="dqd-tab-structure-canvas-wrapper" id=' + strCanvasWrapperId + '>'
          + '  <div class="dqd-tab-structure-canvas" id=' + strCanvasId + '/>'
          + '</div>'
        ;
        // create container structure
        $("#colorbox .dqd-tab-structure .dqd-structure-container").html(strHtml);
        $('#' + strCanvasId).html('');


        var objChart = {
          
          container: '#' + strCanvasId,
          
          rootOrientation: "SOUTH",

          animateOnInit: true,
          
          connectors: {
            type: 'curve',
            // # type: 'bCurve',
            style: {
              // stroke: 'lightblue',
              stroke: '#ddd',
            },
          },
          
          node: {
            collapsable: true,
            HTMLclass: 'treant-node',
          },
          
          animation: {
            nodeAnimation: "easeOutBounce",
            nodeSpeed: 700,
            connectorsAnimation: "bounce",
            connectorsSpeed: 700,
          },
        };
        
        
        
        // tree Treant configuration
        var objChartConfig = {
          chart: objChart,
          nodeStructure: nodeStructureData.nodeStructure,
        }
        
        
                          // flog('objChartConfig', objChartConfig);
        // triger tree generation
        var objTree   = new Treant( objChartConfig, function() {}, $ );
        
        $.each($(".Treant .collapse-switch"), function(k,v){$(v).html('<i class="fa fa-fw fa-expand" aria-hidden="true"></i>');});
        
        fVoiceFilePreDownload ();
        fVoicePlayEventAttach ();
      }
    }

    // character colorbox tab:dictionary
    function funCharTabDictionary () {
      
      if( ! funIsColorboxActivated () ){
        window.location.hash = "_";
        return;
      }

      // display ui canvas
      funFlashcardCharCalloutTab ("dictionary");
      
      $.post(
        Drupal.settings.basePath + 'views/ajax',
        {
          view_name: 'gdmn_gydict_meaning_display_of_simplified_corpus_x',
          view_display_id: 'default',
          view_args: strCurrentCharId,
        },

        function(response)
        {
            if (response[1] !== undefined) 
            {
                var viewHtml = response[1].data;
                $(".dqd-tab.dqd-tab-dictionary").html(viewHtml);
               /*...*/
                // Drupal.attachBehaviors();
            }
        }
      );
    }

    // character colorbox tab:write
    function funCharTabWrite () {
                    // alert('funCharTabWrite');
                    // flog ('funCharTabWrite');
                    // flog(strChar);
                    // return;

      if( ! funIsColorboxActivated () ){
        window.location.hash = "_";
        return;
      }
      // display ui canvas
      funFlashcardCharCalloutTab ("write");
      
      // prepare container structure
      var numRandom = Math.floor(Math.random() * 1000000);
      var strCanvasId = 'dqd-tab-write-canvas-' + numRandom;
      var strCanvasWrapperId = 'dqd-tab-write-canvas-wrapper-' + numRandom;
      var strButtonId = 'dqd-tab-write-button-' + numRandom;
      var strHtml = '' 
        + '<div class="dqd-tab-write-canvas-wrapper" id=' + strCanvasWrapperId + '>'
        + '  <div class="dqd-tab-write-canvas" id=' + strCanvasId + '/>'
        + '</div>'
        + '<div>'
        + '  <div class="dqd-tab-write-refresh" id=' + strButtonId + '>'
        + '    <i class="fa fa-eraser" />'
        + '  </div>'
        + '</div>'
        + '<div class="dqd-tab-write-dictionary">'
        + '</div>'
      ;
      // create container structure
      $("#colorbox .dqd-tab-write .dqd-write-container").html(strHtml);
      $('#' + strCanvasId).html('');
                    // flog('container', container);

      if (funGetWriteData (strCurrentCharText)){
        var objWriterQuiz = new HanziWriter(strCanvasId, strCurrentCharText, {
          // # charDataLoader: function(char) {
          // #   return JSON.parse(Drupal.settings.corpusWrite.corpuses[char]);
          // # },
          charDataLoader: function(char, onComplete) {
            funHanziWriteCharDataLoaderProcess(char, onComplete);
          },
          
          delayBetweenStrokes: 0, 
          drawingColor: "#333", // user trace
          drawingFadeDuration: 500, 
          drawingWidth: 10,  // user trace
          height: 300, 
          highlightColor: "#33A", // also hint color
          highlightOnComplete: true, 
          outlineColor: "#A33", 
          outlineWidth: 0, 
          padding: 5, 
          showCharacter: true, 
          showHintAfterMisses: 1, 
          showOutline: true, 
          strokeAnimationDuration: 200, 
          strokeColor: "#333", 
          strokeHighlightDuration: 200, 
          strokeWidth: 2, 
          usePolygonMasks: false, 
          width: 300, 
        });
        // objWriterQuiz.loopCharacterAnimation();
        // objWriterQuiz.animateCharacter();
        objWriterQuiz.quiz();
        
        document.getElementById(strButtonId).addEventListener('click', function() {
          objWriterQuiz.quiz();
        });
        
        var objDictData = funGetDictData (strCurrentCharId);
        var objDictionaryEntries = objDictData ? objDictData.dict : [];
        
        // var objDictData = Drupal.settings.corpusDictionary.corpuses['corpus-' + strCurrentCharId].dict;
        
        var strDictHtml = '';
        objDictionaryEntries.forEach(function(element) {
          strDictHtml = strDictHtml
            + '<div>'
            + '  <span class="dqd-tab-write-pinyin">'
            +      element.pinyin
            + '  </span>'
            + '  <span class="dqd-tab-write-english">'
            +      element.english_min
            + '  </span>'
            + '</div>'
          ;
          
          // $('.dqd-tab-write-canvas-wrapper .dqd-tab-write-dictionary ').html(strDictHtml);
          $('#colorbox .dqd-tab-write-dictionary').html(strDictHtml);
          
          // console.log(element);
        });
      }


    }

    // sentence callout
    function funFlashcardSentenceCallout () {
                            // flog('i am called: funFlashcardSentenceCallout');
      if( ! funIsColorboxActivated () ){
        window.location.hash = "_";
        return;
      }
      
      var objSentence = funGetSentenceData (objActiveWordId, strCurrentSentenceId);
      // var objSentence = Drupal.settings.corpusSentences.corpuses['corpus-' + objActiveCorpus.id]['sentence-' + strCurrentSentenceId];
                            // flog('objSentence', objSentence);
                            
      if (objSentence) {
      // if (objSentence !== undefined && objSentence !== null) {
      // if(objSentence !== null && typeof objSentence === 'object') {
        
        var strHtml = '';
        
        // html
        // the full sentence
        strHtml += ''
              // sentence segmentation display summary
          + ' <div class="dqd-sentence-callout-summery-container">'
          + '   <div class="dqd-sentence-callout-summery-title">'
          +       funSentenceTextLineHtmlTemplate ({
                    'id':objSentence.id, 
                    'strShow':objSentence.segmented, 
                    'strVoice':objSentence.sentence,
                    'isColorbox':false,
                  })
          +       funSentenceExplanationHtmlTemplate (objSentence)
          + '   </div>'
          + ' </div>'
              // separater
          + ' <hr />'
              // sentence segmentation display details
          + ' <div class="dqd-word-sentence-segments-container">'
                // segments voice list trigger button
          + '   <div class="dqd-header">'
          + '     <div class="dqd-voice-list-button text-muted">'
          + '       <i class ="fa fa-fw fa-play-circle" /><i class ="fa fa-fw fa-angle-double-right" />'
          + '     </div>'
          + '   </div>'
          + '   <div class="dqd-body">'
        ;
        
        
        // each segment section
        objSentence.segmentations.forEach(function(objSegment){
                          // flog('objSegment', objSegment);
                          // return;
          // segment section
          // prepare data
          var arrSegmentCharIds =  funGetWordCharactersData (objSegment.id);
          // var arrSegmentCharIds = Drupal.settings.corpusWordsCharacters.corpuses['corpus-' + objSegment.id];
          // arrSegmentCharIds = arrSegmentCharIds || [objSegment.id];
          
          var objDictData = funGetDictData (objSegment.id);
          var objDictionaryEntries = objDictData ? objDictData.dict : [];
          var strDictrionryHtml = funWordDictionaryHtmlTemplate (objDictionaryEntries);
          
          
          // ## var objDictionaryData = Drupal.settings.corpusDictionary.corpuses['corpus-' + objSegment.id];
          // ##             // flog('objDictionaryData', objDictionaryData);
          // ## if (typeof objDictionaryData == 'object'){
          // ##   var strDictrionryHtml = funWordDictionaryHtmlTemplate (objDictionaryData.dict);
          // ## }
          // html
          strHtml += ''
            + ' <div class="dqd-word-sentence-segments-segment-container">'
                  // segment title
            + '   <div class="dqd-word-sentence-segments-segment-text">'
            + '     <span>'
            +         funSentenceTextLineHtmlTemplate ({
                        'id':objSegment.id, 
                        'strShow':objSegment.text, 
                        // 'strVoice':objSegment.text,
                        'strVoice':funTtsVoiceTextForWord(objSegment.id, objSegment.text),
                        // 'strVoice':funTtsVoiceTextForWord(123281), // 日蚀
                        'isColorbox':false,
                        'isExpandable':true,
                        'isExpanded':false,
                      })
            + '     </span>'
            + '   </div>'
                  // segment body
            + '   <div class="dqd-word-sentence-segments-segment-body">'
                    // segment dictionary
            +       (strDictrionryHtml != undefined 
                    ? ''
            + '       <div class="dqd-word-sentence-segments-segment-dictionary">'
            +           strDictrionryHtml
            + '       </div>'
                    : '')
                    // segment character list
            +       (objSegment.text.length > 1
                    ? ''
            + '       <div class="dqd-word-sentence-segments-segment-characters" style="display:none;">'
            // + '       <div class="dqd-word-sentence-segments-segment-characters">'
            +           funSegmentCharacterListDictionaryHtmlTemplate(arrSegmentCharIds)
            + '       </div>'
                    : '')
            + '   </div>'
            + ' </div>'
          ;
        });
        // html
        strHtml += ''
                // end of: dqd-body
          + '   </div>'
              // end of: sentence segmentation display details
          + ' </div>'
        ;
        
        // inject html
        var elContainer = $('#dqd-sentence-callout-colorbox-inline-template .dqd-sentence-container');
        elContainer.html(strHtml);
        
        // voice trigger event
        $('#dqd-sentence-callout-colorbox-inline-template .dqd-sentence-voice-play-button').each(function(i, el){
                           // flog('el', el);
                           // return; // continue each
          
          funTextVoicePlayButtonEventRegistration (el);
        });

        // expansion toggle trigger event
        $.each($('#dqd-sentence-callout-colorbox-inline-template .dqd-word-sentence-text-line .dqd-expandable'), function(index, el){
                           // flog('el', el);
          $(el).on('click', function() {
            event.stopPropagation();
            $(el).closest('.dqd-word-sentence-segments-segment-container').find('.dqd-word-sentence-segments-segment-characters').toggle().toggleClass('animated fadeIn');
            $(el).toggleClass('dqd-expanded dqd-unexpanded ');
          });
        });

        // list voice play trigger event
        $.each($('#dqd-sentence-callout-colorbox-inline-template .dqd-word-sentence-segments-container .dqd-header .dqd-voice-list-button'), function(index, el){
                           // flog('el', el);
          $(el).on('click', function() {
            event.stopPropagation();
            var arrElVoiceButtons = $(el).closest('.dqd-word-sentence-segments-container').find('.dqd-body .dqd-word-sentence-segments-segment-text .dqd-sentence-voice-play-button');
                           // flog('arrElVoiceButtons', arrElVoiceButtons);
                           // return;
            funVoiceButtonListPlay(arrElVoiceButtons);
          });
        });
        
      }
    }
    
    // character callout
    function funFlashcardCharCalloutTab (strTab) {
                        // flog('strTab', strTab);
      
      $("#cboxLoadedContent .dqd-tab").hide();
      if(strTab != undefined) {
        $("#cboxLoadedContent .dqd-tab[tab-type=" + strTab + "]").show();
        $("#cboxLoadedContent .dqd-tab[tab-type!=" + strTab + "] .dqd-tab-inner-container").html('');
      }
      else {
        $("#cboxLoadedContent .dqd-tab .dqd-tab-inner-container").html('');
      }
    }

    // to hide empty image
    function funHideEmptyImage (){
      elFlipContainers.find(".img-thumbnail").each(function(i, el){
                        // flog(el);
        if($(el).find('img').length == 0){
          $(el).css(
            'visibility', 'hidden'
          );
        }
      });
    }

    // re-compute and set container height
    function funSetContainerHeight (intTime) {
                        // return;
      elFlipContainers.fadeTo('fast', 0.5);
                        // flog('funSetContainerHeight');
      setTimeout(function(){
        
        
        // set flashcard container height
        intContainerHeight = $(elMain).find('.dqd-size-holder').outerHeight();
        intContainerWidth = $(elMain).find('.dqd-size-holder').outerWidth();
        
        
        if ( true
          && intContainerWidth <= 400
          && intContainerHeight < 500
        ) {
                        // flog('height 500');
          intContainerHeight = 500;
        }
        else if ( true
          && intContainerWidth > 400
          && intContainerHeight < 300
        ) {
                        // flog('height 300');
          intContainerHeight = 300;
        }
        
                        // flog(intContainerHeight);
                        // console.log(intContainerHeight);
        elFlipContainers.height(intContainerHeight);
        // elFlipContainers.height(500);
        elFlipContainers.fadeTo('slow', 1);
      }, intTime);
    }

    // show all card front terms
    function funAllSlideHanziWriteShow_________ () {
                        // return;

      // each character
      elMain.find(".dqd-card-center-corpus-word").each(function(i, elContainer){
        // get current word id
        var numWordId = $(elContainer).closest('.flip-container').find('.dqd-slide-data').first().attr('data');
                        // flog('strCurrentWordId', strCurrentWordId);
        
        funCardFaceCharacterPlaceholderDeploy (elContainer, numWordId);
        
                        return;

        // inject hanzi write
        $(elContainer).find(".dqd-hanziwrite-corpus-character").each(function(i, elContainer){
                        // flog(el);
          funCardFaceCharacterHanziWriteDeploy(elContainer);
        });
      });
      
    }

    // show all card front terms
    function funAllSlideHanziWritePlaceholderShow () {
                        // return;

      // each character
      elMain.find(".dqd-card-center-corpus-word").each(function(i, elContainer){
        // get current word id
        var numWordId = $(elContainer).closest('.flip-container').find('.dqd-slide-data').first().attr('data');
                        // flog('strCurrentWordId', strCurrentWordId);
        funCardFaceCharacterPlaceholderDeploy (elContainer, numWordId);
      });
    }

    function funAllSlideHanziWriteShow () {
                        // return;

      // each character
      elMain.find(".dqd-card-center-corpus-word .dqd-hanziwrite-corpus-character").each(function(i, elContainer){
                        // flog(el);
        funCardFaceCharacterHanziWriteDeploy(elContainer);
      });
      
    }

    // show all sentences
    function funAllSlideSentencesShow () {

      
      // each character
      // elMain.find(".dqd-hanziwrite-corpus-character").each(function(i, el){
      elMain.find('.dqd-word-sentences').each(function(i, el){
        
        var strCurrentWordId = $(el).closest('.flip-container').find('.dqd-slide-data').first().attr('data');
                        // flog('strCurrentWordId', strCurrentWordId);
                        // return;
        
        var strHtml = '';
        
        var objSentences = funGetWordSentenceData (strCurrentWordId);
        
        // var objSentences = Drupal.settings.corpusSentences.corpuses['corpus-' + strCurrentWordId];
                              
        // if(typeof objSentences === 'object') {
        if(objSentences) {
                              // flog('objSentences', objSentences);
          
          Object.values(objSentences).forEach(function(objSentences) {
                              // flog('key', key);
                              // flog('index', index);
            var strHtmlSentence = ''
              + '<div class="dqd-word-sentence-set">'
              + funSentenceTextLineHtmlTemplate ({
                  'id':objSentences.id, 
                  'strShow':objSentences.segmented, 
                  'strVoice':objSentences.sentence,
                  'isColorbox':true,
                })
              + funSentenceExplanationHtmlTemplate (objSentences)
              + '</div>'
            ;
            
            strHtml += strHtmlSentence;
          });
        }
        
        $(el).html(strHtml);
        
      });
        
      elMain.find('.dqd-word-sentences .dqd-sentence-voice-play-button').each(function(i, el){
        funTextVoicePlayButtonEventRegistration (el);
      });
    }

    // show all slide card back titles
    function funAllSlideBackWordShow () {
      
                            // flog('i am called: funAllSlideBackWordShow');
      
      elMain.find('.dqd-flashcard-back-title-word').each(function(i, el){
        // get word id
        var strCurrentWordId = $(el).closest('.flip-container').find('.dqd-slide-data').first().attr('data');
                        // flog('strCurrentWordId', strCurrentWordId);
                        // return;
        
        // // get word text
        // var objCorpusDictData = Drupal.settings.corpusDictionary.corpuses;
        // var strKey = 'corpus-' + strCurrentWordId;
        // ## var text;
        // ## if (objCorpusDictData[strKey] !== undefined && objCorpusDictData[strKey] !== null) {
        // ##   text = objCorpusDictData[strKey].text;
        // ## }
        // ## else {
        // ##   text = '';
        // ##                    // flog(strKey);
        // ## }
        var objDictData = funGetDictData (strCurrentWordId);
        var text = objDictData ? objDictData.text : null;
        
        // // generate voice text
        var strTextRead = funTtsVoiceTextForWord (strCurrentWordId);
        //                 // flog(strTextRead);
        
        // generate html
        var strHtml = funSentenceTextLineHtmlTemplate ({
          'id':strCurrentWordId, 
          'strShow':text, 
          'strVoice':strTextRead,
          'isColorbox':false,
        });
                      // flog(strHtml, 'strHtml');

        // inject html to dom
        $(el).html(strHtml);
        
      });
      
      // register the sound button
      elMain.find('.dqd-flashcard-back-title-word .dqd-sentence-voice-play-button').each(function(i, el){
        funTextVoicePlayButtonEventRegistration (el);
      });
    }

    // show all slide card front voice
    function funAllSlideFrontVoiceShow () {
      
                            // flog('i am called: funAllSlideBackWordShow');
      
      elMain.find('.front-footer .dqd-voice').each(function(i, el){
        // get word id
        var strCurrentWordId = $(el).closest('.flip-container').find('.dqd-slide-data').first().attr('data');
                        // flog('strCurrentWordId', strCurrentWordId);
                        // return;
        
        // // generate voice text
        var strVoice = funTtsVoiceTextForWord (strCurrentWordId);
        //                 // flog(strTextRead);
        
        // generate html
        var strHtml = ''
          +     funVoiceButtonHtmlTemplate (strVoice)
        ;
                      // flog(strHtml, 'strHtml');

        // inject html to dom
        $(el).html(strHtml);
        
        // click play event
        $(el).find('.dqd-sentence-voice-play-button').each(function(i, e){
          funTextVoicePlayButtonEventRegistration (e);
        });
        // funTextVoicePlayButtonEventRegistration (el)
      });
      
    }

    // show all dictionaries on slides
    function funAllSlideWordDictionaryShow () {

      // each character
      elMain.find('.dqd-english-dictionary').each(function(i, el){
        
        var strCurrentWordId = $(el).closest('.flip-container').find('.dqd-slide-data').first().attr('data');
        
        
        var objDictData = funGetDictData (strCurrentWordId);
        var objDictionaryEntries = objDictData ? objDictData.dict : [];
        var strHtml = funWordDictionaryHtmlTemplate (objDictionaryEntries);
        $(el).html(strHtml);
        return; 

      });
        
    }
    
    // show current slide card face term
    function funCurrentSlideHanziWriteShow (slider) {
                        return;
                        // flog('funCurrentSlideHanziWriteShow');
      // each character
      elActiveSlide.find(".dqd-card-center-corpus-word .dqd-hanziwrite-corpus-character").each(function(i, elContainer){
                        // flog(el);
        funCardFaceCharacterHanziWriteDeploy(elContainer);
      });
    }

    // show current slide card face term
    function funCurrentSlideHanziWriteDestroy (slider) {
                        return;
      // get current word id
      var numWordId = elActiveSlide.find('.dqd-slide-data').first().attr('data');
                      // flog('strCurrentWordId', strCurrentWordId);
      elActiveSlide.find(".dqd-card-center-corpus-word .dqd-hanziwrite-corpus-character").each(function(i, elContainer){
                        // flog(el);
        funCardFaceCharacterPlaceholderDeploy (elContainer, numWordId);
      });

      // // each character
      // elActiveSlide.find(".dqd-card-center-corpus-word .dqd-hanziwrite-corpus-character").html('');
    }

    // update current slide variables
    function funCurrentSlideSetVariable (slider) {
                      // flog('slider', slider);
      elActiveSlide = $(slider).find(".flex-active-slide").first();
      var strCorpusId = elActiveSlide.find('.dqd-slide-data').first().attr('data');
      var objActiveWordDict = funGetDictData (strCorpusId);
      objActiveWordId = objActiveWordDict ? objActiveWordDict.id : null;
      // objActiveCorpus = Drupal.settings.corpusWords.corpuses["corpus-" + strCorpusId];
      // objActiveCorpus = Drupal.settings.corpusDictionary.corpuses["corpus-" + strCorpusId];

                        // flog ('objActiveCorpus', objActiveCorpus);
    }

    // auto play the hanzi write when a slide is shown
    function funCurrentSlideHanziWriteAutoPlay (slider, numSlideIndex, numCharIndex = 0) {
                          // flog('funCurrentSlideHanziWriteAutoPlay');
                          // flog(this);
                          // flog(slider);
                          // flog('numCharIndex', numCharIndex);
                          // flog(this.arrElHanzi);
                          // return;
      
      // fulfill default slide number
      if (! numSlideIndex) {
        numSlideIndex = slider.currentSlide;
      }
      
      // quit if the slide is not active
      if(slider.currentSlide != numSlideIndex) {
        return;
      }
      
      // a slide is shown
      if(numCharIndex == 0) {
        
        // reset the hanzi repository of current slide
        delete this.arrElHanzi;
        delete this.numHanziCount;
        this.arrElHanzi = elActiveSlide.find('.dqd-face-write-svg-container').closest('.dqd-hanziwrite-corpus-character');
        // this.arrElHanzi = elActiveSlide.find('.dqd-hanziwrite-corpus-character');
                        // flog('arrElHanzi', this.arrElHanzi);
        this.numHanziCount = this.arrElHanzi.length;
                        // flog('numHanziCount', this.numHanziCount);

        // enable the auto play flag
        binIsHanziWriteInAuto = true;
      }
      
      // check the auto play flag is on. otherwise quit autoplaying
      if (binIsHanziWriteInAuto == false) {
        return;
      }
      
      // the current character container id
      strId = this.arrElHanzi[numCharIndex].firstChild.id;
                        // flog('strId', strId);
      // case the current character is NOT the last in corpus
      if (numCharIndex + 1 < this.numHanziCount) {
                        // flog('arrObjWriters[strId]', arrObjWriters[strId]);
        arrObjWriters[strId].animateCharacter({
          onComplete: function() {
            setTimeout(function() {
              funCurrentSlideHanziWriteAutoPlay(slider, numSlideIndex, numCharIndex + 1);
            }, 0);
          }
        });
      }
      // case the current character IS the last in corpus
      else {
        arrObjWriters[strId].animateCharacter({ 
          onComplete: function() {
            setTimeout(function(){funCurrentSlideHanziWriteAutoPlay(slider, numSlideIndex, 0);}, 1000);
          },
        });
      }
        // arrElHanzi.each(function(i, el){
    }



////////////////////////////   Utilities   ////////////////////////////////////



    function fVoicePlayEventAttach () {
      
      $('.Treant > .node p.node-pinyin').each(function (element, index) {
        // play voice
        $(this).on("click", function (e) {
          
          var url = $(this).closest('.node.treant-node').find('p.node-data-voice-url').first().text();
                            // flog(url);
          if (url) {
            var audio = getVoiceInstances(url);
            audio.play();
          }
        })
      });
    }

    function fVoiceFilePreDownload () {
      
      $('.Treant > .node p.node-pinyin').each(function (element, index) {
        // download voice
        var url = $(this).closest('.node.treant-node').find('p.node-data-voice-url').first().text();
                          // flog(url);
        if (url) {
          var audio = getVoiceInstances(url);
        }
      });
    }

    // Cache audio instances.
    function getVoiceInstances(url) {
      if (arrVoices[url]) {
        return arrVoices[url];
      }else {
        var audio = new Audio(url);
        arrVoices[url] = audio;
        return arrVoices[url];
      }
    }

    function funHanziWriteCharDataLoaderProcess(character, onComplete) {
      
      // var objData = JSON.parse(Drupal.settings.corpusWrite.corpuses[character]);
      var objData = JSON.parse(funGetWriteData (character));
      setTimeout(()=>{onComplete(objData);},0);
    }
    
    // generate voice text
    function funTtsVoiceTextForWord (numWordId, strFallBack = '.') {
                        // flog('numWordId', numWordId);
      
      // get dict data
      var objDictData = funGetDictData (numWordId);
      // var objDictData = Drupal.settings.corpusDictionary.corpuses["corpus-" + numWordId];
                        // flog('objDictData', objDictData);
                        // flog('objDictData.text', objDictData.text);
                        // return '.';
      
      // interim storage
      var arrTextRead = [];
      var strVoice;
      // case word is not in dictionary
      if ( objDictData === null) {
        strVoice = strFallBack;
      }
      // case word is single character
      else if ( true 
        && Array.isArray(objDictData.dict)
        && objDictData.text.length == 1
      ) {
        objDictData.dict.forEach(function(elEntry){
          // var regTone = /[āáǎàōóǒòēéěèīíǐìūúǔùǖǘǚǜ]/i;           var pos = regTone.test('dé'); console.log(pos);

          strPinyin = /[āáǎàōóǒòēéěèīíǐìūúǔùǖǘǚǜ]/i.test(elEntry.pinyin)
            ? elEntry.pinyin
            : elEntry.pinyin + '5'
          ;
          
          arrTextRead.push(`${elEntry.chinese}(${strPinyin})`);
        });
        strVoice = arrTextRead.join('。');
      }
      // case word is not single character
      else {
        strVoice = objDictData.text;
      }
      
      // return
      return strVoice;
    }
    
    function funTtsUrl(strVoice) {
      var strUrl    = `http://dao.sg:3680/ttsengine61/api/daoqidao.mp3?text=${strVoice}&p=j4ejddlgji`;
      return strUrl;
    }
    
    function funVoiceButtonListPlay (arrElVoiceButtons, numStartIndex = 0) {
      
      
      // Howler.unload();
      var elButton      = arrElVoiceButtons[numStartIndex];
      var strVoice      = $(elButton).attr('data')  || '.';
                        // flog('strVoice', strVoice);
      
      $(elButton).removeClass('text-muted').addClass('animated infinite flash');
      
      var sound         = new Howl({
        src             : [funTtsUrl(strVoice)],
        format          : ['mp3'],
        html5           : false,
        autoplay        : false, 
        preload         : true, 
        onload          : function() {
                        // alert('Howler Loaded: ' + strVoice);
                        // flog('Howler Loaded: ' + strVoice);
        },
        onplay          : function() {
                        // alert('Howler Playing: ' + strVoice);
                        // flog('Howler Playing: ' + strVoice);
          $(elButton).addClass('text-dark');
        },
        onend           : function() {
                        // alert('Howler Ended: ' + strVoice);
                        // flog('Howler Ended: ' + strVoice);
          $(arrElVoiceButtons).addClass('text-muted').removeClass('text-dark animated infinite flash');
          
          if(numStartIndex + 1 < arrElVoiceButtons.length) {
            setTimeout(function(){funVoiceButtonListPlay(arrElVoiceButtons, numStartIndex + 1);},200);
          }
          
          this.unload();
        },
      });
      sound.play();
      
    }
    
    function funIsColorboxActivated () {
      var elColorbox = document.getElementById("colorbox");
      return ! ( false
        || elColorbox == null
        || document.getElementById("colorbox").style.display == "none"
      );
    }

    function funCardFaceCharacterHanziWriteDeploy (elContainer) {
                        // flog('elContainer', elContainer);
      
      
      // inject hanzi write
      var strChar = elContainer.getAttribute('data');
      var numRandom = Math.floor(Math.random() * 1000000);
      // prepare container id
      var strContainerId = 'dqd-tab-write-' + numRandom;
      
      
      
      if (funGetWriteData (strChar)){
        
        $(elContainer).html('<div id=' + strContainerId + ' class = "dqd-face-write-svg-container"/>');

        arrObjWriters[strContainerId] = new HanziWriter(strContainerId, strChar, {
          // # charDataLoader: function(char) {
          // #   return JSON.parse(Drupal.settings.corpusWrite.corpuses[char]);
          // # },
          // # charDataLoader: function(char, onComplete) { $.getJSON(
          // #     Drupal.settings.basePath + 'sites/default/files/data/' + char + '.json', 
          // #     function(charData) { onComplete(charData);}
          // # );},
          charDataLoader: function(char, onComplete) {
            funHanziWriteCharDataLoaderProcess(char, onComplete);
          },
          height: 100, 
          width: 100, 
          padding: 5, 
          delayBetweenStrokes: 0, 
          drawingFadeDuration: 500, 
          outlineColor: "#A33", 
          outlineWidth: 2, 
          showCharacter: true, 
          showOutline: true, 
          strokeAnimationDuration: 200, 
          strokeColor: "#333", 
          strokeWidth: 2, 
        });
      }
    }

    function funCardFaceCharacterPlaceholderDeploy (elContainer, numWordId) {
      // return;
                      // alert('funCardFaceCharacterPlaceholderDeploy');
                      // alert(numWordId);
                      // flog('numWordId', numWordId);
      var strHtml = '';
      // get word text
      
      var arrCharacterIds = funGetWordCharactersData (numWordId);
      arrCharacterIds = arrCharacterIds || [];
      // var arrCharacterIds = Drupal.settings.corpusWordsCharacters.corpuses["corpus-" + numWordId];
                      // flog('arrCharacterIds', arrCharacterIds);
      // arrCharacterIds = arrCharacterIds || [numWordId];
                      // flog('arrCharacterIds', arrCharacterIds);
      arrCharacterIds.forEach(function(charId){
                      // alert(charId);
        
        var objDictData = funGetDictData (charId);
        var strText = objDictData ? objDictData.text : '';


        // ## var objDictData = Drupal.settings.corpusDictionary.corpuses["corpus-" + charId];
        // ## var strText = (typeof objDictData == 'object' && objDictData.text != undefined)
        // ##   ? objDictData.text
        // ##   : null
        // ## ;
                      // alert(strText);
        strHtml += ''
          // +  '<div class="dqd-card-center-corpus-character" style="background-color:red; width: 100; height: 100;">'
          +  '<div class="dqd-card-center-corpus-character">'
          +     (strText.length > 0 
                ? ''
          +      `<span class="colorbox-inline" href="${Drupal.settings.basePath}?width=400px&height=600px&inline=true#dqd-char-callout-colorbox-inline-template" data="${charId}" colorbox-type="character">`
          +        `<div class="dqd-hanziwrite-corpus-character" data="${strText}\" >`
          +           strText
          +        '</div>'
          +      '</span>'
                : '&nbsp')
          +  '</div>'
        ;
      });
                              // alert(strHtml);
      $(elContainer).html(strHtml);
    }
    
    
    function funGetDictData (numId) {
                      // flog(numId);
      var objItems = Drupal.settings.corpusDictionary.corpuses;
      var strKey = `corpus-${numId}`;
      if (objItems[strKey] === undefined) {
        flog(`c${numId} missing from dict`);
      }
      return objItems[strKey] || null;
    }

    function funGetWriteData (character) {
      var objItems = Drupal.settings.corpusWrite.corpuses;
      if (objItems[character] === undefined) {
        flog(`${character} missing from write`);
      }
      return objItems[character] || null;
    }

    function funGetStructureData (numCharacterId) {
      var objItems = Drupal.settings.charStructure.nodeStructuresData;
      var strKey = `character-${numCharacterId}`;
                        // flog('strKey', strKey);
      if (objItems[strKey] === undefined) {
        flog(`c${numCharacterId} missing from structure`);
      }
      return objItems[strKey] || null;
    }

    function funGetSentenceData (numWordId, numSentenceId) {
      var objItems = Drupal.settings.corpusSentences.corpuses;
      var strWordKey = `corpus-${numWordId}`;
      var strSentenceKey = `sentence-${numSentenceId}`;
      if (objItems[strWordKey][strSentenceKey] === undefined) {
        flog(`c${strWordKey}-s${strSentenceKey} missing from sentence`);
      }
      return objItems[strWordKey][strSentenceKey] || null;
    }

    function funGetWordSentenceData (numWordId) {
      var objItems = Drupal.settings.corpusSentences.corpuses;
      var strKey = `corpus-${numWordId}`;
      if (objItems[strKey] === undefined) {
        flog(`c${strKey} missing from sentence`);
      }
      return objItems[strKey] || null;
    }

    function funGetWordCharactersData (numWordId) {
      var objItems = Drupal.settings.corpusWordsCharacters.corpuses;
      var strKey = `corpus-${numWordId}`;
      if (objItems[strKey] === undefined) {
        flog(`c${strKey} missing from wordcharacters`);
      }
      return objItems[strKey] || null;
    }



////////////////////////////   Main   ////////////////////////////////////



    function funMain() {
      
      
      ////////  Events
      
      // enable keyboard control
      funKeyboardEnable();

      // flipping enabling
      funFlippingEnable ();

      // set container height on windows event 
      funWindowResizeEvent();

      // register slide events
      funSlideEvent();

      // anchor navigation
      initHashNav (funHashNavCallBack);

      // colorbox
      funEventColorbox ();
      
      





      ////////  Dom Construction
      
      
      // display sentences
      funAllSlideSentencesShow ();

      // word dictionary
      funAllSlideWordDictionaryShow ();
      
      // card back title word
      funAllSlideBackWordShow ();
      
      // set container height
      funSetContainerHeight(1000);

      // hide empty image
      funHideEmptyImage();

      // character placeholder
      funAllSlideHanziWritePlaceholderShow ();
      
      // animate characters
      funAllSlideHanziWriteShow ();
      
      // front voice button
      funAllSlideFrontVoiceShow ()
      
      

    }

    funMain();
    
    
    
////////////////////////////   Test   ////////////////////////////////////
    
    

    function funTest () {
      strVoice = funTtsVoiceTextForWord (123281); // 日蚀  
      flog('strVoice', strVoice);// test
    }
    // funTest ();
    
    
////////////////////////////   Section   ////////////////////////////////////
    
    

    // }, // end of drupal behavior attach
// };

}(jQuery))

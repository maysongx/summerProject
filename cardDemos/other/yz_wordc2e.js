/**
 *  @file yz_wordc2e.js
 *  @brief Brief
 */

/* -------------------------------  Quiz Logic -----------------------------*/

/**
 *  @brief superstar quiz
 *    interface logic
 */

(function ($) {






  // $(function(){
Drupal.behaviors.superstarQuizOptions = {
  attach: function(context, settings) {
    
    // enabler
    var elClassSelector = '.view-ceqs-wordc2e-questions-of-quiz-x-display';
    if($(elClassSelector).length == 0){return false;}
    
    // debug switch
    var binDebug = false;
                        binDebug = true;
    function flog(){ if (typeof binDebug !== 'undefined' && binDebug === true) console.log(arguments);}


    // storage
    // question data
    var objQuizWorkingData = {
      numCount                    : 0,
      binEnd                      : false,
      binAjaxLocked               : false,
      arrBinAnswersCorrect        : [],
      numCurrentQuestionIndex     : 0,
      elCurrentQuestionContainer  : null,
    };
    // selector
    var txtQuizContainerClassSelector = '.view-ceqs-wordc2e-questions-of-quiz-x-display';

    // start main process
    fMain();

    // shuffle child elements
    function fShuffleChildren(el){
      for (var i = el.children.length; i >= 0; i--) {
        el.appendChild(el.children[Math.random() * i | 0]);
      }
    }

    // process option click event
    //    set immediate data
    function fRegisterCurrentSlideClickEvent(){
      $(objQuizWorkingData.elCurrentQuestionContainer).find(".dqd-option").on("click", function (e) {
                        flog('clicked on ', $(this));
        // disable clicking on the current question
        $(this).siblings(".dqd-option").off("click");
        // keep the click fingerprint
        $(this).addClass("dqd-clicked");
        // get index
        // check and record the answer correctness
        if ($(this).hasClass("dqd-correct-option")){
          objQuizWorkingData.arrBinAnswersCorrect[objQuizWorkingData.numCurrentQuestionIndex] = true;
        }else{
          objQuizWorkingData.arrBinAnswersCorrect[objQuizWorkingData.numCurrentQuestionIndex] = false;
        }
        // ui action
        fQuestionAnsweredUiFeedback();
        // feedback to server
        fQuestionAnsweredServerFeedback();
        return false;
      });
    }

    // process ui feedback after clicking
    function fQuestionAnsweredUiFeedback() {
      
      // current question index
      var isAnswerCorrect = objQuizWorkingData.arrBinAnswersCorrect[objQuizWorkingData.numCurrentQuestionIndex];
      // $("li.flex-active-slide")
      $(objQuizWorkingData.elCurrentQuestionContainer)
        .find(".dqd-clicked, .dqd-correct-option")
        .find(".dqd-progressbar")
        .animate({
            width: '100%',
          }, 300)
        ;
      // give star to correct click
      // elStar = $("li.flex-active-slide .dqd-correct-option .dqd-option-star");
      elStar = $(objQuizWorkingData.elCurrentQuestionContainer).find(".dqd-correct-option .dqd-option-star");
      if(isAnswerCorrect){
        $(elStar).removeClass('bounceIn bounceOut rollOut fadeOutRight fadeOut fa-star fa-star-half-o fa-question').addClass('fa-star wobble fa-lg');
      }
      else{
        $(elStar).removeClass('bounceIn bounceOut rollOut fadeOutRight fadeOut fa-star fa-star-half-o fa-question').addClass('fa-star-o wobble fa-lg');
      }

      // question complete
      setTimeout(fQuestionGotoNext, isAnswerCorrect?500:1500);

    }
    
    // feedback to server
    function fQuestionAnsweredServerFeedback(){
      numQid = $(objQuizWorkingData.elCurrentQuestionContainer).attr('data');
      binCorrect =  objQuizWorkingData.arrBinAnswersCorrect[objQuizWorkingData.numCurrentQuestionIndex];
      objM = {
        binCorrect: binCorrect,
      };
      // Post the answer to server
      if(!objQuizWorkingData.binAjaxLocked){
        objQuizWorkingData.binAjaxLocked = true;
        $.ajax({
          url: Drupal.settings.basePath + Drupal.settings.dqdSuperstarSettings.txtFeedbackPath,
          type: 'POST',
          data: {
            z: Drupal.settings.dqdSuperstarSettings.numQuizId,
            q: numQid,
            m: JSON.stringify(objM)
          },
          dataType: 'json',
          success: function (data) {
              // ignore the response;
          }
        });
        setTimeout(function(){objQuizWorkingData.binAjaxLocked = false;} , 500);
        flog("Feedback sent - question " + numQid + " correctness: " + binCorrect);
      }
      else{
        flog('Feedback is NOT sent as narrow frequency in ajax sending. ');
      }
    }
    
    
    // go to next question or summary
    function fQuestionGotoNext(){
                        flog('fQuestionGotoNext');
      if (!objQuizWorkingData.binEnd) {
        $(txtQuizContainerClassSelector).find(".flexslider").flexslider("next");
      }else{
        fShowSummary();
      }
    }

    // show summary when question complete
    function fShowSummary(){
      // count for correct answers
      var numCorrectCount  = objQuizWorkingData.arrBinAnswersCorrect.map(function (item) {
        // console.log(item);
        return item ? 1 : 0;
      }).reduce(function (x, y) {
        return x + y;
      });
      // all correct flag
      var binAllCorrect = (numCorrectCount == objQuizWorkingData.numCount);
      // get star size
      var arrTxtIconSizeClass = ['fa-lg', 'fa-2x', 'fa-3x', 'fa-4x', 'fa-5x'];
      for(var i=arrTxtIconSizeClass.length; i<objQuizWorkingData.numCount; i++){
        arrTxtIconSizeClass.unshift('');
      }
      // container for star element html class
      var arrTxtIconsClass = [];
      var arrTxtClass = [];
      // each question
      for(var i=0; i<objQuizWorkingData.numCount; i++){
        // filled red star if correct. blank star if incorrect
        if(i < numCorrectCount){
          arrTxtClass = ['fa', 'fa-star', 'text-danger'];
        }
        else{
          arrTxtClass = ['fa', 'fa-star-o', 'text-danger'];
        }
        // flash stars if all correct
        if(binAllCorrect){
          arrTxtClass = arrTxtClass.concat(['animated', 'infinite', 'flash']);
        }
        // size the stars
        arrTxtClass.push(arrTxtIconSizeClass[i]);
        // compose stars html
        arrTxtIconsClass.push(
          '<i class="'+arrTxtClass.join(' ')+'"></i>'
        );
      }
      // the line to show
      var txtLine = binAllCorrect ? 'You are the superstar!' : 'Let\'s go on the way to Superstar!';
      // prepare html text for each parts of the card back
      var txtSummaryTitle = '' +
        '';
      var txtSummaryBody = '' +
        '<div class="dqd-summary">' +
          '<div class="">' +
            '<span>'+txtLine+'</span>' +
          '</div>' +
          '<div class="">' +
            arrTxtIconsClass.join('') +
          '</div>' +
        '</div>' +
        '';
      var txtSummaryFooter = '' +
        '<a class="btn btn-default dqd-continue" href="'+window.location.href+'"><i class="fa fa-arrow-circle-right fa-3x"></i></a>' +
        '';
      // action to manipulate card summary html on page
      $(objQuizWorkingData.elCurrentQuestionContainer).find(".dqd-back-header .dqd-css-tablecell").html(txtSummaryTitle);
      $(objQuizWorkingData.elCurrentQuestionContainer).find(".dqd-back-body .dqd-css-tablecell").html(txtSummaryBody);
      $(objQuizWorkingData.elCurrentQuestionContainer).find(".dqd-back-footer .dqd-css-tablecell").html(txtSummaryFooter);
      // flip the card to show the summary
      //    remarks: we should have looked for flip container. by chance the flip container is assigned same as the quiz container
      // # var elFlipContainer = $('.flexslider .flex-active-slide .flip-container');
      // # elFlipContainer.flip('true');
      $(objQuizWorkingData.elCurrentQuestionContainer).flip('true');
    }

    // to up the initial stars display in slide
    function fInitializeCurrentSlideStars(){
      $(objQuizWorkingData.elCurrentQuestionContainer).find(".dqd-option-star").removeClass('animated bounceOut').addClass('animated fadeOut fa-question fa-lg');
    }
    // update the current question indicator
    function fSetCurrentQuestion(){
      objQuizWorkingData.numCurrentQuestionIndex = $(txtQuizContainerClassSelector + " .flexslider").data("flexslider").currentSlide;
      objQuizWorkingData.elCurrentQuestionContainer = $('#superstar-question-container-' + objQuizWorkingData.numCurrentQuestionIndex);
                        flog('current question', objQuizWorkingData.numCurrentQuestionIndex);
    }

    // process start
    function fMain(){
      
      // Initialize: 
      // questions count
      objQuizWorkingData.numCount = $(".flexslider").data("flexslider").count;
      // shuffle options
      $(".dqd-choice-options-set").each(function(){fShuffleChildren(this)});
      // append option decorations
      $(".dqd-option").map(function (index, item) {
        $(this).prepend('<div class="dqd-progressbar"></div>');
        $(this).append('<div class="dqd-status"></div>');
      });
      
      if(binDebug === false){
        $(".flexslider").data("flexslider").controlNav.bind("click touchend MSPointerUp keyup", function(){return false;});
      }
      
      // for $.flexslider 
      if (typeof $.flexslider === 'function'){
        var elSliders = $('.flexslider');
        
        // when first slide loads
        // (start: Function Fires when the slider loads the first slide.)
        elSliders.bind('start', function(e, slider) {
          // alert("start");
          fSetCurrentQuestion();
          fRegisterCurrentSlideClickEvent($);
          fInitializeCurrentSlideStars();
        });

        // when sliding, turn off the active slide
        // (before: Function Fires asynchronously with each slider animation.)
        elSliders.bind('before', function(e, slider) {
          // alert("before");
          // $(slider).find('li.flex-active-slide .flip-container').flip(false);
        });
        
        // when sliding completes
        // (after: Function Fires after each slider animation completes.)
        elSliders.bind('after', function(e, slider) {
          fSetCurrentQuestion();
          fRegisterCurrentSlideClickEvent($);
          fInitializeCurrentSlideStars();
          // alert("after");
        });
        
        // when last slide is over
        // (end: Function Fires when the slider reaches the last slide (asynchronous)).
        elSliders.bind('end', function(e, slider) {
          objQuizWorkingData.binEnd = true;
        });
      }
    }
  },
};


})(jQuery);

/* ---------------------------  Flip and keyboard ---------------------------*/



/**
 *  @brief superstar quiz
 *    keyboard control registration by mousetrap
 *    card flip flip.js
 */

(function($){


Drupal.behaviors.superstarQuizFlashCard = {
  attach: function(context, settings) {
    
    // enabler
    var elClassSelector = '.view-ceqs-wordc2e-questions-of-quiz-x-display';
    if($(elClassSelector).length == 0){
      return false;
    }
    
    // when jquery flip is present, execute it
    if (typeof $().flip === 'function'){
      $('.view-ceqs-wordc2e-questions-of-quiz-x-display .dqd-flip-container').flip({
        axis: 'x',
        trigger: 'manual',
      });
    }
    else{
      console.log('No jQuery Flip found');
    }

    // when mousetrap is present, execute it
    if (typeof Mousetrap === 'function'){
      // bind <space> key to card flip
      Mousetrap.bind(
        'space', 
        function(){
          // $('.view-ceqs-wordc2e-questions-of-quiz-x-display .flex-active-slide .flip-container').flip('toggle');
          return false;
        }
      );
    }
    else{
      console.log('No Mousetrap found');
    }
  },
};

}(jQuery));




(function($){
$(document).ready(function(){

// start superstar
Drupal.dqdClass.Superstar.funStartSuperstarQuiz ('dqd-superstar-quiz');

});
})(jQuery);


(function($){
// debug switch and debig function
var binDebug = false;
                    // binDebug = true;
// debug function
function flog(){ if (typeof binDebug !== 'undefined' && binDebug === true) console.log(arguments);}

Drupal.dqdClass = Drupal.dqdClass || {};
Drupal.dqdClass.Superstar = {
  
  strQuizContainerId : null,
  
  elQuizContainer : null,
  
  strSet : null,
  
  strType : null, 
  
  objQuestionRepo : {},
  
  objQuestionStack : [],
  
  objVocabularies : {},
  
  numQuestionStackMinimumSize : 5,
  
  objFetchJobs : {},
  
  arrCurrentJobId : {},
  
  numAnswerCount : 0,
  
  objPresetQuestions : Drupal.settings.dqdSuperStar.presetQuestions,
  
  objEnv : Drupal.settings.dqdSuperStar.environment,

  funStartSuperstarQuiz : function ( strQuizContainerId ) {
    
    var that = this;
    
              // flog(strSelecter);
              // flog($(strSelecter)[0]);
    
    // # if (!$('#' + strQuizContainerId)[0]) {
    // #   return;
    // # }
    
    
    if (! that.funIni (strQuizContainerId)){
      return;
    }
    that.funFulfilQuestionStack (false);
    that.funUiCreateQuiz ();
    that.funGotoNextQuestion ();
  },
  
  funIni : function (strQuizContainerId) {
    var that = this;
    
    // quiz container
    that.strQuizContainerId = strQuizContainerId;
    if ($('#' + strQuizContainerId)[0]) {
      that.elQuizContainer = $('#' + strQuizContainerId)[0];
      return true;
    }
    else {
      return false;
    }
  },
  
  // push into question stack with local resource
  funFulfilQuestionStackLocal : function (numCountFill) {
    var that = this;
    var arrKPointQuestions = Object.values(that.objPresetQuestions);
    for (var i = 0; i < numCountFill; i ++) {
      // get random item from the question repository
      // random word
      var objKPointQuestions = arrKPointQuestions[Math.floor(Math.random() * arrKPointQuestions.length)];
      // random question in word
      var objQuestion = objKPointQuestions[Math.floor(Math.random() * objKPointQuestions.length)];
      // push into stack
      that.objQuestionStack.push(objQuestion);
    }
                    flog ('that.objQuestionStack after fulfill', that.objQuestionStack);
  },
  
  // push into question stack with remote resource
  funFulfilQuestionStackRemote: function(numCountFill) {
    var that = this;
    
                      // flog ('that.objFetchJobs', that.objFetchJobs);
    
    // todo: only add and do the job when there is none
    if (!$.isEmptyObject(that.objFetchJobs)) {
      return;
    }
    
    // mark the job as active
    var strJobId = 'j-'+ Math.random();
    that.objFetchJobs[strJobId] = true;
    
    // do the job
    var objPostData = {
      t: 'superstar',
      c: that.objEnv.c,
      l: that.objEnv.l,
    };
    $.ajax({
      type: "POST",
      url: that.objEnv.qUrl,
      data: objPostData,
      dataType: 'json',
      success: function (objData) {
                                // flog('followme-get-questions', objData);
        // if the job is still active by the time we receive the remote data
        if (that.objFetchJobs[strJobId] !== undefined && that.objFetchJobs[strJobId] == true) {
                      // flog ('that.objFetchJobs[strJobId] when data fetched', that.objFetchJobs[strJobId]);
          // remove the job
          delete that.objFetchJobs[strJobId];
          $.each (objData, function (i, strCid){
            var objKPointQuestions = that.objPresetQuestions['c-' + strCid];
            // random question in word
            var objQuestion = objKPointQuestions[Math.floor(Math.random() * objKPointQuestions.length)];
            // incorporate the data
            that.objQuestionStack.push(objQuestion);
          });
          // try getting the local data as a complementary action
          that.funFulfilQuestionStack (false);
        }
      },
    });
    // if the job is marked 'active' for a too long time
    setTimeout (function(){
      if (that.objFetchJobs[strJobId] !== undefined && that.objFetchJobs[strJobId] == true) {
        // remove the job
        delete that.objFetchJobs[strJobId];
        // try getting the local data as a complementary action
        that.funFulfilQuestionStack (false);
      }
    }, 5000);
  },

    //fill in the active question repository ie yejiushi the quiz
  funFulfilQuestionStack : function (binRemote = true) {
    var that = this;
    
                        // flog('binRemote', binRemote);
                        // flog('that.objQuestionStack before fulfill', that.objQuestionStack);
    var numQuestionStackCount = that.objQuestionStack.length;
    var numCountFill = that.numQuestionStackMinimumSize - that.objQuestionStack.length;
                        // flog('numCountFill question that the stack is short of', numCountFill);
    if (numCountFill > 0) {
      if (binRemote) {
        that.funFulfilQuestionStackRemote (numCountFill);
      }
      else {
        that.funFulfilQuestionStackLocal (numCountFill);
      }
    }
  },
  
  funUiCreateQuiz : function () {
    var that = this;
    
    var strHtml = ''
      + '<div class = "dqd-quiz-quiz">'
      +   '<div class = "dqd-top-bar">'
      +     '<div class = "dqd-top-bar-back-button">'
      +       `<a href="${that.objEnv.lUrl}"><i class="fa fa-fw fa-arrow-left"></i></a>`
      +     '</div>'
      +     '<div class="dqd-progress">'
      +       '<i class="dqd-progress-star fa fa-fw fa-star"></i>'
      +       `<div class="dqd-progress-text">${that.objEnv.p}%</div>`
      +     '</div>'
      +   '</div>'
      // +   '<div class = "dqd-quiz-question">'
      // +     'Q1'
      // +   '</div>'
      // +   '<div class = "dqd-quiz-question">'
      // +     'Q2'
      // +   '</div>'
      + '</div>'
    ;
    
    $(that.elQuizContainer).html(strHtml);
    that.funUiCompleteQuestions ();
  },
  
  // fulfill questions in quiz if less than 2
  funUiCompleteQuestions : function () {
    var that = this;
    
    // question container
    var elQuestions = $(that.elQuizContainer).find(".dqd-quiz-quiz")[0];
                      // flog('that.elQuizContainer',that.elQuizContainer);
                      // flog('elQuestions container',elQuestions);
    
    // do if number of questions in ui is not enough ( of count of 2)
    if ($(elQuestions).find(".dqd-quiz-question.dqd-question-healthy").length < 2) {
      // append one more question to UI
      that.funUiAppendQuestion (elQuestions);
      // return;
      // that.funUiCompleteQuestions();
      setTimeout ( function () {that.funUiCompleteQuestions();}, 10); // we leave a bit time for the dom to load
    }
  },
  
  // append one more question to the questions ui
  funUiAppendQuestion : function (elQuestions) {
    var that = this;
    
    // get question data
    var objQuestion =  that.funPopQuestionData ();
    
                      // flog('objQuestion', objQuestion);
    // question element
    var elQuestion = document.createElement("div");
    $(elQuestion).addClass("dqd-quiz-question  alert alert-info dqd-question-healthy").data('q', objQuestion.q);
    
                      // flog('objQuestion', objQuestion);
    if (objQuestion) {
      // options data
      objQuestion.options = that.funShuffle (objQuestion.options);
      // options html
      var strOptionsHtml = '';
      objQuestion.options.forEach(function(objOption){
        var strCorrectClass = objOption.correct ? 'dqd-correct-option' : '';
        var strSignClass = 'fa fa-fw fa-lg fa-question text-danger animated fadeOut';
        strOptionsHtml += ''
          + `<div class="dqd-option ${strCorrectClass}" data-index=${objOption.index}>`
          +   '<div class="dqd-progressbar"></div>'
          +   `<div class="dqd-option-text">${objOption.text}</div>`
          +   `<i class="dqd-option-star ${strSignClass}"></i>`
          + `</div>`
        ;
                      // flog('strHtml', strHtml);
      });
      var strVoiceUrl = objQuestion.face[0].voice_url;
      var strFaceText = objQuestion.face[0].text;
      // question html
      $(elQuestion).html ( ''
        + '<div class="dqd-face">'
        +   `<a href="${strVoiceUrl}" title="${strFaceText}" class="sm2_button dqd-voice-button">&nbsp;</a>`
        +   `<div class = "dqd-font-reading dqd-face-text">${strFaceText}</div>`
        + '</div>'
        + '<div class="dqd-options">'
        +   `<div>${strOptionsHtml}</div>`
        + '</div>'
      );
                      flog('elQuestion rendered', elQuestion);
      // click events registration
      that.funRegisterClickEvent (elQuestion);
      $(elQuestions).append(elQuestion);
    }

  },
  
  // get next question data
  funPopQuestionData : function () {
    var that = this;
    var objQuestion = that.objQuestionStack.shift ();
    
    // question stack housekeeping
    setTimeout (function(){
      that.funFulfilQuestionStack (that.objEnv.s);
    }, 100);
    return objQuestion;
  },
  
  funShuffle : function (array) {
    var that = this;
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },
  
  // process option click event
  //    set immediate data
  funRegisterClickEvent : function (elQuestion){
    var that = this;
    var binHit;
    $(elQuestion).find(".dqd-option").on("click", function (e) {
                      // flog('clicked on ', $(this));
      var elThisOption = this;
      
      // disable clicking on the current question
      $(elThisOption).siblings().andSelf().off("click");
      
      // keep the click fingerprint
      $(elThisOption).addClass("dqd-clicked");
      
      // check and record the answer correctness
      if ($(elThisOption).hasClass("dqd-correct-option")){
        $(elThisOption).addClass("dqd-hit");
        binHit = true;
      }else{
        $(elThisOption).siblings("dqd-correct-option").addClass("dqd-miss");
        binHit = false;
      }
      
      // ending
      that.funQuestionAnswerProcess (elQuestion, binHit);
      
      // end of click event
      return false;
    });
  },

  // involked when an option is clicked
  funQuestionAnswerProcess : function (elQuestion, binHit) {
    var that = this;
    
    that.numAnswerCount++;
    
    // ui action
    that.funQuestionAnsweredUiFeedback (elQuestion, binHit);
    
    // feedback to server
    that.funQuestionAnsweredServerFeedback (elQuestion, binHit);
    
    // go to next question
    setTimeout(function(){that.funGotoNextQuestion();}, binHit?0:1500);
    // that.funGotoNextQuestion();

  },
  
  // process ui feedback after clicking
  funQuestionAnsweredUiFeedback : function (elQuestion, binHit) {
    
    var that = this;
    
    var arrElCorrectClickOptions = $(elQuestion).find(".dqd-correct-option, .dqd-clicked");
                        // flog ('arrElCorrectClickOptions', arrElCorrectClickOptions);

    $.each (arrElCorrectClickOptions, function (i, elCorrectClickOption) {
      $(elCorrectClickOption).find(".dqd-progressbar").animate({
        width: '100%',
      }, 200);
    });
    
    var elStar = $(elQuestion).find(".dqd-correct-option .dqd-option-star");
    $(elStar).removeClass('bounceIn bounceOut rollOut fadeOutRight fadeOut fa-star fa-star-half-o fa-question');
    if ($(elStar).parent().hasClass('dqd-hit')) {
      $(elStar).addClass('fa-star wobble fa-lg');
    }
    else {
      $(elStar).addClass('fa-star-o wobble fa-lg');
      // ## setTimeout (
      // ##   function(){$(elStar).addClass('fadeOut');}, 
      // ##   500
      // ## );
    }
  },
  
  // feed back to server
  funQuestionAnsweredServerFeedback : function (elQuestion, binHit) {
                      flog ('elQuestion at server feedback', elQuestion);
                      // flog ('elQuestion data', $(elQuestion).data('q'));
    var that = this;
    
    // prepare data
    var strQuestionId = $(elQuestion).data('q');
    var strClickIndex = $(elQuestion).find('.dqd-clicked')[0].getAttribute('data-index');
                      // isUpdateProgress = true;
                      // flog ('strClickIndex', strClickIndex);
    
    // do the job
    // var strPostUrl = Drupal.settings.basePath + 'api/832JvywA5J';
    var objPostData = {'a':JSON.stringify({
      t: 'superstar',
      c: that.objEnv.c,
      l: that.objEnv.l,
      q: strQuestionId,
      h: binHit,
      k: strClickIndex,
      s: that.numAnswerCount,
    })};
    $.ajax({
      type: "POST",
      url: that.objEnv.fUrl,
      data: objPostData,
      dataType: 'json',
      success: function (objData) {
        if (objData.p != undefined && !isNaN(objData.p)) {
          $('.dqd-progress-text').text(`${objData.p}%`);
        }
      },
    });
  },
  
  funGotoNextQuestion : function () {
    
    var that = this;
    var elQuestions = $(that.elQuizContainer).find(".dqd-quiz-quiz");
    
    // hide the current questioni from ui, label it as recycled
    $(elQuestions).find(".dqd-quiz-question.dqd-active").removeClass('dqd-active dqd-question-healthy').addClass('dqd-recycled animated bounceOutLeft');

    // remove the qustion dom that is labeled recycled
    // deletion is performed after a time during which ui effect takes place
    // ## setTimeout (function () {$(elQuestions).find(".dqd-recycled").remove();}, 2000);
    
    // display the next question to ui
    $(elQuestions).find('.dqd-quiz-question.dqd-question-healthy').first().show().addClass('dqd-active animated bounceInRight');
    
    // re-build the question ui after the above changes
    that.funUiCompleteQuestions();
    
  },
  
}
})(jQuery);


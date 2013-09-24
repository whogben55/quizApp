var q1 = new Question('Who was the first player drafted in the first NFL draft in 1936','Sammy Baugh','Don Hutson','Bart Starr','Jay Berwanger');
var q2 = new Question('What player led the NFL with 27 rushing touchdowns in 2003?','Ahman Green','Marshall Faulk','Jamal Lewis','Priest Holmes');
var q3 = new Question('What team won the first night football game ever played?','Akron Pros','Canton Bulldogs','CHicago Bears','Phildelphia Athletics');
var q4 = new Question('In 1993, what NFL team made off-season trades for Joe Montana and Marcus Allen?','Oakland Raiders','San Francisco 49ers','Denver Broncos','Kansas City Chiefs');
var q5 = new Question('What team was originally named the New York Titans?','Tennessee Titans','New York Giants','Kansas City Chiefs','New York Jets');
var q6 = new Question('What year was the sudden-death overtime period adopted by the NFL?','1954','1964', '1984','1974');
var q7 = new Question('How many weeks did the regular NFL season last in 1992?','16 weeks','17 weeks','19 weeks','18 weeks');
var q8 = new Question('What team won 3 Super Bowls in the 1990s?','San Francisco 49ers','Denver Broncos','New England Patriots','Dallas Cowboys');
var q9 = new Question('How many games made up the NFL regular season schedule in 1982?','14 games','16 games','17 games','9 games');
var q10 = new Question('Who was the first player to rush for 1000 yards in a season?','Steve Van Buren','Joe Perry','Jim Brown', 'Beattie Feathers');
var questions = new Array(q1,q2,q3,q4,q5,q6,q7,q8,q9,q10);
var quiz = new Quiz(questions);
var value ="";
console.log(q1.choices[0]);


$(document).ready( function() {
    $('#question').html(quiz.currentQ.question);
    var a  = '<input type="radio" name="group1">'+ quiz.answers[0];
    $('#q1').html('<input type="radio" name="group1" value="'+quiz.answers[0]+'">'+ quiz.answers[0]);
    $('#q2').html('<input type="radio" name="group1" value="'+quiz.answers[1]+'">'+ quiz.answers[1]);
    $('#q3').html('<input type="radio" name="group1" value="'+quiz.answers[2]+'">'+ quiz.answers[2]);
    $('#q4').html('<input type="radio" name="group1" value="'+quiz.answers[3]+'">'+ quiz.answers[3]);
 
    $(document.body).on('click',"input:radio[name=group1]" , function() { //get value from radio buttons
        value = $(this).val();
    });
    
    $(document.body).on('click', '#submit', function(){ // on submit button click
        console.log(value);
        if(quiz.submit(value)){
            correctAnswer();
        }else incorrectAnswer();
        $('#down').html('Down 0'+quiz.total.toString());
        $('#togo').html('to-go '+(10-quiz.total).toString());
        $('#question').html(quiz.currentQ.question); // set new quiz values
        $('#q1').html('<input type="radio" name="group1" value="'+quiz.answers[0]+'">'+ quiz.answers[0]);
        $('#q2').html('<input type="radio" name="group1" value="'+quiz.answers[1]+'">'+ quiz.answers[1]);
        $('#q3').html('<input type="radio" name="group1" value="'+quiz.answers[2]+'">'+ quiz.answers[2]);
        $('#q4').html('<input type="radio" name="group1" value="'+quiz.answers[3]+'">'+ quiz.answers[3]);
        
        if( quiz.total == 10 ){ // if game over 
            $('#quiz').remove();
            quizOver(); 
        }
    });
});


function Question (question, a, b, c, correct){ // question class
    this.question = question;
    this.choices = new Array(a,b,c,correct);
    this.correct = correct;
    
    this.isCorrect = function( answer ){
        if (answer == this.correct)
            return true;
        else return false;
    }
    
    this.getChoices = function(){
        for(var j=0; j<5; j++){
            for (var i=0; i< this.choices.length; i++) {
                var holder = this.choices[i];
                var random = Math.floor(Math.random()*this.choices.length);
                this.choices[i] = this.choices[random];
                this.choices[random] = holder;
            }
        }
        return this.choices;
    }
}

function Quiz ( quests ){ //quiz class
    this.questions = quests;
    this.right = 0;
    this.total = 0;
    this.current = Math.floor( Math.random() * this.questions.length );
    this.currentQ = this.questions[this.current];
    this.answers = this.currentQ.getChoices();
    
    this.submit = function( answer ){ // on submit press
        var ret = true;
        this.total++; 
        if ( (this.questions[ this.current ]).isCorrect(answer) ){
            this.right++;
        } else ret = false;
        
        if (this.total == 10 ){
            return;
        }
        this.questions.splice( this.current, 1 ); //remove question
        this.current = Math.floor( Math.random() * this.questions.length ); // hoose random 
        this.currentQ = this.questions[this.current];
        this.answers = this.currentQ.getChoices();
        return ret;
    }
    
    
}

var correctAnswer = function(){  
    var string ="";
    console.log(quiz.right);
    if( quiz.right < 10 ) string = "0";
    $('#left').html('Right ' + string + (quiz.right).toString());
}

var incorrectAnswer = function(){
    var string ="";
    if( (quiz.total-quiz.right) < 10 ) string = "0";
    $('#right').html('Wrong ' + string + (quiz.total-quiz.right).toString());
}

var quizOver = function(){
    $('#down').html('GAME OVER');
    $('#down').css('margin-left','-20px');
    $('#togo').html('<a href="http://whogben55.github.io/quizApp">REPLAY</a>');
    
}




                                      
                                      
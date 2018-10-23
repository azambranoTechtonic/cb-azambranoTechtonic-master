function Comment (container) {

  //  This is your Comment class constructor.  It is being passed a container parameter and has the URL that will eventually allow you to test your comment board through Postman.
  //The last piece of the constructor simply assigns an empty array to this._commentState.

  this.$container = container;
  this.url = 'http://127.0.0.1:3001/comment';
  this._commentState = new Array();
};

//----------------------------------------------------------------------------------------------------------------
//  Let's get our comments!

// Create a prototyped method called _runGet().  Within the function of this method, assign the following chained jQuery method to a variable:  $.ajax().done().fail();  This will be a jQuery $.ajax() request.
//In native JS, you could accomplish the same objective using an XTMLHttpRequest object, however, the jQuery method is much cleaner and easier to digest.
// For further details om the differences between the two see here:  http://vanilla-js.com/

Comment.prototype._runGet = function ()
{
  var _self = this;

  // Inside of the $.ajax() parentheses, create an object that contains the url from the constructor as the first key, the type key as "GET", and the dataType key as 'json'.
  $.ajax({
      url: 'http://127.0.0.1:3001/comment',
      type: "GET",
      dataType: "json"
  })

  //  Inside of the .done() parentheses, create an anonymous function that takes in "response" as it's only parameter.  This is the part that will return a successful response in the form of a '200' status
  // for your HTTP request to the server.  If the request sent is successful, the response sent back will contain a json object with all of your comments in it.
  // You will need to update your comment board UI display after this step.  In Postman, you can look for this status code to confirm if your request went through.
  .done(function (response) {
    $("#show-comments").empty();
    gCommentMod.loadComments(response);
  })

  // Inside of the .fail() parentheses, create an anonymous function that takes no parameters and console.logs an error message that says "Error finding comments."  If your request is unsuccesssful,
  // this method will return the console.log to alert the user that they have received an error, like '404' or '500'.  In Postman, you can look for one of these status codes to confirm if your request failed.
  .fail(function () {
    console.log("Error finding comments.");
  });
};


//----------------------------------------------------------------------------------------------------------------

// Let's post a comment!

// Write a prototyped function called firePost that will grab data from the comment board form.  When the formData is pulled in as a parameter of your function, you will need to check whether formData exists.
//If so, you will want to use an $.ajax() request to "POST" the data to your application in the form of a stringified json object.  You will have to determine the url, the method type, the body,
// and the headers for the request object to get your comment to post properly.  IF your "GET" is fully functional, you will see your post display in your browser after making a post.
//This should be set up with the same chained jQuery method as your "GET": $.ajax().done().fail();.  You should not need to change the .done() and .fail() methods from the _runGet very much.

Comment.prototype.firePost = function (oData)
{
  var _self = this;

  $.ajax({

      url: 'http://127.0.0.1:3001/comment',
      type: "POST",
      dataType: "json",
      data: JSON.stringify(oData),
      headers: {'Content-Type': 'application/json'}

  })
  .done(function (data) {
    console.log(data);
    //_self.initMap(data.results[0])
  })
  .fail(function () {
    console.log("Error posting comment.");
  });
};


//----------------------------------------------------------------------------------------------------------------
// Let's delete a comment!

// Write a prototyped function called fireDelete that will grab the _id value that database autogenerates for you for each entry in as a parameter.  If the _id argument is available, you will need to get
//createive about how to target it using the url and the $.ajax().done().fail(); structure we have used previously.  You'll have to specify the url, the method, and the headers for the $.ajax() object.
//You should not need to change the .done() and .fail() methods from the _runGet very much.


Comment.prototype.fireDelete = function (oId)
{
  var _self = this;

  $.ajax({
      url: 'http://127.0.0.1:3001/comment/' + oId,
      type: "DELETE",
      headers: {'Content-Type': 'application/json'}
  })
  .done(function (data) {
    console.log(data);
    //_self.initMap(data.results[0])
  })
  .fail(function () {
    console.log("Error deleting comments");
  });

};

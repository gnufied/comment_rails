var converter = new Showdown.converter();

var data = [
  {author: "Hemant Kumar", text: "Eat apples"},
  {author: "Kiran Soumya", text: "Please don't eat apples"}
];

var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return(
      <div className="comment">
        <h2 className="commentAuthor">{this.props.author}</h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var CommentBox = React.createClass({
  render: function() {
    return(
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});


var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return(
        <Comment author={comment.author}> {comment.text} </Comment>
      );
    });
    return(
      <div id="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return(
      <div className="commentForm">
        Hello World, I am a comment Form!
      </div>
    );
  }
});

React.render(
  <CommentBox url="http://localhost:9292/comments"/>,
    document.getElementById("content")
);
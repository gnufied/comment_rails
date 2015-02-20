var converter = new Showdown.converter();

var data = [
  {author: "Frodo baggins", text: "Eat apples"},
    {author: "Sam wise", text: "Please don't eat apples"},
    {author: "Foo bar", text: "Emacs rocks"}
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
  getInitialState: function() {
    return {data: []};
  },
    handleCommentSubmit: function(comment) {
      // handle comment submition
      var comments = this.state.data;
      $.ajax({
        url: this.props.url,
          dataType: 'json',
          type: 'POST',
          data: comment,
          success: function(data) {
            var newComments = comments.concat([comment]);
            this.setState({data: newComments});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }
      });
    },
    loadCommentsFromServer: function() {
      $.ajax({
	url: this.props.url,
	  dataType: 'json',
	  success: function(data) {
	    this.setState({data: data});
	  }.bind(this),
	  error: function(xhr, status, err) {
	    console.error(this.props.url, status, err.toString());
	  }.bind(this)
      });
    },
    componentDidMount: function() {
      this.loadCommentsFromServer();
      setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
      return(
	<div className="commentBox">
	  <h1>Comments</h1>
	  <CommentList data={this.state.data} />
	  <CommentForm onCommentSubmit={this.handleCommentSubmit} />
	</div>
      );
    }
});


var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return(
	<Comment author={comment.author}>{comment.text}</Comment>
      );
    });
    return(
      <div id="commentList">{commentNodes}</div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();

    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
  },
    render: function() {
      return(
	<form className="commentForm" onSubmit={this.handleSubmit}>
	  <input type="text" placeholder="Your name" ref="author" />
	  <input type="text" placeholder="Comment ..." ref="text" />
	  <input type="submit" value="Post" />
	</form>
      );
    }
});


$(document).ready(function() {
  React.render(
    <CommentBox url="comments.json" pollInterval={2000}/>,
      document.getElementById("content")
  );
});

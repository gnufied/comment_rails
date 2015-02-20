# Comments controller
class CommentsController < ApplicationController
  respond_to :html, :json
  def index
    comment_array = Comment.all.map do |comment|
      { author: comment.user.fullname, text: comment.text }
    end
    respond_with(comment_array)
  end
end

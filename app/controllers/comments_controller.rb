# Comments controller
class CommentsController < ApplicationController
  respond_to :html, :json
  def index
    comments = Comment.all
    respond_with(comments)
  end

  def create
    p params
    comment = Comment.create!(author: params[:author], text: params[:text])
    respond_with(comment)
  end
end

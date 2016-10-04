class VotesController < ApplicationController
  
  def the_user
    render json: {id: current_user.id} if current_user
  end

  def like
    if current_user
      get_vote
      
      if @vote.like == 0 && @vote.dislike != -1
        @vote.like += 1  
      elsif @vote.like == 1 
        @vote.like -= 1 
      end
        @vote.save

        total = SampleSale.find(params[:sample_sale]).total_likes
        render json: {id: params[:sample_sale], like: @vote.like, likes: total}
      # redirect_to sample_sales_path
    else 
      flash[:error] = "You need to sign in or sign up before continuing."
      redirect_to new_user_session_path
    end
  end

  def dislike
    if current_user
      get_vote
      
      if @vote.dislike == 0 && @vote.like != 1
        @vote.dislike -= 1 
      elsif @vote.dislike == -1 
        @vote.dislike += 1  
      end
        @vote.save

        total = SampleSale.find(params[:sample_sale]).total_dislikes
        render json: {id: params[:sample_sale], dislike: @vote.dislike, dislikes: total}

      # redirect_to sample_sales_path
    else
      flash[:error] = "You need to sign in or sign up before continuing."
      redirect_to new_user_session_path
    end
  end

private

  def get_vote
    sample_sale = SampleSale.find(params[:sample_sale])
    @vote = Vote.find_or_create_by(sample_sale_id: sample_sale.id, user_id: current_user.id)
    sample_sale.votes << @vote
  end

end

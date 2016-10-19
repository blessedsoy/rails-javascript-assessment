
function likeButton(e, that){
    e.preventDefault();

    var url = $(that).attr('href')
    $.get(url, function(data){
      console.log(data)
      if(data.like === 0){
        $(that).replaceWith("<a class='fa fa-thumbs-o-up center like_before' onclick='likeButton(event, this)' href=" + url +">");
        $('td#likeTotal'+ data.id).html(data.likes)
        console.log(data.likes) 
      }else if (data.like === 1){
        $(that).replaceWith("<a class='fa fa-thumbs-o-up center like_after' onclick='likeButton(event, this)' href=" + url +">")
        $('td#likeTotal'+ data.id).text(data.likes)
        console.log(data.likes)  
      }else if (data.dislike === 0){
        $(that).replaceWith("<a class='fa fa-thumbs-o-down center dislike_before' onclick='likeButton(event, this)' href=" + url +">")
        $('td#dislikeTotal'+ data.id).text(data.dislikes)  
      }else if (data.dislike === -1){
        $(that).replaceWith("<a class='fa fa-thumbs-o-down center dislike_after' onclick='likeButton(event, this)' href=" + url +">")
        $('td#dislikeTotal'+ data.id).text(data.dislikes) 
      }
    })
};


sampleSaleIndexWithUser();

 $(document).on('click', '#sort-by-likes', function(event) { 
    var clicked = true
    

    sampleSaleIndexWithUser(true);
         // event.preventDefault();
   });



// $('a#sort-by-dates').click(function(event) {
//   clicked = false;
//   alert(clicked);
//     sampleSaleIndexWithUser(clicked);
//   clicked = false;
// })


  function sampleSaleIndexWithUser(boolean, x){
    $.get('/the_user', function(user){
      if(user){
         var user_id = user.id
      }

      sampleSaleIndex(boolean);

      function sampleSaleIndex(boolean){
        // console.log(boolean)
        $.get('/sample_sales.json',{ clicked: boolean }, function(data){
          var table = $('#inner_table'), html, finalSt ="";
          $.each(data, function(i, sale){

            // console.log(data.current_user)
            var checkbox, likeButton, dislikeButton, voted, votesIndex;
            var likeTotal = 0;
            var dislikeTotal = 0;

            function SampleSale(user, lists, sale){
              this.user = user;
              this.lists = lists;
              this.sale = sale;
            }

            SampleSale.prototype.checkbox = function(){
              if (this.lists.length === 0 || !this.user) {
                return "<input type='checkbox' name='sample_sales_ids[]' id='sample_sales_ids_' value='" + this.sale.id + "'>"
              } else {
                  for(var i = 0; i < this.lists.length ; i++) {
                    if (this.lists[i].user_id === this.user.id) {
                      return "";  
                    } else {
                        return "<input type='checkbox' name='sample_sales_ids[]' id='sample_sales_ids_' value='" + this.sale.id + "'>"
                    } 
                  } 
              }
            }

            var sample_sale = new SampleSale(user, sale.lists, sale)

            // if(sale.lists.length === 0 || !user){
            //   checkbox = "<input type='checkbox' name='sample_sales_ids[]' id='sample_sales_ids_' value='" + sale.id + "'>"
            // }else {
            //   for(var i = 0; i < sale.lists.length ; i++){
            //     if (sale.lists[i].user_id === user.id){
            //       checkbox = "";  
            //     } else {
            //       checkbox = "<input type='checkbox' name='sample_sales_ids[]' id='sample_sales_ids_' value='" + sale.id + "'>"
            //     } 
            //   } 
            // }

            if(sale.votes.length !== 0 && user){
              var votes = sale.votes
              votes.forEach(function(vote,i){
                likeTotal += vote.like
                dislikeTotal += vote.dislike
                if(vote.user_id == user_id){
                  voted = true;
                  votesIndex = i;
                }
              });  
            };

            if (voted && sale.votes[votesIndex].like !== 0) {
              likeButton = "<a class='fa fa-thumbs-o-up center like_after' onclick='likeButton(event, this)' href='/like?sample_sale="
            } else if (!user || !voted || (voted && sale.votes[votesIndex].like == 0)) {
              likeButton = "<a class='fa fa-thumbs-o-up center like_before' onclick='likeButton(event, this)' href='/like?sample_sale="
            }

            if (voted && sale.votes[votesIndex].dislike !== 0) {
              dislikeButton = "<a class='fa fa-thumbs-o-down center dislike_after' onclick='likeButton(event, this)' href='/dislike?sample_sale="
            } else if (!user || !voted || (voted && sale.votes[votesIndex].dislike == 0)) {
            dislikeButton = "<a class='fa fa-thumbs-o-down center dislike_before' onclick='likeButton(event, this)' href='/dislike?sample_sale="
            }


            var str = "<tr><td>" + sample_sale.checkbox() + "</td><td>" + '<a href="/sample_sales/' + sale.id + '">' + sale.brand +'</a>' + "</td><td>"+ '<a href="/sample_sales/' + sale.id + '">' + sale.dates + '</a>' + "</td><td>" + '<a href="/sample_sales/' + sale.id +'">' + sale.address + '</a>' + "</td><td>" + likeButton + sale.id + "'></td><td id='likeTotal" + sale.id + "'>" + likeTotal + "</td><td>" + dislikeButton + sale.id + "'></td><td id='dislikeTotal"+ sale.id + "'>"+ dislikeTotal + "</td></tr>"
            
            finalSt += str
            // html.push($.parseHTML(   str   ));
            // console.log(html)

          })
          html = $.parseHTML( "<tbody id='inner_table'>" + finalSt + "</tbody>")
          
            table.replaceWith(html)

            var sortTable = $('table.sortable')
            
            sorttable.makeSortable(sortTable);
        });
      }
    })
  }






  $(function() {
    
    createEditButton();
    deleteButton();


    
  });


    function createEditButton(){
    $('form#ce').submit(function(event) {
      event.preventDefault();
      var that = this;
      var values = $(this).serialize();
      var url = $(this).attr('action');
      var posting = $.post(url, values);

      posting.done(function(data) {
        $("#memo").text(data.memo_after);
        var submit = $(that).find('#submit')
        if(data.memo_after !== "" || data.memo_before !== data.memo_after){
          $(submit).replaceWith('<div id="submit"><div class="btn btn-group editDelete"><input type="submit" name="commit" value="Edit" class="btn btn-default btn-sm btn-info" data-disable-with="Edit"><form class="button_to" method="post" action="/delete_memo/'+ data.id +'"><input onclick="deleteButton()" class="btn btn-default btn-sm btn-danger" type="submit" value="Delete"></form></div></div>');
          if(data.memo_before !== null && data.memo_before !== ""){
            alert("memo has been updated")
          }
        } else{
          $(submit).replaceWith('<div id="submit"><input type="submit" name="commit" value="Create" class="btn btn-default btn-sm btn-success" data-disable-with="Create"></div>')
        } 
      });

      console.log('hello')
      
    });
  };
    function deleteButton(){
      $('form.button_to').submit(function(event) {
        event.preventDefault();
        var firstThis = this;
        // var values = $(this).serialize();

        var action = this.action.split('/')
        var id = action[action.length-1]
        // $.ajax({ 
        //   method: "post",
        //   url: "/delete_memo/" + id,
        //   data: {}
        // })
        var deleting = $.post("/delete_memo/" + id)
            var that = firstThis;
            deleting.done(function(data){
           $(that).parent().replaceWith('<input type="submit" name="commit" value="Create" class="btn btn-default btn-sm btn-success" data-disable-with="Create">')
          $("textarea#" + data.id).val('');
        })
      });
    };   



// '<input type="submit" name="commit" value="Create" class="btn btn-default btn-sm btn-success" data-disable-with="Create">'
//   <%= f.submit "Create", class:"btn btn-default btn-sm btn-success" if !list.memo || list.memo == '' %>

//   <div class="btn btn-group editDelete">
//   <%= f.submit "Edit", class:"btn btn-default btn-sm btn-info" if list.memo && list.memo != '' %>
// <% end %>
//   <%= button_to "Delete", delete_memo_path(list.id), method: :get, class:"btn btn-default btn-sm btn-danger" if list.memo && list.memo != '' %> 
//  </div>
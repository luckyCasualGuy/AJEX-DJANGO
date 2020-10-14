// This function will run only when page is in ready condition

// we need two things in this case:
// csrf token and title field
$(document).ready(function(){

    var csrfToken = $('input[name=csrfmiddlewaretoken]').val();

    // event handler for onclick event on button
    // as parameter we can add tags directly too but we use id's for specific
    // id's are specified by #
    $("#TaskFormCreateButton").click(function(){
        // serialise method is used to extract form field values and encode it for sending
        var serializedData = $("#TaskCreationForm").serialize();
        // our form gives two things a csrf token and title that we collect
        console.log(serializedData) // -> csrfmiddlewaretoken=Mu5oz9py03Zda41T9LHvvrMnj3lq9JxbMdfmO3UVfchQuG8RGUSo5toXqjgaW9Sr&title=call%20police

        // to pass this data into task list view ajax will be used
        // ajax takes a dictionary
        $.ajax({
            url: $("TaskCreationForm").data('url'), // Where to send the req
            data: serializedData, //data to send
            type: "post", //type of request
            // What to do with responce
            success: function(responce){
                // Here you need to pass 
                $("#TaskList").append(
                    '<div class="card mb-1" data-id="'+ responce.task.id +'"><div class="card-body">' + responce.task.title +'<button class="close float-right" type="button"><span aria-hidden="true">&times;</span></button></div></div>'
                )
            }
        })

        // Resetting an input feild using JQuerry
        $("#TaskCreationForm")[0].reset();
    });

    // edge does not support hover from styles.css
    $("#TaskCard").hover(function(){
        $(this).addClass('hover')
    }, function(){
        $(this).removeClass('hover')
    })

    $("#TaskList").on('click', '.card', function(){
        var dataId = $(this).data("id");

        $.ajax({
            url: '/todo/' + dataId + '/completed/',
            data: {
                csrfmiddlewaretoken: csrfToken,
                id: dataId
            },
            type: 'post',
            success: function(){
                var taskCard = $("#TaskCard[data-id='"+ dataId +"']");
                taskCard.css('text-decoration', 'line-through').hide().slideDown();

                $("#TaskList").append(taskCard);
            }
        });
    });
});
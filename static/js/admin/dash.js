$(".btn-del").click(function(){
    const id = $(this).attr('user_id');

    $('input[name="user_id"]').val(id);
})

$(".btn-del-confirm").click(function(){
    const id = $('input[name="user_id"]').val();

    fetch(
        "/admin/del-user-account?user_id="+id
    )
    .then(r => r.json())
    .then(r => {
        if (r.message == 'success'){
            $("#user_"+id).remove();
        }
    });
})
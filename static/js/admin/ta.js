$(".btn-edit").click(function(){
    id = $(this).attr('account_id');
    op_status = $(this).attr('status');
    
    account_status = $('select[name="account_status_'+id+'"]');
    if (account_status.attr("disabled") == 'disabled'){
        account_status.removeAttr('disabled');
    }else{
        account_status.attr('disabled', 'disabled');
    }

    account_state = $('select[name="account_state_'+id+'"]');
    if (account_state.attr("disabled") == 'disabled'){
        account_state.removeAttr('disabled');
    }else{
        account_state.attr('disabled', 'disabled');
    }
    
    account_type = $('select[name="account_type_'+id+'"]');
    if (account_type.attr("disabled") == 'disabled'){
        account_type.removeAttr('disabled');
    }else{
        account_type.attr('disabled', 'disabled');
    }

    if (op_status == 'edit'){
        $(this).text("Save");
        $(this).attr('status', 'save');
    }else{
        $(this).text("Edit");
        $(this).attr('status', 'edit');

        fetch(
            "/admin/edit-trading-accounts?account_status="+account_status.val()+"&account_state="+account_state.val()+"&account_type="+account_type.val()+"&id="+id
        )
        .then(r => r.json())
        .then(r => {
            err_msg = $("#err_msg_"+id)
            if (r.message == 'success'){
                err_msg.addClass("text-success");
                err_msg.removeClass("text-danger");
                err_msg.text("Success!!");
                err_msg.show();
            }else{
                err_msg.addClass("text-danger");
                err_msg.removeClass("text-success");
                err_msg.text("Failed!!");
                err_msg.show();
            }

            setTimeout(() => {
                err_msg.hide();
            }, 1500);
        })
    }
})
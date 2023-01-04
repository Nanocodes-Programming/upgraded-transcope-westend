jQuery(document).ready(function ($) {
    window.onload = function(){
        let cookieRef = ms_store_get_cookie('referenceId') || '';
        let localRefId = ms_store_get_cookie('localRefId') || '';
        let checkRefValId = 'false';
        if (cookieRef && (cookieRef != localRefId)) {
            var ajaxData = {
                action: "check_ref_id"
            };
            $.ajax({
                type: "get",
                dataType: "json",
                url: ajax_admin,
                data: ajaxData,
                beforeSend: function () {},
                success: function (response) {
                    checkRefValId= response.data.result;
                    if(checkRefValId == 'false'){
                        ms_destroy_cookie('referenceId',true);
                        ms_destroy_cookie('localRefId');
                    }else {
                        ms_store_cookie_sub_domain('localRefId',cookieRef);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {},
                complete: function () {}
            })
        }

        if(!cookieRef) {
            ms_destroy_cookie('referenceId',true);
            ms_destroy_cookie('localRefId');
        }

        ms_set_cookie_landing_query(['utm_'],['root','ref_id','gclid','fbclid','msclkid'],"landing_query_param",2);
        let ms_reference_id = $( ".ms-reference-id" );
        if(ms_reference_id){
            let cookie_reference_id = ms_store_get_cookie('referenceId') || '';
            ms_reference_id.find('input').val(cookie_reference_id);
        }

        let ms_landing_query_param = $( ".ms-landing-query-param" );
        if(ms_landing_query_param){
            let cookie_landing_query_param = ms_store_get_cookie('landing_query_param') || '';
            ms_landing_query_param.find('input').val(cookie_landing_query_param);
        }
    };

    const ms_store_cookie_sub_domain = function(key,value,exp_month = 2) {
        var expires_cookie = ms_set_time_out(exp_month);
        document.cookie = key + "=" + value + ";expires=" + expires_cookie ;
    };

    const ms_destroy_cookie = function(key,is_root_domain = false) {
        let domain = "";
        if (is_root_domain === true) {
            domain = ms_get_root_domain() || `Path=/`;
        } else {
            domain = `Path=/`;
        }
        document.cookie = key +'=; '+ domain +'; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    const ms_set_time_out = function (exp_month) {
        var expires_cookie = new Date();
        var milisecond_in_a_day = 86400000;
        expires_cookie.setTime(expires_cookie.getTime() + (milisecond_in_a_day * 30 * exp_month));
        return expires_cookie;
    };

    const ms_get_root_domain = function () {
        var current_url = window.location.hostname.split('.');
        var root_domain = current_url.slice(-2).join('.');
        if (root_domain === "localhost") {
            root_domain = `Path=/`;
        } else {
            root_domain = `domain=.${root_domain};Path=/`;
        }
        return root_domain;
    };

    const ms_store_get_cookie = function(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    const ms_store_cookie = function(key,value,exp_month = 2) {
        var current_url = window.location.hostname.split('.');
        var root_domain = current_url.slice(-2).join('.');
        if (root_domain === "localhost") {
            root_domain = "";
        } else {
            root_domain = `;domain=.${root_domain};path=/`;
        }
        var expires_cookie = new Date();
        var milisecond_in_a_day = 86400000;
        expires_cookie.setTime(expires_cookie.getTime() + (milisecond_in_a_day * 30 * exp_month));
        document.cookie = key + "=" + value + ";expires=" + expires_cookie + root_domain;
    };

    const ms_get_param_have_prefix = function(query_param,prefixes_like = ['utm_'],compare_withs = ['root']) {
        let searchParams = new URLSearchParams(query_param);
        let param_query_have_prefix = '';
        var key_first = true;
        for(var key of searchParams.keys()) {
            let flag = false;
            for (var element_contain of compare_withs) {
                if(key === element_contain){
                    flag = true;
                    break;
                }
            }
            if(flag !== true) {
                for (var prefix of prefixes_like) {
                    if(key.includes(prefix)){
                        flag = true;
                        break;
                    }
                }
            }
            if(flag === true) {
                if(key_first === true) {
                    param_query_have_prefix += key + '=' + searchParams.get(key);
                    key_first = false;
                }else {
                    param_query_have_prefix += '&'+key + '=' + searchParams.get(key);
                }
            }
        }
        return param_query_have_prefix;
    };

    const ms_set_cookie_landing_query = function(prefixes_like = ['utm_'],compare_withs = ['root'],key = "landing_query_param",exp_month = 2) {
        let urlParams = window.location.search;
        let landing_query_param = ms_get_param_have_prefix(urlParams,prefixes_like,compare_withs) || '';
        if(landing_query_param != '') {
            let old_landing_cookie = ms_store_get_cookie(key) || "";
            let landing_param_merge = ms_merge_cookie_param(old_landing_cookie,landing_query_param);
            ms_store_cookie(key,landing_param_merge,exp_month);
        }
    };

    const ms_merge_cookie_param = function (old_cookie = '',new_cookie= '') {
        if((!old_cookie) && (new_cookie)) {
            return new_cookie;
        }
        if((!old_cookie) && (!new_cookie)) {
            return '';
        }
        let searchParamsOld = new URLSearchParams(old_cookie);
        let searchParamsNew = new URLSearchParams(new_cookie);
        let mergeValueParam = '';
        for(var key of searchParamsNew.keys()) {
            let old_value = searchParamsOld.get(key) || '';
            if (old_value) {
                searchParamsOld.delete(key);
            }
            mergeValueParam += '&'+key + '=' + searchParamsNew.get(key);
        }
        for(var key of searchParamsOld.keys()) {
            mergeValueParam += '&'+key + '=' + searchParamsOld.get(key);
        }
        mergeValueParam = mergeValueParam.replace('&','');
        return mergeValueParam;
    }
});

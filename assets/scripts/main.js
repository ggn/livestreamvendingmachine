var CHANNELS = [],
    ALERTTYPE = {
        WARNING: 'warning',
        ERROR: 'danger',
        SUCCESS: 'success',
        INFO: 'info'
    },
    player = videojs('cps-videojs-player', {
        controls: false
    }),
    alert_html = '<div id="{{ID}}" class="alert my_alert alert-{{TYPE}} alert-dismissible fade show" style=" display:none; position: absolute; top: 0; z-index: 99; float: right; left: 40vw;" role="alert"><strong>{{SUBJECT}}!</strong> {{MESSAGE}}.<button type="button" class="close" data-dismiss="alert" onclick="close_alert()" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';


function loginSucessful(username, channel_name) {
    show_alert(ALERTTYPE.SUCCESS, 'Creating Channel', "Processing...")
    aws.create_ivs_channel(channel_name, function (error, channel_details) {
        if (error) {
            return show_alert(ALERTTYPE.ERROR, 'Unable to create Channel', error.message)
        }
        var my_channel_details = {
            playbackUrl: channel_details.channel.playbackUrl,
            ingestEndpoint: channel_details.channel.ingestEndpoint,
            channelArn: channel_details.streamKey.channelArn,
            streamKey: channel_details.streamKey.value
        }
        $('#txt_select_channel').val(channel_name);
        fillChannelDetails(my_channel_details);
        $('#btn-create-channel').hide();
        $(".channel_content").show();
        $("#status_live").show();
        $('#login-screen').hide();
        $('#main-body').show();
        $('#username').text(username);
        $('#welcomespan').show();
        show_alert(ALERTTYPE.SUCCESS, 'Channel Ready to use', "Generate your consoles and enjoy...")
    });
}

function doLogin(username, password, region, channelname) {
    if (!password) {
        return false;
    }
    aws.auth(username, password, region, function (authdata) {
        setValue("auth_data", JSON.stringify(authdata));
        loginSucessful("Guest", channelname);
    })
}

userLogout = function () {
    localStorage.clear();
    show_alert(ALERTTYPE.SUCCESS, 'Logout Scuccessful', "See you soon!")
    $('#login-screen').show();
    $('#main-body').hide();
}

function setValue(key, data) {
    localStorage.setItem(key, data);
};

function getValue(key) {
    return localStorage.getItem(key);
};

function getParameterByName(name, url) {
    var character = url.indexOf("?") > 0 ? "?" : '#';
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp(`[${character}&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var fillChannelDetails = function (channel_details) {
    $('#txt_streaming_url').val(channel_details.ingestEndpoint);
    $('#txt_playback_url').val(channel_details.playbackUrl);
    $('#txt_channel_arn').val(channel_details.channelArn);
    $('#txt_stream_key').val(channel_details.streamKey);
}

function initiateMainPage(arn) {
    return false;
};

$("#btn_start_recording").click(function (e) {
    var url_text = window.location.origin + "/broadcast.html?endpoint=" + $('#txt_streaming_url').val() + "&key=" + $('#txt_stream_key').val();
    window.open(url_text);
});

$("#btn_generate_creator_console").click(function (e) {
    var url_text = window.location.origin + "/broadcast.html?endpoint=" + $('#txt_streaming_url').val() + "&key=" + $('#txt_stream_key').val();
    navigator.clipboard.writeText(url_text);
    show_alert(ALERTTYPE.SUCCESS, 'Copied viewer console url to clipboard', "Share this with your broadcaster");
});

$("#btn_generate_viewer_console").click(function (e) {
    var url_text = window.location.origin + "/viewer.html?playback=" + $('#txt_playback_url').val();
    navigator.clipboard.writeText(url_text);
    show_alert(ALERTTYPE.SUCCESS, 'Copied viewer console url to clipboard', "You can share this url to your viewers. Opening...");
    setTimeout(function () {
        window.open(url_text);
    }, 2000)
});

$('#btn_play').click(function (event) {
    show_alert(ALERTTYPE.INFO, 'Playing Live Stream', "Please wait ...");
    player.src($('#txt_playback_url').val());
    player.play();
});

$('#btn_copy_url').click(function (event) {
    var url_text = $('#btn_copy_url').attr("data-url");
    navigator.clipboard.writeText(url_text);
    show_alert(ALERTTYPE.SUCCESS, 'Copied channel url to clipboard', url_text);
});

$('#btn-sign-in').click(function (event) {
    show_alert(ALERTTYPE.INFO, 'Logging in', "Please wait...");
    var username = $('#UserName').val();
    var password = $('#Password').val();
    var region = $('#Region').val();
    var channelname = $('#ChannelName').val();
    if (!username || username == ' ' || !password || password == " " || !region || region == " " || !channelname || channelname == " ") {
        show_alert(ALERTTYPE.ERROR, 'Unable to Create Channle', "Please provide all details")
        return false;
    }
    doLogin(username, password, region, channelname);
});

var close_alert = function (element) {
    $(element).slideUp('slow', function () {
        $(element).remove();
    });
}

var fill_autocomplete = function (source) {
    $("#txt_select_channel").autocomplete({
        source,
        select: function (e, data) {
            var this_channel = data.item.label,
                channel_id = CHANNELS.filter(channel => channel.name == this_channel)[0].arn;
            show_alert(ALERTTYPE.INFO, 'Fetching details of ' + this_channel, "Please wait...")
            initiateMainPage(channel_id);
        }
    });
}

var show_alert = function (type, subject, message) {
    const divId = Math.ceil((Math.random() * 1000));
    var my_alert = alert_html.replace('{{TYPE}}', type);
    my_alert = my_alert.replace('{{SUBJECT}}', subject);
    my_alert = my_alert.replace('{{ID}}', divId);
    my_alert = my_alert.replace('{{MESSAGE}}', message);
    $('body').append(my_alert);
    $('#' + divId).slideDown();
    setTimeout(function () {
        close_alert('#' + divId);
    }, 2000);
}

$('#btn-go-live').click(function (event) {
    $('#btn-create-channel').hide();
    $(".channel_content").show();
    $("#status_live").show();
    $('#login-screen').hide();
    $('#main-body').show();
    $('#username').text("Guest");
    $('#welcomespan').show();
});

function my_ivs(channel_name, callback) {
    var my_obj = window.IMPORTS;
    var params = {
        latencyMode: 'NORMAL',
        name: channel_name,
        tags: {
            'Created By': 'LVM',
        },
        type: 'BASIC'
    };
    const client = new my_obj.IvsClient(AWS.config);
    const command = new my_obj.CreateChannelCommand(params);
    client.send(command).then(response => callback(null,response)).catch(error => callback(error));
}

function get_all_channels(callback) {
    const my_obj = window.IMPORTS;
    const client = new my_obj.IvsClient(AWS.config);
    const command = new my_obj.ListChannelsCommand({});
    client.send(command).then(response => callback(null,response)).catch(error => callback(error));
}

function get_channel(arn, callback) {
    const my_obj = window.IMPORTS;
    const client = new my_obj.IvsClient(AWS.config);
    const command = new my_obj.ListChannelsCommand({arn});
    client.send(command).then(response => callback(null,response)).catch(error => callback(error));
}

function get_stream_key(arn, callback) {
    const my_obj = window.IMPORTS;
    const client = new my_obj.IvsClient(AWS.config);
    const command = new my_obj.GetStreamKeyCommand({arn});
    client.send(command).then(response => callback(null,response)).catch(error => callback(error));
}

function get_stream_details(arn, callback) {
    const my_obj = window.IMPORTS;
    const client = new my_obj.IvsClient(AWS.config);
    const command = new my_obj.GetStreamSessionCommand({channelArn:arn});
    client.send(command).then(response => callback(null,response)).catch(error => callback(error));
}


function list_stream_key(arn, callback) {
    const my_obj = window.IMPORTS;
    const client = new my_obj.IvsClient(AWS.config);
    const command = new my_obj.ListStreamKeysCommand({channelArn:arn});
    client.send(command).then(response => callback(null,response)).catch(error => callback(error));
}


function login(USERNAME, PASSWORD, REGION, callback) {
    var creds = new AWS.Credentials(USERNAME, PASSWORD, null);
    creds.region = REGION;
    AWS.config.update({
        accessKeyId: USERNAME,
        secretAccessKey: PASSWORD,
        region: REGION
    });
    callback(creds);
}


const aws = {
    auth(Username, Password, region, Callback) {
        login(Username, Password, region, Callback);
    },
    create_ivs_channel(name, callback) {
        my_ivs(name, callback);
    },
    get_channel,
    get_all_channels,
    get_stream_key,
    list_stream_key,
    get_stream_details
}

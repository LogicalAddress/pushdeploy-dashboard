## GET: /api/servers
{
 "body": [{
      "_id": "1",
      "uid": "123455",
      "server_name": "Server 1",
      "provider": "Linode",
      "apps": [{
          "_id": "4",
          "app_name": "App 1",
          "template": "nodejs",
          "template_variation": "v4",
          "server": "1",
          "auto_deploy": false,
          "app_shell_script": "",
          "status": "running",
          "created_at": "2017-04-08",
          "app_repository": "http://api.github.com"
        },
        {
          "_id": "5",
          "app_name": "App 2",
          "template": "nodejs",
          "template_variation": "v4",
          "server": "1",
          "auto_deploy": true,
          "app_shell_script": "export AWS_SECRET_KEY=\"2462865242GGGAD28462\"",
          "status": "running",
          "created_at": "2017-04-08",
          "app_repository": "http://api.github.com"
        }],
      "ipv4": "192.168.60.1.0",
      "ipv6": null,
      "status": "running",
      "created_at": "2017-04-08"
    },
    {
      "_id": "2",
      "uid": "53422",
      "server_name": "Server 2",
      "provider": "Digital Ocean",
      "apps": [],
      "ipv4": "192.168.60.1.0",
      "ipv6": null,
      "created_at": "2017-04-08"
    }]
}
## GET: /api/user

{
    "body": {
    "id":"1",
    "name": "Retnan Daser",
    "mobileNumber": "08161730129",
    "email": "dretnan@logicaladdress.com",
    "primaryPlan": "", 
    "secondaryPlan": ""
    }

}

## POST: /api/app/create

{
 "body": {
     "status": "IN_PROGRESS"
 }
}

## POST: /api/aws/server/create

{
 "body": {
     "status": "IN_PROGRESS"
 }
}

## POST: /api/linode/server/create

{
 "body": {
     "status": "IN_PROGRESS"
 }
}

## POST: /api/custom/server/create

{
 "body": {
     "status": "IN_PROGRESS"
 }
}

## GET: /api/user/credentials
{
 "body": {
  	"uid": "",
  	"linode_token": "",
  	"digitalocean_token": "",
  	"bitbucket_token": "",
  	"github_token": "",
  	"aws_secret_key": "",
  	"aws_access_key": "",
  	"aws_KeyFingerprint": "",
  	"aws_KeyMaterial": "",
  	"aws_key_name": "",
  	"aws_SecurityGroupId": "",
  	"custom_private_key": "",
  	"custom_public_key": "",
  	
  	"created_at": "",
  	"updated_at": ""
 }
}

## Get http://demo3709686.mockable.io/api/profile
We don't have profile on the server, it is basically and extraction from GET /api/user
{
    "body": {"user_id": 1, "currency": "USD", "primaryPlan": "", "secondaryPlan": ""}

}
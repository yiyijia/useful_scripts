/**
 * @name autoSignin.js
 * @author Anonym-w
 * @version 0.1
 */

const updateAccesssTokenURL = "https://auth.aliyundrive.com/v2/account/token"
const signinURL = "https://member.aliyundrive.com/v1/activity/sign_in_list"
const aliypCookie = process.env["aliypCookie"]
const refreshToeknArry = [aliypCookie ]

const fetch = require("node-fetch")
const notify = require('./sendNotify');


const CheckIn = async() => {
    for (const elem of refreshToeknArry) {
        
        const queryBody = {
            'grant_type': 'refresh_token',
            'refresh_token': elem
        };

        //使用 refresh_token 更新 access_token
        fetch(updateAccesssTokenURL, {
            method: "POST",    
            body: JSON.stringify(queryBody),
		    headers: {'Content-Type': 'application/json'}
        })
        .then((res) => res.json())
        .then((json) => {
            // console.log(json);

            let access_token = json.access_token;
            console.log(access_token);
            
            
            //签到
            fetch(signinURL, {
                method: "POST",
                body: JSON.stringify(queryBody),
                headers: {'Authorization': 'Bearer '+access_token,'Content-Type': 'application/json'}
            })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
            })
            .catch((err) => console.log(err))
            
        })
        .catch((err) => console.log(err))


    }
    // await notify.sendNotifyBark(`v2free 自动签到结果`,allnotify)
}

exports.main_handler = async () => {
  return CheckIn()
}

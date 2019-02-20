console.log("Loaded");

const axios = require('axios');
const qs = require('query-string');

const { CLIENT_SB_API_TOKEN, CLIENT_PR_API_TOKEN } = process.env;
const SB_BASE = 'https://sandbox.tinypass.com/api/v3';
const PR_BASE = 'https://api.tinypass.com/api/v3';
const sb_aid = '';
const pr_aid = '';

// get custom fields schema
async function getCustomFields() {
    const res = await axios.get(`${SB_BASE}/publisher/customFields/get?api_token=${CLIENT_SB_API_TOKEN}&aid=${sb_aid}`);
    let cf_data = JSON.parse(res.data.data);
    // console.log(res.data.data);
    console.log(cf_data);
    updateCustomFields(cf_data);
}
getCustomFields();

// edit custom fields schema ???

// update, push custom fields schema
async function updateCustomFields(cf_object) {
    const cf_data = JSON.stringify(cf_object);
    const reqBody = {
        api_token: CLIENT_PR_API_TOKEN,
        aid: pr_aid,
        custom_fields: cf_data
    };
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const res = await axios.post(`${PR_BASE}/publisher/customFields/update`, qs.stringify(reqBody), config);
    console.log('response:', res.data);
    return res;
}
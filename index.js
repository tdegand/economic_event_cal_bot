require("dotenv").config(); //initialize dotenv
const { Client, Events, GatewayIntentBits } = require('discord.js');
const moment = require('moment')
const axios = require('axios').default;
const client = new Client({ 
    intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
    ] 
});

//993941418592718938 economic events channel ID

client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}!`);
  getEconomicData();
//   sendMessage();
});


client.on(Events.MessageCreate, message => {
    console.log(message.content)
})

const getEconomicData = async () => {
    const monday = moment().format('YYYY-MM-DD')
    const friday = moment().add(4, 'days').format('YYYY-MM-DD')
    
    try {
        let res = await axios({
                url: `https://financialmodelingprep.com/api/v3/economic_calendar?from=${monday}&to=${friday}&apikey=${process.env.API_KEY}`,
                method: 'get',
                timeout: 8000,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if(res.status == 200){
            console.log(res)
            return res.data
            }    
        }
        catch (err) {
            console.error(err);
        }
}
getEconomicData();

const sendMessage = async () => {

    //<iframe src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=5&calType=week&timeZone=8&lang=1" width="650" height="467" frameborder="0" allowtransparency="true" marginwidth="0" marginheight="0"></iframe><div class="poweredBy" style="font-family: Arial, Helvetica, sans-serif;"><span style="font-size: 11px;color: #333333;text-decoration: none;">Real Time Economic Calendar provided by <a href="https://www.investing.com/" rel="nofollow" target="_blank" style="font-size: 11px;color: #06529D; font-weight: bold;" class="underline_link">Investing.com</a>.</span></div>
    const channel = await client.channels.fetch('993941418592718938')
    channel.send({content: "Testing 123"})
}





client.login(process.env.CLIENT_TOKEN);

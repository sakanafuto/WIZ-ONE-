var ACCESS_TOKEN = 'channel-access-token';

function doPost(e) {
  const events = JSON.parse(e.postData.contents).events;
  events.forEach((event) => {
    if(event.message.type == "text") {
      return reply(event);
    } else {
      return;
    }
  });
}

function reply(e) {
  const text = e.message.text
  const messages = [
    {
      "type": "text",
      "text": text + "！"
    }
  ]
  const url = "https://www.googleapis.com/customsearch/v1?key=xxxxxxxxxx&cx=xxxxxxxxxxx&searchType=image&num=5&q=iz*one " + text
  const res = UrlFetchApp.fetch(url)
  const response = JSON.parse(res.getContentText());
  Logger.log("検索終了");
  const array = response.items
  const img = array[Math.floor(Math.random() * array.length)].link
  const img_message = {
    "type": "image",
    "originalContentUrl": img,
    "previewImageUrl": img
  }
  messages.push(img_message)
  
  const postData = {
    "replyToken": e.replyToken,
    "messages": messages
  };

  const replyData = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + ACCESS_TOKEN
    },
    "payload": JSON.stringify(postData)
  };

  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", replyData);
}
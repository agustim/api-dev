const { createProxyMiddleware } = require('http-proxy-middleware')
//import proxyMiddleware from 'http-proxy-middleware'
const MailDev = require('maildev')
//import MailDev from 'maildev'

// some business with the existing app

// Define a route for the base path
const maildev = new MailDev({
  basePathname: '/maildev',
})

// Maildev now running on localhost:1080/maildev
maildev.listen(function (err: any) {
  console.log(err)
  console.log('We can now sent emails to port 1025!')
})

// proxy all maildev requests to the maildev app
const proxy = createProxyMiddleware({
  target: `http://localhost:1080`,
  ws: true,
})

// Maildev available at the specified route '/maildev'
//app.use(proxy)

export default proxy

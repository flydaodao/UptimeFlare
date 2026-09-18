// This is a simplified example config file for quickstart
// Some not frequently used features are omitted/commented out here
// For a full-featured example, please refer to `uptime.config.full.ts`

// 这是一个用于快速开始的简化示例配置文件
// 一些不常用的功能在此处被省略/注释掉
// 如需完整功能示例，请参考 `uptime.config.full.ts`

// 不要编辑这一行
import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // 状态页面的标题
  title: "lyc8503's Status Page",
  // 显示在状态页面头部的链接，可以将 `highlight` 设置为 `true`
  links: [
    { link: 'https://blog.su9.top', label: 'Su9Blog' },
    { link: 'https://daodao.online/', label: 'Blog' },
  ],
}

const workerConfig: WorkerConfig = {
  // 在此定义所有监控项
  monitors: [
    // HTTP 监控示例
    {
      // `id` 应唯一，如果 `id` 保持不变，历史记录将会保留
      id: 'foo_monitor',
      // `name` 用于状态页面和回调消息
      name: 'blog',
      // `method` 应为有效的 HTTP 方法
      method: 'GET',
      // `target` 是有效的 URL
      target: 'https://daodao.online',
      // [可选] `tooltip` 仅用于在状态页面显示提示信息
      tooltip: 'This is a tooltip for this monitor',
      // [可选] `statusPageLink` 仅用于状态页面上的可点击链接
      statusPageLink: 'https://example.com',
      // [可选] `expectedCodes` 是可接受的 HTTP 响应码数组；如果未指定，默认为 2xx
      expectedCodes: [200],
      // [可选] `timeout` 单位为毫秒；如果未指定，默认为 10000
      timeout: 10000,
      // [可选] 要发送的请求头
      headers: {
        'User-Agent': 'Uptimeflare',
        Authorization: 'Bearer YOUR_TOKEN_HERE',
      },
      // [可选] 要发送的请求体（需要 POST/PUT/PATCH 方法）
      // body: 'Hello, world!',
      // [可选] 如果指定，响应必须包含该关键字才被视为正常
      // responseKeyword: 'success',
      // [可选] 如果指定，响应必须不包含该关键字才被视为正常
      // responseForbiddenKeyword: 'bad gateway',
      // [可选] 如果指定，将调用检查代理来检查该监控项，主要用于特定地理位置的检查
      // 设置此值前请参阅文档 https://github.com/lyc8503/UptimeFlare/wiki/Check-proxy-setup
      // 目前支持 `worker://`、`globalping://` 和 `http(s)://` 代理
      // checkProxy: 'worker://weur',
      // [可选] 如果为 true，当指定代理不可用时，检查将回退到本地
      // checkProxyFallback: true,
    },
    // TCP 监控示例
    {
      id: 'test_tcp_monitor',
      name: 'Example TCP Monitor',
      // 对于 TCP 监控，`method` 应为 `TCP_PING`
      method: 'TCP_PING',
      // 对于 TCP 监控，`target` 应为 `host:port`
      target: '1.2.3.4:22',
      tooltip: 'My production server SSH',
      statusPageLink: 'https://example.com',
      timeout: 5000,
    },
  ],
  // [可选] 通知设置
  notification: {
    // [可选] 通知 webhook 设置；如果未指定，则不会发送通知
    // 更多信息见 Wiki：https://github.com/lyc8503/UptimeFlare/wiki/Setup-notification
    webhook: {
      // [必需] webhook URL（示例：Telegram Bot API）
      url: 'https://api.telegram.org/bot123456:ABCDEF/sendMessage',
      // [可选] HTTP 方法；当 payloadType=param 时默认为 'GET'，否则为 'POST'
      // method: 'POST',
      // [可选] 要发送的请求头
      // headers: {
      //   foo: 'bar',
      // },
      // [必需] 指定如何编码负载
      // 应为 'param'、'json' 或 'x-www-form-urlencoded' 之一
      // 'param'：将 URL 编码后的负载追加到 URL 搜索参数中
      // 'json'：将 JSON 负载作为 body 进行 POST，并将 content-type 头设置为 'application/json'
      // 'x-www-form-urlencoded'：将 URL 编码后的负载作为 body 进行 POST，并将 content-type 头设置为 'x-www-form-urlencoded'
      payloadType: 'x-www-form-urlencoded',
      // [必需] 要发送的负载
      // $MSG 将被替换为人类可读的通知消息
      payload: {
        chat_id: 12345678,
        text: '$MSG',
      },
      // [可选] 调用此 webhook 的超时时间，单位为毫秒，默认为 5000
      timeout: 10000,
    },
    // [可选] 通知消息中使用的时区，默认为 "Etc/GMT"
    timeZone: 'Asia/Shanghai',
    // [可选] 发送通知前的宽限期（分钟）
    // 只有在初始失败后监控项连续 N 次检查都处于宕机状态时，才会发送通知
    // 如果未指定，将立即发送通知
    gracePeriod: 5,
  },
}

// 你可以在此定义多个维护计划
// 维护期间，状态页面会显示警报
// 同时，相关的宕机通知将被跳过（如果有）
// 当然，如果不需要此功能，可以将其留空

// const maintenances: MaintenanceConfig[] = []

const maintenances: MaintenanceConfig[] = [
  {
    // [可选] 受此维护影响的监控 ID
    monitors: ['foo_monitor', 'bar_monitor'],
    // [可选] 如果未指定，默认为 "Scheduled Maintenance"
    title: 'Test Maintenance',
    // 维护描述，将显示在状态页面上
    body: 'This is a test maintenance, server software upgrade',
    // 维护开始时间，使用 UNIX 时间戳或 ISO 8601 格式
    start: '2020-01-01T00:00:00+08:00',
    // [可选] 维护结束时间，使用 UNIX 时间戳或 ISO 8601 格式
    // 如果未指定，该维护将被视为正在进行中
    end: '2050-01-01T00:00:00+08:00',
    // [可选] 状态页面维护警报的颜色，默认为 "yellow"
    color: 'blue',
  },
]

// 不要编辑这一行
export { maintenances, pageConfig, workerConfig }

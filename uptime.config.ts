import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: "lyc8503's Status Page",
  links: [
    { link: 'https://blog.su9.top', label: 'Su9Blog' },
    { link: 'https://daodao.online/', label: 'Blog' },
  ],
}

const workerConfig: WorkerConfig = {
  monitors: [
    // 监控你的博客
    {
      id: 'foo_monitor',
      name: 'blog',
      method: 'GET',
      target: 'https://daodao.online',
      timeout: 10000,
      // 注意：我帮你把包含 YOUR_TOKEN_HERE 的无用 headers 删掉了
    },
    
    // ==========================================
    // 预留的 Tailscale 监控项 (请根据你的实际情况修改)
    // ==========================================
    {
      id: 'tailscale_monitor',
      name: 'mCloud',
      method: 'GET',
      // 将这里替换为你通过 Tailscale Funnel 暴露的公开域名
      target: 'https://nas.daodao.de5.net', 
      timeout: 10000,
    }
  ],
  
  notification: {
    // 如果你暂时不配置通知，可以保持原样或注释掉 webhook 部分
    timeZone: 'Asia/Shanghai',
    gracePeriod: 5,
  },
}

// 我帮你把维护计划清空了，这样顶部就不会出现 [ERR: MONITOR ID NOT FOUND] 的报错和警告了
const maintenances: MaintenanceConfig[] = []

export { maintenances, pageConfig, workerConfig }
